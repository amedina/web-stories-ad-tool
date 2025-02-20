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
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { useFocusOut } from '../../utils';
import { Input } from '../../../design-system';

const StyledInput = styled(Input)`
  div {
    height: auto;
  }
`;

const InlineInputForm = ({
  noAutoFocus,
  error,
  id,
  label,
  onEditCancel,
  onEditComplete,
  placeholder,
  value,
}) => {
  const inputContainerRef = useRef(null);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    // update internal value when `value` prop updates
    setNewValue(value);
  }, [value]);

  useFocusOut(
    inputContainerRef,
    () => {
      // cancel changes when user focuses away from input
      onEditCancel();
    },
    [onEditCancel]
  );

  useEffect(() => {
    if (!noAutoFocus && inputContainerRef.current) {
      inputContainerRef.current.querySelector('input')?.focus();
    }
  }, [noAutoFocus]);

  const handleChange = useCallback(
    ({ target }) => {
      setNewValue(target.value);
    },
    [setNewValue]
  );

  const handleKeyPress = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.keyCode === 13) {
        onEditComplete(newValue);
      } else if (nativeEvent.keyCode === 27) {
        onEditCancel();
      }
    },
    [newValue, onEditComplete, onEditCancel]
  );
  return (
    <div ref={inputContainerRef}>
      <StyledInput
        aria-label={label}
        id={`${id}`}
        data-testid="inline-input-form"
        value={newValue}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        placeholder={placeholder}
        hasError={Boolean(error)}
        hint={error}
      />
    </div>
  );
};

InlineInputForm.propTypes = {
  error: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  noAutoFocus: PropTypes.bool,
  onEditCancel: PropTypes.func.isRequired,
  onEditComplete: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default InlineInputForm;
