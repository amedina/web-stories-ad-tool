/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { __ } from '@web-stories-wp/i18n';

/**
 * Internal dependencies
 */
import {
  Button,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from '../../../../../../design-system';
import {
  MediaGalleryMessage,
  PaneHeader as DefaultPaneHeader,
  PaneInner,
  StyledPane,
} from '../common/styles';
import { PANE_PADDING } from '../../shared';
import PaginatedMediaGallery from '../common/paginatedMediaGallery';
import resourceList from '../../../../../utils/resourceList';
import useLibrary from '../../../useLibrary';
import { useConfig, useMedia } from '../../../../../app';
import paneId from './paneId';

export const ROOT_MARGIN = 300;

const FilterArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 ${PANE_PADDING} 0 ${PANE_PADDING};
`;

const PaneHeader = styled(DefaultPaneHeader)`
  padding: ${PANE_PADDING} 0 ${PANE_PADDING} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

function MediaPane(props) {
  const fileInputRef = useRef();
  const setNextPage = () => {};

  const { addLocalFiles, media } = useMedia((state) => ({
    addLocalFiles: state.local.actions.addLocalFiles,
    media: state.local.state.media,
  }));

  const {
    allowedMimeTypes: {
      image: allowedImageMimeTypes,
      video: allowedVideoMimeTypes,
    },
  } = useConfig();

  const allowedMimeTypes = useMemo(
    () => [...allowedImageMimeTypes, ...allowedVideoMimeTypes],
    [allowedImageMimeTypes, allowedVideoMimeTypes]
  );

  const handleFileInput = async (event) => {
    if (!event.target.files.length) {
      return;
    }

    const { files } = event.target;
    await addLocalFiles([...files]);
    fileInputRef.current.value = '';
  };

  const { insertElement } = useLibrary((state) => ({
    insertElement: state.actions.insertElement,
  }));

  /**
   * Insert element such image, video and audio into the editor.
   *
   * @param {Object} resource Resource object
   * @return {null|*} Return onInsert or null.
   */
  const insertMediaElement = useCallback(
    (resource, thumbnailURL) => {
      resourceList.set(resource.id, {
        url: thumbnailURL,
        type: 'cached',
      });
      return insertElement(resource.type, { resource });
    },
    [insertElement]
  );

  return (
    <StyledPane id={paneId} {...props}>
      <PaneInner>
        <PaneHeader>
          <FilterArea>
            <input
              type="file"
              accept={allowedMimeTypes}
              ref={fileInputRef}
              onChange={handleFileInput}
              hidden
              multiple
            />
            <Button
              variant={BUTTON_VARIANTS.RECTANGLE}
              type={BUTTON_TYPES.SECONDARY}
              size={BUTTON_SIZES.SMALL}
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              {__('Upload', 'web-stories')}
            </Button>
          </FilterArea>
        </PaneHeader>

        {!media.length ? (
          <MediaGalleryMessage>
            {__('No media found', 'web-stories')}
          </MediaGalleryMessage>
        ) : (
          <PaginatedMediaGallery
            providerType="local"
            resources={media}
            isMediaLoading={false}
            isMediaLoaded
            hasMore={false}
            onInsert={insertMediaElement}
            setNextPage={setNextPage}
            searchTerm={''}
          />
        )}
      </PaneInner>
    </StyledPane>
  );
}

export default MediaPane;
