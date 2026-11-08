import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sanitize, dateKey, Timer} from '../core.mjs';
test('local date uses local calendar',()=>assert.equal(dateKey(new Date(2026,10,8,0,1)), '2026-11-08'));
test('invalid and corrupt records cannot appear as real data',()=>{assert.deepEqual(sanitize(null),{});assert.deepEqual(sanitize({'2026-11-08':{score:99}}),{});assert.deepEqual(sanitize({'2026-11-08':{score:0,note:'<b>memo</b>',sessions:[]}})['2026-11-08'].score,0)});
test('timer pauses and emits completion once',()=>{const t=new Timer(10);t.start(1000);assert.equal(t.remaining(4000),7);t.pause(4000);assert.equal(t.remaining(9000),7);t.start(10000);assert.equal(t.tick(17000),true);assert.equal(t.tick(18000),false);assert.equal(t.remaining(18000),0)});
