/*
 * Copyright 2021 Google LLC
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
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Context from './context';

function StoryAdProvider({ children }) {
  const [isImporting, updateIsImportingStatus] = useState(false);
  const [isDownloading, updateIsDownloadingStatus] = useState(false);
  const [uploadErrorMessages, updateUploadErrorMessages] = useState([]);

  const value = {
    actions: {
      updateIsImportingStatus,
      updateIsDownloadingStatus,
      updateUploadErrorMessages,
    },
    state: {
      isImporting,
      isDownloading,
      uploadErrorMessages,
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

StoryAdProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoryAdProvider;
