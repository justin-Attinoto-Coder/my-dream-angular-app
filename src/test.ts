import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Declare require.context for TypeScript
declare const require: {
  context: (path: string, deep?: boolean, filter?: RegExp) => {
    keys: () => string[];
    <T>(id: string): T;
  };
};

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
