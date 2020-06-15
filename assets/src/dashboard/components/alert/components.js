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
import styled, { keyframes } from 'styled-components';

/**
 * Internal dependencies
 */
import { KEYBOARD_USER_SELECTOR, Z_INDEX } from '../../constants';
import { TypographyPresets } from '../typography';

const slideIn = keyframes`
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
`;

const getColor = (severity = 'default') => {
  const alertBackgrounds = {
    error: 'danger',
    warning: 'warning',
    info: 'bluePrimary',
    success: 'success',
    default: 'bluePrimary',
  };
  return alertBackgrounds[severity];
};

export const Wrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 300px;
  min-width: 40vw;
`;

export const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, severity }) =>
    theme.colors[getColor(severity)]};
  border-radius: 5px;
  z-index: ${Z_INDEX.ALERT};
  animation: 0.5s ${slideIn} ease-in;
`;

export const AlertText = styled.p`
  ${TypographyPresets.Medium};
  width: calc(100% - 25px);
  display: inline;
`;

export const DismissButton = styled.button`
  align-self: center;
  margin: 0 0 0 auto;
  width: 25px;
  height: 25px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.borders.transparent};
  cursor: pointer;

  ${KEYBOARD_USER_SELECTOR} &:focus {
    border-color: ${({ theme }) => theme.colors.action};
  }
`;
