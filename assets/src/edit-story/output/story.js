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
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import StoryPropTypes from '../types';
import getUsedAmpExtensions from './utils/getUsedAmpExtensions';
import CustomCSS from './utils/styles';
import getFontDeclarations from './utils/getFontDeclarations';
import OutputPage from './page';

function OutputStory({ story: { adOptions }, pages }) {
  const fontDeclarations = getFontDeclarations(pages);

  const { ctaLink, ctaText, customCtaText, landingPageType } = adOptions || {};
  const ampExtensions = getUsedAmpExtensions(pages);
  const ctaType = 'CUSTOM_TEXT' === ctaText ? customCtaText : ctaText;

  return (
    <html amp4ads="" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        {ampExtensions.map(({ name, src }) => (
          <script key={src} async="async" src={src} custom-element={name} />
        ))}
        {fontDeclarations.map((url) => (
          <link key={url} href={url} rel="stylesheet" />
        ))}
        <style
          amp4ads-boilerplate=""
          dangerouslySetInnerHTML={{
            __html: 'body{visibility:hidden}',
          }}
        />
        <CustomCSS />

        <meta name="amp-cta-url" content={ctaLink} />
        <meta name="amp-cta-type" content={ctaType} />
        <meta name="amp-cta-landing-page-type" content={landingPageType} />
      </head>
      <body>
        {pages.map((page) => (
          <OutputPage key={page.id} page={page} />
        ))}
      </body>
    </html>
  );
}

OutputStory.propTypes = {
  story: StoryPropTypes.story.isRequired,
  pages: PropTypes.arrayOf(StoryPropTypes.page).isRequired,
  metadata: PropTypes.shape({
    publisher: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
    }),
  }).isRequired,
};

export default OutputStory;
