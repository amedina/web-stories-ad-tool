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
 * AMP Extension
 *
 * @typedef {Extension} Extension
 * @property {string} src The URL to the extension.
 * @property {?string} name The extension's name. Used for the custom-element attribute.
 */

/**
 * Goes through all pages in a story to find the needed AMP extensions for them.
 *
 * Always includes the amp4ads as runtime.
 *
 * @param {Array} pages List of pages.
 * @return {Array<Extension>} List of used AMP extensions.
 */
const getUsedAmpExtensions = (pages) => {
  const extensions = [
    // amp4ads as runtime.
    { src: 'https://cdn.ampproject.org/amp4ads-v0.js' },
  ];

  const ampAnimation = {
    name: 'amp-animation',
    src: 'https://cdn.ampproject.org/v0/amp-animation-0.1.js',
  };

  const ampVideo = {
    name: 'amp-video',
    src: 'https://cdn.ampproject.org/v0/amp-video-0.1.js',
  };

  for (const { elements, animations } of pages) {
    for (const { type } of elements) {
      switch (type) {
        // Todo: eventually check for amp-fit-text if ever added.
        case 'video':
        case 'gif':
          extensions.push(ampVideo);
          break;
        default:
          break;
      }
    }

    if (animations?.length) {
      extensions.push(ampAnimation);
    }
  }

  return [...new Set(extensions)];
};

export default getUsedAmpExtensions;
