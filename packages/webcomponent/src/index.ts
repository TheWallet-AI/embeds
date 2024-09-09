import register from 'preact-custom-element';

import { EmbedDirectTemplate, EmbedSignDocument } from '@thewalletai/embed-preact';

register(EmbedDirectTemplate, 'thewalletai-embed-direct-template', [
  'token',
  'host',
  'externalId',
  'css',
  'email',
  'lockEmail',
  'name',
  'lockName',
  'onDocumentReady',
  'onDocumentCompleted',
  'onDocumentError',
]);

register(EmbedSignDocument, 'thewalletai-embed-sign-document', [
  'token',
  'host',
  'css',
  'name',
  'lockName',
  'onDocumentReady',
  'onDocumentCompleted',
  'onDocumentError',
]);
