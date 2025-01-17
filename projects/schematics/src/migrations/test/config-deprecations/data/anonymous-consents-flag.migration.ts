/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANONYMOUS_CONSENTS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ConfigDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENTS_FEATURE_FLAG_MIGRATION: ConfigDeprecation = {
  propertyName: ANONYMOUS_CONSENTS,
  comment: `// ${TODO_SPARTACUS} '${ANONYMOUS_CONSENTS}' has been removed, as this feature is now enabled by default.\n`,
};
