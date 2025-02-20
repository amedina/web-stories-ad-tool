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
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { formatDate, isValid, toDate } from '@web-stories-wp/date';
import { __, sprintf } from '@web-stories-wp/i18n';
/**
 * Internal dependencies
 */
import {
  Input,
  Text,
  THEME_CONSTANTS,
  useSnackbar,
} from '../../../../../../design-system';
import { useLocalMedia, useMedia } from '../../../../../app/media';
import StoryPropTypes from '../../../../../types';
import { getSmallestUrlForWidth } from '../../../../../elements/media/util';
import Dialog from '../../../../dialog';

const THUMBNAIL_WIDTH = 152;

const styledMediaThumbnail = css`
  display: flex;
  width: ${THUMBNAIL_WIDTH}px;
  margin-right: 28px;
`;

const Image = styled.img`
  ${styledMediaThumbnail}
`;

const Video = styled.video`
  ${styledMediaThumbnail}
`;

const DialogBody = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-start;
`;

const MetadataTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 4px;
`;

const DateText = styled(Text)`
  margin-bottom: 8px;
`;

const AssistiveTextInput = styled(Input)`
  margin: 20px 0 4px;
`;

const imageDialogTitle = __('Edit Image', 'web-stories');
const videoDialogTitle = __('Edit Video', 'web-stories');
const imageInputTitle = __('Assistive text', 'web-stories');
const videoInputTitle = __('Video description', 'web-stories');
const imageDialogDescription = __(
  'Describe the appearance and function of the image. Leave empty if the image is purely decorative.',
  'web-stories'
);
const videoDialogDescription = __(
  'For indexability and accessibility. Include any burned-in text inside the video.',
  'web-stories'
);

/**
 * Displays a dialog where the user can edit the selected media element.
 *
 * @param {Object} props Component props.
 * @param {Object} props.resource Selected media element's resource object.
 * @param {Object} props.onClose Callback to toggle dialog display.
 * @return {null|*} The dialog element.
 */
function MediaEditDialog({ resource, onClose }) {
  const {
    id,
    src,
    title,
    creationDate,
    width,
    height,
    type,
    alt,
    poster,
    mimeType,
  } = resource;

  const { media, updateMedia: updateLocalMedia } = useMedia((state) => ({
    media: state.local?.state?.media,
    updateMedia: state.local?.actions?.media,
  }));

  const updateMedia = useCallback(
    (mediaId, data) => {
      const currentIndex = media.findIndex(
        (mediaItem) => mediaId === mediaItem.id
      );

      if (currentIndex > -1) {
        const newMedia = [...media];
        newMedia[currentIndex] = { ...newMedia[currentIndex], ...data };
        updateLocalMedia(newMedia);
      }
    },
    [media, updateLocalMedia]
  );

  const { updateMediaElement } = useLocalMedia((state) => ({
    updateMediaElement: state.actions.updateMediaElement,
  }));
  const { showSnackbar } = useSnackbar();
  const [altText, setAltText] = useState(alt);
  const parsedDate = toDate(creationDate);

  const handleAltTextChange = useCallback((evt) => {
    setAltText(evt.target.value);
  }, []);

  const updateMediaItem = useCallback(async () => {
    try {
      // Update server.
      await updateMedia(id, { alt: altText });
      // Update internal state.
      updateMediaElement({ id, data: { alt: altText } });
      onClose();
    } catch (err) {
      showSnackbar({
        message: __('Failed to update, please try again.', 'web-stories'),
        dismissable: true,
      });
    }
  }, [altText, id, onClose, showSnackbar, updateMedia, updateMediaElement]);

  const isImage = type === 'image';

  return (
    <Dialog
      open
      onClose={onClose}
      title={isImage ? imageDialogTitle : videoDialogTitle}
      secondaryText={__('Cancel', 'web-stories')}
      onPrimary={updateMediaItem}
      primaryText={__('Save', 'web-stories')}
    >
      <DialogBody>
        {type === 'image' ? (
          <Image
            src={getSmallestUrlForWidth(THUMBNAIL_WIDTH, resource)}
            alt={alt}
            loading={'lazy'}
            crossOrigin="anonymous"
          />
        ) : (
          <Video
            key={src}
            crossOrigin="anonymous"
            poster={poster}
            preload="none"
            muted
          >
            <source src={src} type={mimeType} />
          </Video>
        )}
        <MetadataTextContainer>
          {isValid(parsedDate) && (
            <DateText
              forwardedAs="span"
              size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.X_SMALL}
            >
              {sprintf(
                /* translators: %s: upload date of media item. */
                __('Uploaded: %s', 'web-stories'),
                formatDate(creationDate)
              )}
            </DateText>
          )}
          <Text
            as="span"
            isBold
            size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.MEDIUM}
          >
            {title}
          </Text>
          <Text as="span" size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.SMALL}>
            {sprintf(
              /* translators: 1: image width. 2: image height. */
              __('%1$d x %2$d pixels', 'web-stories'),
              width,
              height
            )}
          </Text>
          <AssistiveTextInput
            value={altText}
            aria-label={isImage ? imageInputTitle : videoInputTitle}
            type="text"
            placeholder={isImage ? imageInputTitle : videoInputTitle}
            onChange={handleAltTextChange}
          />
          <Text size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.SMALL}>
            {isImage ? imageDialogDescription : videoDialogDescription}
          </Text>
        </MetadataTextContainer>
      </DialogBody>
    </Dialog>
  );
}

MediaEditDialog.propTypes = {
  resource: StoryPropTypes.resource.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MediaEditDialog;
