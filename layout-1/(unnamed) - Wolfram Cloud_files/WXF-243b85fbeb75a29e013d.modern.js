(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "dkg0nE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, __dirname, module, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WXFExprConsumer", function() { return WXFExprConsumer; });
/**
 * WXF.js
 *
 *
 * What is this module?
 * --------------------
 * This is an asm.js module compiled from the Desktop code for handling CompressedData. This file is a slightly modified
 * version of the one provided in the following email:
 *
 *   https://mail-archive.wolfram.com/archive/t-cloud-notebooks/2018/May00/0061.html
 *
 *
 * Modifications to the original file
 * ----------------------------------
 *
 * 1. The `sourceRegex` has been replaced with the following:
 *
 *      /^function[^\(]*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/
 *
 *    Without this change, an exception is thrown. That fix was taken from
 *    https://github.com/schmich/instascan/issues/154#issuecomment-505614167.
 *
 *
 * 2. All of the previously global variables have been declared with var in a new line at the top of the file. Without
 *    this, jest fails to import this file.
 *
 *
 * 3. `export` is added before `function WFXExprConsumer` (to make it available via import).
 *
 */
var WXFDataCreate, WXFDataCreateWithString, WXFDataCreateMutable, WXFDataRelease, WXFDataGetSize, WXFDataGetData, WXFDataGetCapacity, WXFDataSetSize, WXFDataAppend, WXFDataSetData, WXFDataDelete, WXFDataProviderCreateWithBytes, WXFDataProviderCreateWithData, WXFDataProviderRelease, WXFDataProviderGetStreamData, WXFDataConsume, WXFDataConsumerCreateWithData, WXFDataConsumerRelease, WXFDataConsumerPutData, WXFBase64EncodeConsumerCreate, WXFBase64DecodeProviderCreate, WXFBase16EncodeConsumerCreate, WXFBase16DecodeProviderCreate, WXFBase85EncodeConsumerCreate, WXFBase85DecodeProviderCreate, WXFCompressConsumerCreate, WXFUncompressProviderCreate, WXFExprGetType, WXFExprGetCount, WXFExprGetIntegerValue, WXFExprGetRealValue, WXFExprGetStringValue, WXFExprConsumerCreate, WXFExprConsumerRelease, WXFExprUncompress, jsExprPutFuncPtr;
var Module;
if (!Module) Module = (typeof Module !== "undefined" ? Module : null) || {};
var moduleOverrides = {};

for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var ENVIRONMENT_IS_WEB = typeof window === "object";
var ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
var ENVIRONMENT_IS_NODE = typeof process === "object" && "function" === "function" && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  if (!Module["print"]) Module["print"] = function print(x) {
    process["stdout"].write(x + "\n");
  };
  if (!Module["printErr"]) Module["printErr"] = function printErr(x) {
    process["stderr"].write(x + "\n");
  };

  var nodeFS = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  var nodePath = __webpack_require__("33yfhu");

  Module["read"] = function read(filename, binary) {
    filename = nodePath["normalize"](filename);
    var ret = nodeFS["readFileSync"](filename);

    if (!ret && filename != nodePath["resolve"](filename)) {
      filename = path.join(__dirname, "..", "src", filename);
      ret = nodeFS["readFileSync"](filename);
    }

    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module["readBinary"] = function readBinary(filename) {
    var ret = Module["read"](filename, true);

    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }

    assert(ret.buffer);
    return ret;
  };

  Module["load"] = function load(f) {
    globalEval(read(f));
  };

  if (!Module["thisProgram"]) {
    if (process["argv"].length > 1) {
      Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
    } else {
      Module["thisProgram"] = "unknown-program";
    }
  }

  Module["arguments"] = process["argv"].slice(2);

  if (true) {
    module["exports"] = Module;
  }

  process["on"]("uncaughtException", function (ex) {
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  Module["inspect"] = function () {
    return "[Emscripten Module object]";
  };
} else if (ENVIRONMENT_IS_SHELL) {
  if (!Module["print"]) Module["print"] = print;
  if (typeof printErr != "undefined") Module["printErr"] = printErr;

  if (typeof read != "undefined") {
    Module["read"] = read;
  } else {
    Module["read"] = function read() {
      throw "no read() available (jsc?)";
    };
  }

  Module["readBinary"] = function readBinary(f) {
    if (typeof readbuffer === "function") {
      return new Uint8Array(readbuffer(f));
    }

    var data = read(f, "binary");
    assert(typeof data === "object");
    return data;
  };

  if (typeof scriptArgs != "undefined") {
    Module["arguments"] = scriptArgs;
  } else if (typeof arguments != "undefined") {
    Module["arguments"] = arguments;
  }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module["read"] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != "undefined") {
    Module["arguments"] = arguments;
  }

  if (typeof console !== "undefined") {
    if (!Module["print"]) Module["print"] = function print(x) {
      console.log(x);
    };
    if (!Module["printErr"]) Module["printErr"] = function printErr(x) {
      console.log(x);
    };
  } else {
    var TRY_USE_DUMP = false;
    if (!Module["print"]) Module["print"] = TRY_USE_DUMP && typeof dump !== "undefined" ? function (x) {
      dump(x);
    } : function (x) {};
  }

  if (ENVIRONMENT_IS_WORKER) {
    Module["load"] = importScripts;
  }

  if (typeof Module["setWindowTitle"] === "undefined") {
    Module["setWindowTitle"] = function (title) {
      document.title = title;
    };
  }
} else {
  throw "Unknown runtime environment. Where are we?";
}

function globalEval(x) {
  eval.call(null, x);
}

if (!Module["load"] && Module["read"]) {
  Module["load"] = function load(f) {
    globalEval(Module["read"](f));
  };
}

if (!Module["print"]) {
  Module["print"] = function () {};
}

if (!Module["printErr"]) {
  Module["printErr"] = Module["print"];
}

if (!Module["arguments"]) {
  Module["arguments"] = [];
}

if (!Module["thisProgram"]) {
  Module["thisProgram"] = "./this.program";
}

Module.print = Module["print"];
Module.printErr = Module["printErr"];
Module["preRun"] = [];
Module["postRun"] = [];

for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}

var Runtime = {
  setTempRet0: function setTempRet0(value) {
    tempRet0 = value;
  },
  getTempRet0: function getTempRet0() {
    return tempRet0;
  },
  stackSave: function stackSave() {
    return STACKTOP;
  },
  stackRestore: function stackRestore(stackTop) {
    STACKTOP = stackTop;
  },
  getNativeTypeSize: function getNativeTypeSize(type) {
    switch (type) {
      case "i1":
      case "i8":
        return 1;

      case "i16":
        return 2;

      case "i32":
        return 4;

      case "i64":
        return 8;

      case "float":
        return 4;

      case "double":
        return 8;

      default:
        {
          if (type[type.length - 1] === "*") {
            return Runtime.QUANTUM_SIZE;
          } else if (type[0] === "i") {
            var bits = parseInt(type.substr(1));
            assert(bits % 8 === 0);
            return bits / 8;
          } else {
            return 0;
          }
        }
    }
  },
  getNativeFieldSize: function getNativeFieldSize(type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  STACK_ALIGN: 16,
  prepVararg: function prepVararg(ptr, type) {
    if (type === "double" || type === "i64") {
      if (ptr & 7) {
        assert((ptr & 7) === 4);
        ptr += 4;
      }
    } else {
      assert((ptr & 3) === 0);
    }

    return ptr;
  },
  getAlignSize: function getAlignSize(type, size, vararg) {
    if (!vararg && (type == "i64" || type == "double")) return 8;
    if (!type) return Math.min(size, 8);
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  dynCall: function dynCall(sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module["dynCall_" + sig].apply(null, args);
    } else {
      return Module["dynCall_" + sig].call(null, ptr);
    }
  },
  getFunctionTables: function getFunctionTables(module) {
    if (!module) module = Module;
    var tables = {};

    for (var t in module) {
      if (/^FUNCTION_TABLE_.*/.test(t)) {
        var table = module[t];
        if (typeof table === "object") tables[t.substr("FUNCTION_TABLE_".length)] = table;
      }
    }

    return tables;
  },
  alignFunctionTables: function alignFunctionTables(module) {
    var tables = Runtime.getFunctionTables(module);
    var maxx = 0;

    for (var sig in tables) {
      maxx = Math.max(maxx, tables[sig].length);
    }

    assert(maxx >= 0);

    for (var sig in tables) {
      var table = tables[sig];

      while (table.length < maxx) table.push(0);
    }

    return maxx;
  },
  registerFunctions: function registerFunctions(sigs, newModule) {
    sigs.forEach(function (sig) {
      if (!Module["FUNCTION_TABLE_" + sig]) {
        Module["FUNCTION_TABLE_" + sig] = [];
      }
    });
    var oldMaxx = Runtime.alignFunctionTables();
    var newMaxx = Runtime.alignFunctionTables(newModule);
    var maxx = oldMaxx + newMaxx;
    sigs.forEach(function (sig) {
      var newTable = newModule["FUNCTION_TABLE_" + sig];
      var oldTable = Module["FUNCTION_TABLE_" + sig];
      assert(newTable !== oldTable);
      assert(oldTable.length === oldMaxx);

      for (var i = 0; i < newTable.length; i++) {
        oldTable.push(newTable[i]);
      }

      assert(oldTable.length === maxx);
    });
    assert(maxx === Runtime.alignFunctionTables());
  },
  functionPointers: [],
  addFunction: function addFunction(func) {
    Runtime.alignFunctionTables();
    var tables = Runtime.getFunctionTables();
    var ret = -1;

    for (var sig in tables) {
      var table = tables[sig];
      if (ret < 0) ret = table.length;else assert(ret === table.length);
      table.push(func);
    }

    return ret;
  },
  removeFunction: function removeFunction(index) {
    Runtime.alignFunctionTables();
    var tables = Runtime.getFunctionTables();

    for (var sig in tables) {
      tables[sig][index] = null;
    }
  },
  warnOnce: function warnOnce(text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};

    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function getFuncWrapper(func, sig) {
    assert(sig);

    if (!Runtime.funcWrappers[sig]) {
      Runtime.funcWrappers[sig] = {};
    }

    var sigCache = Runtime.funcWrappers[sig];

    if (!sigCache[func]) {
      sigCache[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }

    return sigCache[func];
  },
  getCompilerSetting: function getCompilerSetting(name) {
    throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
  },
  stackAlloc: function stackAlloc(size) {
    var ret = STACKTOP;
    STACKTOP = STACKTOP + size | 0;
    STACKTOP = STACKTOP + 15 & -16;
    return ret;
  },
  staticAlloc: function staticAlloc(size) {
    var ret = STATICTOP;
    STATICTOP = STATICTOP + size | 0;
    STATICTOP = STATICTOP + 15 & -16;
    return ret;
  },
  dynamicAlloc: function dynamicAlloc(size) {
    var ret = DYNAMICTOP;
    DYNAMICTOP = DYNAMICTOP + size | 0;
    DYNAMICTOP = DYNAMICTOP + 15 & -16;

    if (DYNAMICTOP >= TOTAL_MEMORY) {
      var success = enlargeMemory();

      if (!success) {
        DYNAMICTOP = ret;
        return 0;
      }
    }

    return ret;
  },
  alignMemory: function alignMemory(size, quantum) {
    var ret = size = Math.ceil(size / (quantum ? quantum : 16)) * (quantum ? quantum : 16);
    return ret;
  },
  makeBigInt: function makeBigInt(low, high, unsigned) {
    var ret = unsigned ? +(low >>> 0) + +(high >>> 0) * +4294967296 : +(low >>> 0) + +(high | 0) * +4294967296;
    return ret;
  },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
};
Module["Runtime"] = Runtime;
var __THREW__ = 0;
var ABORT = false;
var EXITSTATUS = 0;
var undef = 0;
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed: " + text);
  }
}

var globalScope = undefined;

function getCFunc(ident) {
  var func = Module["_" + ident];

  if (!func) {
    try {
      func = eval("_" + ident);
    } catch (e) {}
  }

  assert(func, "Cannot call unknown function " + ident + " (perhaps LLVM optimizations or closure removed it?)");
  return func;
}

var cwrap, ccall;

(function () {
  var JSfuncs = {
    "stackSave": function stackSave() {
      Runtime.stackSave();
    },
    "stackRestore": function stackRestore() {
      Runtime.stackRestore();
    },
    "arrayToC": function arrayToC(arr) {
      var ret = Runtime.stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
    "stringToC": function stringToC(str) {
      var ret = 0;

      if (str !== null && str !== undefined && str !== 0) {
        ret = Runtime.stackAlloc((str.length << 2) + 1);
        writeStringToMemory(str, ret);
      }

      return ret;
    }
  };
  var toC = {
    "string": JSfuncs["stringToC"],
    "array": JSfuncs["arrayToC"]
  };

  ccall = function ccallFunc(ident, returnType, argTypes, args, opts) {
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;

    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];

        if (converter) {
          if (stack === 0) stack = Runtime.stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }

    var ret = func.apply(null, cArgs);
    if (returnType === "string") ret = Pointer_stringify(ret);

    if (stack !== 0) {
      if (opts && opts.async) {
        EmterpreterAsync.asyncFinalizers.push(function () {
          Runtime.stackRestore(stack);
        });
        return;
      }

      Runtime.stackRestore(stack);
    }

    return ret;
  };

  var sourceRegex = /^function[^\(]*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;

  function parseJSFunc(jsfunc) {
    var parsed = jsfunc.toString().match(sourceRegex).slice(1);
    return {
      arguments: parsed[0],
      body: parsed[1],
      returnValue: parsed[2]
    };
  }

  var JSsource = {};

  for (var fun in JSfuncs) {
    if (JSfuncs.hasOwnProperty(fun)) {
      JSsource[fun] = parseJSFunc(JSfuncs[fun]);
    }
  }

  cwrap = function cwrap(ident, returnType, argTypes) {
    argTypes = argTypes || [];
    var cfunc = getCFunc(ident);
    var numericArgs = argTypes.every(function (type) {
      return type === "number";
    });
    var numericRet = returnType !== "string";

    if (numericRet && numericArgs) {
      return cfunc;
    }

    var argNames = argTypes.map(function (x, i) {
      return "$" + i;
    });
    var funcstr = "(function(" + argNames.join(",") + ") {";
    var nargs = argTypes.length;

    if (!numericArgs) {
      funcstr += "var stack = " + JSsource["stackSave"].body + ";";

      for (var i = 0; i < nargs; i++) {
        var arg = argNames[i],
            type = argTypes[i];
        if (type === "number") continue;
        var convertCode = JSsource[type + "ToC"];
        funcstr += "var " + convertCode.arguments + " = " + arg + ";";
        funcstr += convertCode.body + ";";
        funcstr += arg + "=" + convertCode.returnValue + ";";
      }
    }

    var cfuncname = parseJSFunc(function () {
      return cfunc;
    }).returnValue;
    funcstr += "var ret = " + cfuncname + "(" + argNames.join(",") + ");";

    if (!numericRet) {
      var strgfy = parseJSFunc(function () {
        return Pointer_stringify;
      }).returnValue;
      funcstr += "ret = " + strgfy + "(ret);";
    }

    if (!numericArgs) {
      funcstr += JSsource["stackRestore"].body.replace("()", "(stack)") + ";";
    }

    funcstr += "return ret})";
    return eval(funcstr);
  };
})();

Module["ccall"] = ccall;
Module["cwrap"] = cwrap;

function setValue(ptr, value, type, noSafe) {
  type = type || "i8";
  if (type.charAt(type.length - 1) === "*") type = "i32";

  switch (type) {
    case "i1":
      HEAP8[ptr >> 0] = value;
      break;

    case "i8":
      HEAP8[ptr >> 0] = value;
      break;

    case "i16":
      HEAP16[ptr >> 1] = value;
      break;

    case "i32":
      HEAP32[ptr >> 2] = value;
      break;

    case "i64":
      tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= +1 ? tempDouble > +0 ? (Math_min(+Math_floor(tempDouble / +4294967296), +4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / +4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
      break;

    case "float":
      HEAPF32[ptr >> 2] = value;
      break;

    case "double":
      HEAPF64[ptr >> 3] = value;
      break;

    default:
      abort("invalid type for setValue: " + type);
  }
}

Module["setValue"] = setValue;

function getValue(ptr, type, noSafe) {
  type = type || "i8";
  if (type.charAt(type.length - 1) === "*") type = "i32";

  switch (type) {
    case "i1":
      return HEAP8[ptr >> 0];

    case "i8":
      return HEAP8[ptr >> 0];

    case "i16":
      return HEAP16[ptr >> 1];

    case "i32":
      return HEAP32[ptr >> 2];

    case "i64":
      return HEAP32[ptr >> 2];

    case "float":
      return HEAPF32[ptr >> 2];

    case "double":
      return HEAPF64[ptr >> 3];

    default:
      abort("invalid type for setValue: " + type);
  }

  return null;
}

Module["getValue"] = getValue;
var ALLOC_NORMAL = 0;
var ALLOC_STACK = 1;
var ALLOC_STATIC = 2;
var ALLOC_DYNAMIC = 3;
var ALLOC_NONE = 4;
Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
Module["ALLOC_STACK"] = ALLOC_STACK;
Module["ALLOC_STATIC"] = ALLOC_STATIC;
Module["ALLOC_DYNAMIC"] = ALLOC_DYNAMIC;
Module["ALLOC_NONE"] = ALLOC_NONE;

function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;

  if (typeof slab === "number") {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === "string" ? types : null;
  var ret;

  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret,
        stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);

    for (; ptr < stop; ptr += 4) {
      HEAP32[ptr >> 2] = 0;
    }

    stop = ret + size;

    while (ptr < stop) {
      HEAP8[ptr++ >> 0] = 0;
    }

    return ret;
  }

  if (singleType === "i8") {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }

    return ret;
  }

  var i = 0,
      type,
      typeSize,
      previousType;

  while (i < size) {
    var curr = slab[i];

    if (typeof curr === "function") {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];

    if (type === 0) {
      i++;
      continue;
    }

    if (type == "i64") type = "i32";
    setValue(ret + i, curr, type);

    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }

    i += typeSize;
  }

  return ret;
}

Module["allocate"] = allocate;

function getMemory(size) {
  if (!staticSealed) return Runtime.staticAlloc(size);
  if (typeof _sbrk !== "undefined" && !_sbrk.called || !runtimeInitialized) return Runtime.dynamicAlloc(size);
  return _malloc(size);
}

Module["getMemory"] = getMemory;

function Pointer_stringify(ptr, length) {
  if (length === 0 || !ptr) return "";
  var hasUtf = 0;
  var t;
  var i = 0;

  while (1) {
    t = HEAPU8[ptr + i >> 0];
    hasUtf |= t;
    if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }

  if (!length) length = i;
  var ret = "";

  if (hasUtf < 128) {
    var MAX_CHUNK = 1024;
    var curr;

    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }

    return ret;
  }

  return Module["UTF8ToString"](ptr);
}

Module["Pointer_stringify"] = Pointer_stringify;

function AsciiToString(ptr) {
  var str = "";

  while (1) {
    var ch = HEAP8[ptr++ >> 0];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

Module["AsciiToString"] = AsciiToString;

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

Module["stringToAscii"] = stringToAscii;

function UTF8ArrayToString(u8Array, idx) {
  var u0, u1, u2, u3, u4, u5;
  var str = "";

  while (1) {
    u0 = u8Array[idx++];
    if (!u0) return str;

    if (!(u0 & 128)) {
      str += String.fromCharCode(u0);
      continue;
    }

    u1 = u8Array[idx++] & 63;

    if ((u0 & 224) == 192) {
      str += String.fromCharCode((u0 & 31) << 6 | u1);
      continue;
    }

    u2 = u8Array[idx++] & 63;

    if ((u0 & 240) == 224) {
      u0 = (u0 & 15) << 12 | u1 << 6 | u2;
    } else {
      u3 = u8Array[idx++] & 63;

      if ((u0 & 248) == 240) {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u3;
      } else {
        u4 = u8Array[idx++] & 63;

        if ((u0 & 252) == 248) {
          u0 = (u0 & 3) << 24 | u1 << 18 | u2 << 12 | u3 << 6 | u4;
        } else {
          u5 = u8Array[idx++] & 63;
          u0 = (u0 & 1) << 30 | u1 << 24 | u2 << 18 | u3 << 12 | u4 << 6 | u5;
        }
      }
    }

    if (u0 < 65536) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 65536;
      str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
    }
  }
}

Module["UTF8ArrayToString"] = UTF8ArrayToString;

function UTF8ToString(ptr) {
  return UTF8ArrayToString(HEAPU8, ptr);
}

Module["UTF8ToString"] = UTF8ToString;

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;

  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i);
    if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;

    if (u <= 127) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 192 | u >> 6;
      outU8Array[outIdx++] = 128 | u & 63;
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 224 | u >> 12;
      outU8Array[outIdx++] = 128 | u >> 6 & 63;
      outU8Array[outIdx++] = 128 | u & 63;
    } else if (u <= 2097151) {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 240 | u >> 18;
      outU8Array[outIdx++] = 128 | u >> 12 & 63;
      outU8Array[outIdx++] = 128 | u >> 6 & 63;
      outU8Array[outIdx++] = 128 | u & 63;
    } else if (u <= 67108863) {
      if (outIdx + 4 >= endIdx) break;
      outU8Array[outIdx++] = 248 | u >> 24;
      outU8Array[outIdx++] = 128 | u >> 18 & 63;
      outU8Array[outIdx++] = 128 | u >> 12 & 63;
      outU8Array[outIdx++] = 128 | u >> 6 & 63;
      outU8Array[outIdx++] = 128 | u & 63;
    } else {
      if (outIdx + 5 >= endIdx) break;
      outU8Array[outIdx++] = 252 | u >> 30;
      outU8Array[outIdx++] = 128 | u >> 24 & 63;
      outU8Array[outIdx++] = 128 | u >> 18 & 63;
      outU8Array[outIdx++] = 128 | u >> 12 & 63;
      outU8Array[outIdx++] = 128 | u >> 6 & 63;
      outU8Array[outIdx++] = 128 | u & 63;
    }
  }

  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}

Module["stringToUTF8Array"] = stringToUTF8Array;

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

Module["stringToUTF8"] = stringToUTF8;

function lengthBytesUTF8(str) {
  var len = 0;

  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i);
    if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;

    if (u <= 127) {
      ++len;
    } else if (u <= 2047) {
      len += 2;
    } else if (u <= 65535) {
      len += 3;
    } else if (u <= 2097151) {
      len += 4;
    } else if (u <= 67108863) {
      len += 5;
    } else {
      len += 6;
    }
  }

  return len;
}

Module["lengthBytesUTF8"] = lengthBytesUTF8;

function UTF16ToString(ptr) {
  var i = 0;
  var str = "";

  while (1) {
    var codeUnit = HEAP16[ptr + i * 2 >> 1];
    if (codeUnit == 0) return str;
    ++i;
    str += String.fromCharCode(codeUnit);
  }
}

Module["UTF16ToString"] = UTF16ToString;

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 2147483647;
  }

  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2;
  var startPtr = outPtr;
  var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;

  for (var i = 0; i < numCharsToWrite; ++i) {
    var codeUnit = str.charCodeAt(i);
    HEAP16[outPtr >> 1] = codeUnit;
    outPtr += 2;
  }

  HEAP16[outPtr >> 1] = 0;
  return outPtr - startPtr;
}

Module["stringToUTF16"] = stringToUTF16;

function lengthBytesUTF16(str) {
  return str.length * 2;
}

Module["lengthBytesUTF16"] = lengthBytesUTF16;

function UTF32ToString(ptr) {
  var i = 0;
  var str = "";

  while (1) {
    var utf32 = HEAP32[ptr + i * 4 >> 2];
    if (utf32 == 0) return str;
    ++i;

    if (utf32 >= 65536) {
      var ch = utf32 - 65536;
      str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}

Module["UTF32ToString"] = UTF32ToString;

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 2147483647;
  }

  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;

  for (var i = 0; i < str.length; ++i) {
    var codeUnit = str.charCodeAt(i);

    if (codeUnit >= 55296 && codeUnit <= 57343) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
    }

    HEAP32[outPtr >> 2] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }

  HEAP32[outPtr >> 2] = 0;
  return outPtr - startPtr;
}

Module["stringToUTF32"] = stringToUTF32;

function lengthBytesUTF32(str) {
  var len = 0;

  for (var i = 0; i < str.length; ++i) {
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
    len += 4;
  }

  return len;
}

Module["lengthBytesUTF32"] = lengthBytesUTF32;

function demangle(func) {
  var hasLibcxxabi = !!Module["___cxa_demangle"];

  if (hasLibcxxabi) {
    try {
      var buf = _malloc(func.length);

      writeStringToMemory(func.substr(1), buf);

      var status = _malloc(4);

      var ret = Module["___cxa_demangle"](buf, 0, 0, status);

      if (getValue(status, "i32") === 0 && ret) {
        return Pointer_stringify(ret);
      }
    } catch (e) {} finally {
      if (buf) _free(buf);
      if (status) _free(status);
      if (ret) _free(ret);
    }
  }

  var i = 3;
  var basicTypes = {
    "v": "void",
    "b": "bool",
    "c": "char",
    "s": "short",
    "i": "int",
    "l": "long",
    "f": "float",
    "d": "double",
    "w": "wchar_t",
    "a": "signed char",
    "h": "unsigned char",
    "t": "unsigned short",
    "j": "unsigned int",
    "m": "unsigned long",
    "x": "long long",
    "y": "unsigned long long",
    "z": "..."
  };
  var subs = [];
  var first = true;

  function dump(x) {
    if (x) Module.print(x);
    Module.print(func);
    var pre = "";

    for (var a = 0; a < i; a++) pre += " ";

    Module.print(pre + "^");
  }

  function parseNested() {
    i++;
    if (func[i] === "K") i++;
    var parts = [];

    while (func[i] !== "E") {
      if (func[i] === "S") {
        i++;
        var next = func.indexOf("_", i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || "?");
        i = next + 1;
        continue;
      }

      if (func[i] === "C") {
        parts.push(parts[parts.length - 1]);
        i += 2;
        continue;
      }

      var size = parseInt(func.substr(i));
      var pre = size.toString().length;

      if (!size || !pre) {
        i--;
        break;
      }

      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }

    i++;
    return parts;
  }

  function parse(rawList, limit, allowVoid) {
    limit = limit || Infinity;
    var ret = "",
        list = [];

    function flushList() {
      return "(" + list.join(", ") + ")";
    }

    var name;

    if (func[i] === "N") {
      name = parseNested().join("::");
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      if (func[i] === "K" || first && func[i] === "L") i++;
      var size = parseInt(func.substr(i));

      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }

    first = false;

    if (func[i] === "I") {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + " " + name + "<" + iList.join(", ") + ">";
    } else {
      ret = name;
    }

    paramLoop: while (i < func.length && limit-- > 0) {
      var c = func[i++];

      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case "P":
            list.push(parse(true, 1, true)[0] + "*");
            break;

          case "R":
            list.push(parse(true, 1, true)[0] + "&");
            break;

          case "L":
            {
              i++;
              var end = func.indexOf("E", i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2;
              break;
            }
            ;

          case "A":
            {
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== "_") throw "?";
              i++;
              list.push(parse(true, 1, true)[0] + " [" + size + "]");
              break;
            }
            ;

          case "E":
            break paramLoop;

          default:
            ret += "?" + c;
            break paramLoop;
        }
      }
    }

    if (!allowVoid && list.length === 1 && list[0] === "void") list = [];

    if (rawList) {
      if (ret) {
        list.push(ret + "?");
      }

      return list;
    } else {
      return ret + flushList();
    }
  }

  var parsed = func;

  try {
    if (func == "Object._main" || func == "_main") {
      return "main()";
    }

    if (typeof func === "number") func = Pointer_stringify(func);
    if (func[0] !== "_") return func;
    if (func[1] !== "_") return func;
    if (func[2] !== "Z") return func;

    switch (func[3]) {
      case "n":
        return "operator new()";

      case "d":
        return "operator delete()";
    }

    parsed = parse();
  } catch (e) {
    parsed += "?";
  }

  if (parsed.indexOf("?") >= 0 && !hasLibcxxabi) {
    Runtime.warnOnce("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
  }

  return parsed;
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function (x) {
    var y = demangle(x);
    return x === y ? x : x + " [" + y + "]";
  });
}

function jsStackTrace() {
  var err = new Error();

  if (!err.stack) {
    try {
      throw new Error(0);
    } catch (e) {
      err = e;
    }

    if (!err.stack) {
      return "(no stack trace available)";
    }
  }

  return err.stack.toString();
}

function stackTrace() {
  return demangleAll(jsStackTrace());
}

Module["stackTrace"] = stackTrace;
var PAGE_SIZE = 4096;

function alignMemoryPage(x) {
  if (x % 4096 > 0) {
    x += 4096 - x % 4096;
  }

  return x;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STATIC_BASE = 0,
    STATICTOP = 0,
    staticSealed = false;
var STACK_BASE = 0,
    STACKTOP = 0,
    STACK_MAX = 0;
var DYNAMIC_BASE = 0,
    DYNAMICTOP = 0;

function abortOnCannotGrowMemory() {
  abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + TOTAL_MEMORY + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
}

function enlargeMemory() {
  abortOnCannotGrowMemory();
}

var TOTAL_STACK = Module["TOTAL_STACK"] || 5242880;
var TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
var totalMemory = 64 * 1024;

while (totalMemory < TOTAL_MEMORY || totalMemory < 2 * TOTAL_STACK) {
  if (totalMemory < 16 * 1024 * 1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16 * 1024 * 1024;
  }
}

if (totalMemory !== TOTAL_MEMORY) {
  TOTAL_MEMORY = totalMemory;
}

assert(typeof Int32Array !== "undefined" && typeof Float64Array !== "undefined" && !!new Int32Array(1)["subarray"] && !!new Int32Array(1)["set"], "JS engine does not provide full typed array support");
var buffer;
buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, "Typed arrays 2 must be run on a little-endian system");
Module["HEAP"] = HEAP;
Module["buffer"] = buffer;
Module["HEAP8"] = HEAP8;
Module["HEAP16"] = HEAP16;
Module["HEAP32"] = HEAP32;
Module["HEAPU8"] = HEAPU8;
Module["HEAPU16"] = HEAPU16;
Module["HEAPU32"] = HEAPU32;
Module["HEAPF32"] = HEAPF32;
Module["HEAPF64"] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while (callbacks.length > 0) {
    var callback = callbacks.shift();

    if (typeof callback == "function") {
      callback();
      continue;
    }

    var func = callback.func;

    if (typeof func === "number") {
      if (callback.arg === undefined) {
        Runtime.dynCall("v", func);
      } else {
        Runtime.dynCall("vi", func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATEXIT__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {
  if (Module["preRun"]) {
    if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];

    while (Module["preRun"].length) {
      addOnPreRun(Module["preRun"].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  if (Module["postRun"]) {
    if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];

    while (Module["postRun"].length) {
      addOnPostRun(Module["postRun"].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

Module["addOnPreRun"] = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

Module["addOnInit"] = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

Module["addOnPreMain"] = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}

Module["addOnExit"] = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

Module["addOnPostRun"] = addOnPostRun;

function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

Module["intArrayFromString"] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];

  for (var i = 0; i < array.length; i++) {
    var chr = array[i];

    if (chr > 255) {
      chr &= 255;
    }

    ret.push(String.fromCharCode(chr));
  }

  return ret.join("");
}

Module["intArrayToString"] = intArrayToString;

function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;

  while (i < array.length) {
    var chr = array[i];
    HEAP8[buffer + i >> 0] = chr;
    i = i + 1;
  }
}

Module["writeStringToMemory"] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[buffer++ >> 0] = array[i];
  }
}

Module["writeArrayToMemory"] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[buffer++ >> 0] = str.charCodeAt(i);
  }

  if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}

Module["writeAsciiToMemory"] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }

  return bits <= 32 ? 2 * Math.abs(1 << bits - 1) + value : Math.pow(2, bits) + value;
}

function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }

  var half = bits <= 32 ? Math.abs(1 << bits - 1) : Math.pow(2, bits - 1);

  if (value >= half && (bits <= 32 || value > half)) {
    value = -2 * half + value;
  }

  return value;
}

if (!Math["imul"] || Math["imul"](4294967295, 5) !== -5) Math["imul"] = function imul(a, b) {
  var ah = a >>> 16;
  var al = a & 65535;
  var bh = b >>> 16;
  var bl = b & 65535;
  return al * bl + (ah * bl + al * bh << 16) | 0;
};
Math.imul = Math["imul"];
if (!Math["clz32"]) Math["clz32"] = function (x) {
  x = x >>> 0;

  for (var i = 0; i < 32; i++) {
    if (x & 1 << 31 - i) return i;
  }

  return 32;
};
Math.clz32 = Math["clz32"];
var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;
var Math_clz32 = Math.clz32;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;

  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies);
  }
}

Module["addRunDependency"] = addRunDependency;

function removeRunDependency(id) {
  runDependencies--;

  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies);
  }

  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }

    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
}

Module["removeRunDependency"] = removeRunDependency;
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};
var memoryInitializer = null;
var ASM_CONSTS = [];
STATIC_BASE = 8;
STATICTOP = STATIC_BASE + 18352;

__ATINIT__.push();

allocate([158, 57, 0, 0, 174, 57, 0, 0, 185, 57, 0, 0, 186, 57, 0, 0, 197, 57, 0, 0, 210, 57, 0, 0, 221, 57, 0, 0, 241, 57, 0, 0, 254, 57, 0, 0, 185, 57, 0, 0, 0, 0, 0, 0, 150, 48, 7, 119, 44, 97, 14, 238, 186, 81, 9, 153, 25, 196, 109, 7, 143, 244, 106, 112, 53, 165, 99, 233, 163, 149, 100, 158, 50, 136, 219, 14, 164, 184, 220, 121, 30, 233, 213, 224, 136, 217, 210, 151, 43, 76, 182, 9, 189, 124, 177, 126, 7, 45, 184, 231, 145, 29, 191, 144, 100, 16, 183, 29, 242, 32, 176, 106, 72, 113, 185, 243, 222, 65, 190, 132, 125, 212, 218, 26, 235, 228, 221, 109, 81, 181, 212, 244, 199, 133, 211, 131, 86, 152, 108, 19, 192, 168, 107, 100, 122, 249, 98, 253, 236, 201, 101, 138, 79, 92, 1, 20, 217, 108, 6, 99, 99, 61, 15, 250, 245, 13, 8, 141, 200, 32, 110, 59, 94, 16, 105, 76, 228, 65, 96, 213, 114, 113, 103, 162, 209, 228, 3, 60, 71, 212, 4, 75, 253, 133, 13, 210, 107, 181, 10, 165, 250, 168, 181, 53, 108, 152, 178, 66, 214, 201, 187, 219, 64, 249, 188, 172, 227, 108, 216, 50, 117, 92, 223, 69, 207, 13, 214, 220, 89, 61, 209, 171, 172, 48, 217, 38, 58, 0, 222, 81, 128, 81, 215, 200, 22, 97, 208, 191, 181, 244, 180, 33, 35, 196, 179, 86, 153, 149, 186, 207, 15, 165, 189, 184, 158, 184, 2, 40, 8, 136, 5, 95, 178, 217, 12, 198, 36, 233, 11, 177, 135, 124, 111, 47, 17, 76, 104, 88, 171, 29, 97, 193, 61, 45, 102, 182, 144, 65, 220, 118, 6, 113, 219, 1, 188, 32, 210, 152, 42, 16, 213, 239, 137, 133, 177, 113, 31, 181, 182, 6, 165, 228, 191, 159, 51, 212, 184, 232, 162, 201, 7, 120, 52, 249, 0, 15, 142, 168, 9, 150, 24, 152, 14, 225, 187, 13, 106, 127, 45, 61, 109, 8, 151, 108, 100, 145, 1, 92, 99, 230, 244, 81, 107, 107, 98, 97, 108, 28, 216, 48, 101, 133, 78, 0, 98, 242, 237, 149, 6, 108, 123, 165, 1, 27, 193, 244, 8, 130, 87, 196, 15, 245, 198, 217, 176, 101, 80, 233, 183, 18, 234, 184, 190, 139, 124, 136, 185, 252, 223, 29, 221, 98, 73, 45, 218, 21, 243, 124, 211, 140, 101, 76, 212, 251, 88, 97, 178, 77, 206, 81, 181, 58, 116, 0, 188, 163, 226, 48, 187, 212, 65, 165, 223, 74, 215, 149, 216, 61, 109, 196, 209, 164, 251, 244, 214, 211, 106, 233, 105, 67, 252, 217, 110, 52, 70, 136, 103, 173, 208, 184, 96, 218, 115, 45, 4, 68, 229, 29, 3, 51, 95, 76, 10, 170, 201, 124, 13, 221, 60, 113, 5, 80, 170, 65, 2, 39, 16, 16, 11, 190, 134, 32, 12, 201, 37, 181, 104, 87, 179, 133, 111, 32, 9, 212, 102, 185, 159, 228, 97, 206, 14, 249, 222, 94, 152, 201, 217, 41, 34, 152, 208, 176, 180, 168, 215, 199, 23, 61, 179, 89, 129, 13, 180, 46, 59, 92, 189, 183, 173, 108, 186, 192, 32, 131, 184, 237, 182, 179, 191, 154, 12, 226, 182, 3, 154, 210, 177, 116, 57, 71, 213, 234, 175, 119, 210, 157, 21, 38, 219, 4, 131, 22, 220, 115, 18, 11, 99, 227, 132, 59, 100, 148, 62, 106, 109, 13, 168, 90, 106, 122, 11, 207, 14, 228, 157, 255, 9, 147, 39, 174, 0, 10, 177, 158, 7, 125, 68, 147, 15, 240, 210, 163, 8, 135, 104, 242, 1, 30, 254, 194, 6, 105, 93, 87, 98, 247, 203, 103, 101, 128, 113, 54, 108, 25, 231, 6, 107, 110, 118, 27, 212, 254, 224, 43, 211, 137, 90, 122, 218, 16, 204, 74, 221, 103, 111, 223, 185, 249, 249, 239, 190, 142, 67, 190, 183, 23, 213, 142, 176, 96, 232, 163, 214, 214, 126, 147, 209, 161, 196, 194, 216, 56, 82, 242, 223, 79, 241, 103, 187, 209, 103, 87, 188, 166, 221, 6, 181, 63, 75, 54, 178, 72, 218, 43, 13, 216, 76, 27, 10, 175, 246, 74, 3, 54, 96, 122, 4, 65, 195, 239, 96, 223, 85, 223, 103, 168, 239, 142, 110, 49, 121, 190, 105, 70, 140, 179, 97, 203, 26, 131, 102, 188, 160, 210, 111, 37, 54, 226, 104, 82, 149, 119, 12, 204, 3, 71, 11, 187, 185, 22, 2, 34, 47, 38, 5, 85, 190, 59, 186, 197, 40, 11, 189, 178, 146, 90, 180, 43, 4, 106, 179, 92, 167, 255, 215, 194, 49, 207, 208, 181, 139, 158, 217, 44, 29, 174, 222, 91, 176, 194, 100, 155, 38, 242, 99, 236, 156, 163, 106, 117, 10, 147, 109, 2, 169, 6, 9, 156, 63, 54, 14, 235, 133, 103, 7, 114, 19, 87, 0, 5, 130, 74, 191, 149, 20, 122, 184, 226, 174, 43, 177, 123, 56, 27, 182, 12, 155, 142, 210, 146, 13, 190, 213, 229, 183, 239, 220, 124, 33, 223, 219, 11, 212, 210, 211, 134, 66, 226, 212, 241, 248, 179, 221, 104, 110, 131, 218, 31, 205, 22, 190, 129, 91, 38, 185, 246, 225, 119, 176, 111, 119, 71, 183, 24, 230, 90, 8, 136, 112, 106, 15, 255, 202, 59, 6, 102, 92, 11, 1, 17, 255, 158, 101, 143, 105, 174, 98, 248, 211, 255, 107, 97, 69, 207, 108, 22, 120, 226, 10, 160, 238, 210, 13, 215, 84, 131, 4, 78, 194, 179, 3, 57, 97, 38, 103, 167, 247, 22, 96, 208, 77, 71, 105, 73, 219, 119, 110, 62, 74, 106, 209, 174, 220, 90, 214, 217, 102, 11, 223, 64, 240, 59, 216, 55, 83, 174, 188, 169, 197, 158, 187, 222, 127, 207, 178, 71, 233, 255, 181, 48, 28, 242, 189, 189, 138, 194, 186, 202, 48, 147, 179, 83, 166, 163, 180, 36, 5, 54, 208, 186, 147, 6, 215, 205, 41, 87, 222, 84, 191, 103, 217, 35, 46, 122, 102, 179, 184, 74, 97, 196, 2, 27, 104, 93, 148, 43, 111, 42, 55, 190, 11, 180, 161, 142, 12, 195, 27, 223, 5, 90, 141, 239, 2, 45, 0, 0, 0, 0, 65, 49, 27, 25, 130, 98, 54, 50, 195, 83, 45, 43, 4, 197, 108, 100, 69, 244, 119, 125, 134, 167, 90, 86, 199, 150, 65, 79, 8, 138, 217, 200, 73, 187, 194, 209, 138, 232, 239, 250, 203, 217, 244, 227, 12, 79, 181, 172, 77, 126, 174, 181, 142, 45, 131, 158, 207, 28, 152, 135, 81, 18, 194, 74, 16, 35, 217, 83, 211, 112, 244, 120, 146, 65, 239, 97, 85, 215, 174, 46, 20, 230, 181, 55, 215, 181, 152, 28, 150, 132, 131, 5, 89, 152, 27, 130, 24, 169, 0, 155, 219, 250, 45, 176, 154, 203, 54, 169, 93, 93, 119, 230, 28, 108, 108, 255, 223, 63, 65, 212, 158, 14, 90, 205, 162, 36, 132, 149, 227, 21, 159, 140, 32, 70, 178, 167, 97, 119, 169, 190, 166, 225, 232, 241, 231, 208, 243, 232, 36, 131, 222, 195, 101, 178, 197, 218, 170, 174, 93, 93, 235, 159, 70, 68, 40, 204, 107, 111, 105, 253, 112, 118, 174, 107, 49, 57, 239, 90, 42, 32, 44, 9, 7, 11, 109, 56, 28, 18, 243, 54, 70, 223, 178, 7, 93, 198, 113, 84, 112, 237, 48, 101, 107, 244, 247, 243, 42, 187, 182, 194, 49, 162, 117, 145, 28, 137, 52, 160, 7, 144, 251, 188, 159, 23, 186, 141, 132, 14, 121, 222, 169, 37, 56, 239, 178, 60, 255, 121, 243, 115, 190, 72, 232, 106, 125, 27, 197, 65, 60, 42, 222, 88, 5, 79, 121, 240, 68, 126, 98, 233, 135, 45, 79, 194, 198, 28, 84, 219, 1, 138, 21, 148, 64, 187, 14, 141, 131, 232, 35, 166, 194, 217, 56, 191, 13, 197, 160, 56, 76, 244, 187, 33, 143, 167, 150, 10, 206, 150, 141, 19, 9, 0, 204, 92, 72, 49, 215, 69, 139, 98, 250, 110, 202, 83, 225, 119, 84, 93, 187, 186, 21, 108, 160, 163, 214, 63, 141, 136, 151, 14, 150, 145, 80, 152, 215, 222, 17, 169, 204, 199, 210, 250, 225, 236, 147, 203, 250, 245, 92, 215, 98, 114, 29, 230, 121, 107, 222, 181, 84, 64, 159, 132, 79, 89, 88, 18, 14, 22, 25, 35, 21, 15, 218, 112, 56, 36, 155, 65, 35, 61, 167, 107, 253, 101, 230, 90, 230, 124, 37, 9, 203, 87, 100, 56, 208, 78, 163, 174, 145, 1, 226, 159, 138, 24, 33, 204, 167, 51, 96, 253, 188, 42, 175, 225, 36, 173, 238, 208, 63, 180, 45, 131, 18, 159, 108, 178, 9, 134, 171, 36, 72, 201, 234, 21, 83, 208, 41, 70, 126, 251, 104, 119, 101, 226, 246, 121, 63, 47, 183, 72, 36, 54, 116, 27, 9, 29, 53, 42, 18, 4, 242, 188, 83, 75, 179, 141, 72, 82, 112, 222, 101, 121, 49, 239, 126, 96, 254, 243, 230, 231, 191, 194, 253, 254, 124, 145, 208, 213, 61, 160, 203, 204, 250, 54, 138, 131, 187, 7, 145, 154, 120, 84, 188, 177, 57, 101, 167, 168, 75, 152, 131, 59, 10, 169, 152, 34, 201, 250, 181, 9, 136, 203, 174, 16, 79, 93, 239, 95, 14, 108, 244, 70, 205, 63, 217, 109, 140, 14, 194, 116, 67, 18, 90, 243, 2, 35, 65, 234, 193, 112, 108, 193, 128, 65, 119, 216, 71, 215, 54, 151, 6, 230, 45, 142, 197, 181, 0, 165, 132, 132, 27, 188, 26, 138, 65, 113, 91, 187, 90, 104, 152, 232, 119, 67, 217, 217, 108, 90, 30, 79, 45, 21, 95, 126, 54, 12, 156, 45, 27, 39, 221, 28, 0, 62, 18, 0, 152, 185, 83, 49, 131, 160, 144, 98, 174, 139, 209, 83, 181, 146, 22, 197, 244, 221, 87, 244, 239, 196, 148, 167, 194, 239, 213, 150, 217, 246, 233, 188, 7, 174, 168, 141, 28, 183, 107, 222, 49, 156, 42, 239, 42, 133, 237, 121, 107, 202, 172, 72, 112, 211, 111, 27, 93, 248, 46, 42, 70, 225, 225, 54, 222, 102, 160, 7, 197, 127, 99, 84, 232, 84, 34, 101, 243, 77, 229, 243, 178, 2, 164, 194, 169, 27, 103, 145, 132, 48, 38, 160, 159, 41, 184, 174, 197, 228, 249, 159, 222, 253, 58, 204, 243, 214, 123, 253, 232, 207, 188, 107, 169, 128, 253, 90, 178, 153, 62, 9, 159, 178, 127, 56, 132, 171, 176, 36, 28, 44, 241, 21, 7, 53, 50, 70, 42, 30, 115, 119, 49, 7, 180, 225, 112, 72, 245, 208, 107, 81, 54, 131, 70, 122, 119, 178, 93, 99, 78, 215, 250, 203, 15, 230, 225, 210, 204, 181, 204, 249, 141, 132, 215, 224, 74, 18, 150, 175, 11, 35, 141, 182, 200, 112, 160, 157, 137, 65, 187, 132, 70, 93, 35, 3, 7, 108, 56, 26, 196, 63, 21, 49, 133, 14, 14, 40, 66, 152, 79, 103, 3, 169, 84, 126, 192, 250, 121, 85, 129, 203, 98, 76, 31, 197, 56, 129, 94, 244, 35, 152, 157, 167, 14, 179, 220, 150, 21, 170, 27, 0, 84, 229, 90, 49, 79, 252, 153, 98, 98, 215, 216, 83, 121, 206, 23, 79, 225, 73, 86, 126, 250, 80, 149, 45, 215, 123, 212, 28, 204, 98, 19, 138, 141, 45, 82, 187, 150, 52, 145, 232, 187, 31, 208, 217, 160, 6, 236, 243, 126, 94, 173, 194, 101, 71, 110, 145, 72, 108, 47, 160, 83, 117, 232, 54, 18, 58, 169, 7, 9, 35, 106, 84, 36, 8, 43, 101, 63, 17, 228, 121, 167, 150, 165, 72, 188, 143, 102, 27, 145, 164, 39, 42, 138, 189, 224, 188, 203, 242, 161, 141, 208, 235, 98, 222, 253, 192, 35, 239, 230, 217, 189, 225, 188, 20, 252, 208, 167, 13, 63, 131, 138, 38, 126, 178, 145, 63, 185, 36, 208, 112, 248, 21, 203, 105, 59, 70, 230, 66, 122, 119, 253, 91, 181, 107, 101, 220, 244, 90, 126, 197, 55, 9, 83, 238, 118, 56, 72, 247, 177, 174, 9, 184, 240, 159, 18, 161, 51, 204, 63, 138, 114, 253, 36, 147, 0, 0, 0, 0, 55, 106, 194, 1, 110, 212, 132, 3, 89, 190, 70, 2, 220, 168, 9, 7, 235, 194, 203, 6, 178, 124, 141, 4, 133, 22, 79, 5, 184, 81, 19, 14, 143, 59, 209, 15, 214, 133, 151, 13, 225, 239, 85, 12, 100, 249, 26, 9, 83, 147, 216, 8, 10, 45, 158, 10, 61, 71, 92, 11, 112, 163, 38, 28, 71, 201, 228, 29, 30, 119, 162, 31, 41, 29, 96, 30, 172, 11, 47, 27, 155, 97, 237, 26, 194, 223, 171, 24, 245, 181, 105, 25, 200, 242, 53, 18, 255, 152, 247, 19, 166, 38, 177, 17, 145, 76, 115, 16, 20, 90, 60, 21, 35, 48, 254, 20, 122, 142, 184, 22, 77, 228, 122, 23, 224, 70, 77, 56, 215, 44, 143, 57, 142, 146, 201, 59, 185, 248, 11, 58, 60, 238, 68, 63, 11, 132, 134, 62, 82, 58, 192, 60, 101, 80, 2, 61, 88, 23, 94, 54, 111, 125, 156, 55, 54, 195, 218, 53, 1, 169, 24, 52, 132, 191, 87, 49, 179, 213, 149, 48, 234, 107, 211, 50, 221, 1, 17, 51, 144, 229, 107, 36, 167, 143, 169, 37, 254, 49, 239, 39, 201, 91, 45, 38, 76, 77, 98, 35, 123, 39, 160, 34, 34, 153, 230, 32, 21, 243, 36, 33, 40, 180, 120, 42, 31, 222, 186, 43, 70, 96, 252, 41, 113, 10, 62, 40, 244, 28, 113, 45, 195, 118, 179, 44, 154, 200, 245, 46, 173, 162, 55, 47, 192, 141, 154, 112, 247, 231, 88, 113, 174, 89, 30, 115, 153, 51, 220, 114, 28, 37, 147, 119, 43, 79, 81, 118, 114, 241, 23, 116, 69, 155, 213, 117, 120, 220, 137, 126, 79, 182, 75, 127, 22, 8, 13, 125, 33, 98, 207, 124, 164, 116, 128, 121, 147, 30, 66, 120, 202, 160, 4, 122, 253, 202, 198, 123, 176, 46, 188, 108, 135, 68, 126, 109, 222, 250, 56, 111, 233, 144, 250, 110, 108, 134, 181, 107, 91, 236, 119, 106, 2, 82, 49, 104, 53, 56, 243, 105, 8, 127, 175, 98, 63, 21, 109, 99, 102, 171, 43, 97, 81, 193, 233, 96, 212, 215, 166, 101, 227, 189, 100, 100, 186, 3, 34, 102, 141, 105, 224, 103, 32, 203, 215, 72, 23, 161, 21, 73, 78, 31, 83, 75, 121, 117, 145, 74, 252, 99, 222, 79, 203, 9, 28, 78, 146, 183, 90, 76, 165, 221, 152, 77, 152, 154, 196, 70, 175, 240, 6, 71, 246, 78, 64, 69, 193, 36, 130, 68, 68, 50, 205, 65, 115, 88, 15, 64, 42, 230, 73, 66, 29, 140, 139, 67, 80, 104, 241, 84, 103, 2, 51, 85, 62, 188, 117, 87, 9, 214, 183, 86, 140, 192, 248, 83, 187, 170, 58, 82, 226, 20, 124, 80, 213, 126, 190, 81, 232, 57, 226, 90, 223, 83, 32, 91, 134, 237, 102, 89, 177, 135, 164, 88, 52, 145, 235, 93, 3, 251, 41, 92, 90, 69, 111, 94, 109, 47, 173, 95, 128, 27, 53, 225, 183, 113, 247, 224, 238, 207, 177, 226, 217, 165, 115, 227, 92, 179, 60, 230, 107, 217, 254, 231, 50, 103, 184, 229, 5, 13, 122, 228, 56, 74, 38, 239, 15, 32, 228, 238, 86, 158, 162, 236, 97, 244, 96, 237, 228, 226, 47, 232, 211, 136, 237, 233, 138, 54, 171, 235, 189, 92, 105, 234, 240, 184, 19, 253, 199, 210, 209, 252, 158, 108, 151, 254, 169, 6, 85, 255, 44, 16, 26, 250, 27, 122, 216, 251, 66, 196, 158, 249, 117, 174, 92, 248, 72, 233, 0, 243, 127, 131, 194, 242, 38, 61, 132, 240, 17, 87, 70, 241, 148, 65, 9, 244, 163, 43, 203, 245, 250, 149, 141, 247, 205, 255, 79, 246, 96, 93, 120, 217, 87, 55, 186, 216, 14, 137, 252, 218, 57, 227, 62, 219, 188, 245, 113, 222, 139, 159, 179, 223, 210, 33, 245, 221, 229, 75, 55, 220, 216, 12, 107, 215, 239, 102, 169, 214, 182, 216, 239, 212, 129, 178, 45, 213, 4, 164, 98, 208, 51, 206, 160, 209, 106, 112, 230, 211, 93, 26, 36, 210, 16, 254, 94, 197, 39, 148, 156, 196, 126, 42, 218, 198, 73, 64, 24, 199, 204, 86, 87, 194, 251, 60, 149, 195, 162, 130, 211, 193, 149, 232, 17, 192, 168, 175, 77, 203, 159, 197, 143, 202, 198, 123, 201, 200, 241, 17, 11, 201, 116, 7, 68, 204, 67, 109, 134, 205, 26, 211, 192, 207, 45, 185, 2, 206, 64, 150, 175, 145, 119, 252, 109, 144, 46, 66, 43, 146, 25, 40, 233, 147, 156, 62, 166, 150, 171, 84, 100, 151, 242, 234, 34, 149, 197, 128, 224, 148, 248, 199, 188, 159, 207, 173, 126, 158, 150, 19, 56, 156, 161, 121, 250, 157, 36, 111, 181, 152, 19, 5, 119, 153, 74, 187, 49, 155, 125, 209, 243, 154, 48, 53, 137, 141, 7, 95, 75, 140, 94, 225, 13, 142, 105, 139, 207, 143, 236, 157, 128, 138, 219, 247, 66, 139, 130, 73, 4, 137, 181, 35, 198, 136, 136, 100, 154, 131, 191, 14, 88, 130, 230, 176, 30, 128, 209, 218, 220, 129, 84, 204, 147, 132, 99, 166, 81, 133, 58, 24, 23, 135, 13, 114, 213, 134, 160, 208, 226, 169, 151, 186, 32, 168, 206, 4, 102, 170, 249, 110, 164, 171, 124, 120, 235, 174, 75, 18, 41, 175, 18, 172, 111, 173, 37, 198, 173, 172, 24, 129, 241, 167, 47, 235, 51, 166, 118, 85, 117, 164, 65, 63, 183, 165, 196, 41, 248, 160, 243, 67, 58, 161, 170, 253, 124, 163, 157, 151, 190, 162, 208, 115, 196, 181, 231, 25, 6, 180, 190, 167, 64, 182, 137, 205, 130, 183, 12, 219, 205, 178, 59, 177, 15, 179, 98, 15, 73, 177, 85, 101, 139, 176, 104, 34, 215, 187, 95, 72, 21, 186, 6, 246, 83, 184, 49, 156, 145, 185, 180, 138, 222, 188, 131, 224, 28, 189, 218, 94, 90, 191, 237, 52, 152, 190, 0, 0, 0, 0, 101, 103, 188, 184, 139, 200, 9, 170, 238, 175, 181, 18, 87, 151, 98, 143, 50, 240, 222, 55, 220, 95, 107, 37, 185, 56, 215, 157, 239, 40, 180, 197, 138, 79, 8, 125, 100, 224, 189, 111, 1, 135, 1, 215, 184, 191, 214, 74, 221, 216, 106, 242, 51, 119, 223, 224, 86, 16, 99, 88, 159, 87, 25, 80, 250, 48, 165, 232, 20, 159, 16, 250, 113, 248, 172, 66, 200, 192, 123, 223, 173, 167, 199, 103, 67, 8, 114, 117, 38, 111, 206, 205, 112, 127, 173, 149, 21, 24, 17, 45, 251, 183, 164, 63, 158, 208, 24, 135, 39, 232, 207, 26, 66, 143, 115, 162, 172, 32, 198, 176, 201, 71, 122, 8, 62, 175, 50, 160, 91, 200, 142, 24, 181, 103, 59, 10, 208, 0, 135, 178, 105, 56, 80, 47, 12, 95, 236, 151, 226, 240, 89, 133, 135, 151, 229, 61, 209, 135, 134, 101, 180, 224, 58, 221, 90, 79, 143, 207, 63, 40, 51, 119, 134, 16, 228, 234, 227, 119, 88, 82, 13, 216, 237, 64, 104, 191, 81, 248, 161, 248, 43, 240, 196, 159, 151, 72, 42, 48, 34, 90, 79, 87, 158, 226, 246, 111, 73, 127, 147, 8, 245, 199, 125, 167, 64, 213, 24, 192, 252, 109, 78, 208, 159, 53, 43, 183, 35, 141, 197, 24, 150, 159, 160, 127, 42, 39, 25, 71, 253, 186, 124, 32, 65, 2, 146, 143, 244, 16, 247, 232, 72, 168, 61, 88, 20, 155, 88, 63, 168, 35, 182, 144, 29, 49, 211, 247, 161, 137, 106, 207, 118, 20, 15, 168, 202, 172, 225, 7, 127, 190, 132, 96, 195, 6, 210, 112, 160, 94, 183, 23, 28, 230, 89, 184, 169, 244, 60, 223, 21, 76, 133, 231, 194, 209, 224, 128, 126, 105, 14, 47, 203, 123, 107, 72, 119, 195, 162, 15, 13, 203, 199, 104, 177, 115, 41, 199, 4, 97, 76, 160, 184, 217, 245, 152, 111, 68, 144, 255, 211, 252, 126, 80, 102, 238, 27, 55, 218, 86, 77, 39, 185, 14, 40, 64, 5, 182, 198, 239, 176, 164, 163, 136, 12, 28, 26, 176, 219, 129, 127, 215, 103, 57, 145, 120, 210, 43, 244, 31, 110, 147, 3, 247, 38, 59, 102, 144, 154, 131, 136, 63, 47, 145, 237, 88, 147, 41, 84, 96, 68, 180, 49, 7, 248, 12, 223, 168, 77, 30, 186, 207, 241, 166, 236, 223, 146, 254, 137, 184, 46, 70, 103, 23, 155, 84, 2, 112, 39, 236, 187, 72, 240, 113, 222, 47, 76, 201, 48, 128, 249, 219, 85, 231, 69, 99, 156, 160, 63, 107, 249, 199, 131, 211, 23, 104, 54, 193, 114, 15, 138, 121, 203, 55, 93, 228, 174, 80, 225, 92, 64, 255, 84, 78, 37, 152, 232, 246, 115, 136, 139, 174, 22, 239, 55, 22, 248, 64, 130, 4, 157, 39, 62, 188, 36, 31, 233, 33, 65, 120, 85, 153, 175, 215, 224, 139, 202, 176, 92, 51, 59, 182, 89, 237, 94, 209, 229, 85, 176, 126, 80, 71, 213, 25, 236, 255, 108, 33, 59, 98, 9, 70, 135, 218, 231, 233, 50, 200, 130, 142, 142, 112, 212, 158, 237, 40, 177, 249, 81, 144, 95, 86, 228, 130, 58, 49, 88, 58, 131, 9, 143, 167, 230, 110, 51, 31, 8, 193, 134, 13, 109, 166, 58, 181, 164, 225, 64, 189, 193, 134, 252, 5, 47, 41, 73, 23, 74, 78, 245, 175, 243, 118, 34, 50, 150, 17, 158, 138, 120, 190, 43, 152, 29, 217, 151, 32, 75, 201, 244, 120, 46, 174, 72, 192, 192, 1, 253, 210, 165, 102, 65, 106, 28, 94, 150, 247, 121, 57, 42, 79, 151, 150, 159, 93, 242, 241, 35, 229, 5, 25, 107, 77, 96, 126, 215, 245, 142, 209, 98, 231, 235, 182, 222, 95, 82, 142, 9, 194, 55, 233, 181, 122, 217, 70, 0, 104, 188, 33, 188, 208, 234, 49, 223, 136, 143, 86, 99, 48, 97, 249, 214, 34, 4, 158, 106, 154, 189, 166, 189, 7, 216, 193, 1, 191, 54, 110, 180, 173, 83, 9, 8, 21, 154, 78, 114, 29, 255, 41, 206, 165, 17, 134, 123, 183, 116, 225, 199, 15, 205, 217, 16, 146, 168, 190, 172, 42, 70, 17, 25, 56, 35, 118, 165, 128, 117, 102, 198, 216, 16, 1, 122, 96, 254, 174, 207, 114, 155, 201, 115, 202, 34, 241, 164, 87, 71, 150, 24, 239, 169, 57, 173, 253, 204, 94, 17, 69, 6, 238, 77, 118, 99, 137, 241, 206, 141, 38, 68, 220, 232, 65, 248, 100, 81, 121, 47, 249, 52, 30, 147, 65, 218, 177, 38, 83, 191, 214, 154, 235, 233, 198, 249, 179, 140, 161, 69, 11, 98, 14, 240, 25, 7, 105, 76, 161, 190, 81, 155, 60, 219, 54, 39, 132, 53, 153, 146, 150, 80, 254, 46, 46, 153, 185, 84, 38, 252, 222, 232, 158, 18, 113, 93, 140, 119, 22, 225, 52, 206, 46, 54, 169, 171, 73, 138, 17, 69, 230, 63, 3, 32, 129, 131, 187, 118, 145, 224, 227, 19, 246, 92, 91, 253, 89, 233, 73, 152, 62, 85, 241, 33, 6, 130, 108, 68, 97, 62, 212, 170, 206, 139, 198, 207, 169, 55, 126, 56, 65, 127, 214, 93, 38, 195, 110, 179, 137, 118, 124, 214, 238, 202, 196, 111, 214, 29, 89, 10, 177, 161, 225, 228, 30, 20, 243, 129, 121, 168, 75, 215, 105, 203, 19, 178, 14, 119, 171, 92, 161, 194, 185, 57, 198, 126, 1, 128, 254, 169, 156, 229, 153, 21, 36, 11, 54, 160, 54, 110, 81, 28, 142, 167, 22, 102, 134, 194, 113, 218, 62, 44, 222, 111, 44, 73, 185, 211, 148, 240, 129, 4, 9, 149, 230, 184, 177, 123, 73, 13, 163, 30, 46, 177, 27, 72, 62, 210, 67, 45, 89, 110, 251, 195, 246, 219, 233, 166, 145, 103, 81, 31, 169, 176, 204, 122, 206, 12, 116, 148, 97, 185, 102, 241, 6, 5, 222, 0, 0, 0, 0, 119, 7, 48, 150, 238, 14, 97, 44, 153, 9, 81, 186, 7, 109, 196, 25, 112, 106, 244, 143, 233, 99, 165, 53, 158, 100, 149, 163, 14, 219, 136, 50, 121, 220, 184, 164, 224, 213, 233, 30, 151, 210, 217, 136, 9, 182, 76, 43, 126, 177, 124, 189, 231, 184, 45, 7, 144, 191, 29, 145, 29, 183, 16, 100, 106, 176, 32, 242, 243, 185, 113, 72, 132, 190, 65, 222, 26, 218, 212, 125, 109, 221, 228, 235, 244, 212, 181, 81, 131, 211, 133, 199, 19, 108, 152, 86, 100, 107, 168, 192, 253, 98, 249, 122, 138, 101, 201, 236, 20, 1, 92, 79, 99, 6, 108, 217, 250, 15, 61, 99, 141, 8, 13, 245, 59, 110, 32, 200, 76, 105, 16, 94, 213, 96, 65, 228, 162, 103, 113, 114, 60, 3, 228, 209, 75, 4, 212, 71, 210, 13, 133, 253, 165, 10, 181, 107, 53, 181, 168, 250, 66, 178, 152, 108, 219, 187, 201, 214, 172, 188, 249, 64, 50, 216, 108, 227, 69, 223, 92, 117, 220, 214, 13, 207, 171, 209, 61, 89, 38, 217, 48, 172, 81, 222, 0, 58, 200, 215, 81, 128, 191, 208, 97, 22, 33, 180, 244, 181, 86, 179, 196, 35, 207, 186, 149, 153, 184, 189, 165, 15, 40, 2, 184, 158, 95, 5, 136, 8, 198, 12, 217, 178, 177, 11, 233, 36, 47, 111, 124, 135, 88, 104, 76, 17, 193, 97, 29, 171, 182, 102, 45, 61, 118, 220, 65, 144, 1, 219, 113, 6, 152, 210, 32, 188, 239, 213, 16, 42, 113, 177, 133, 137, 6, 182, 181, 31, 159, 191, 228, 165, 232, 184, 212, 51, 120, 7, 201, 162, 15, 0, 249, 52, 150, 9, 168, 142, 225, 14, 152, 24, 127, 106, 13, 187, 8, 109, 61, 45, 145, 100, 108, 151, 230, 99, 92, 1, 107, 107, 81, 244, 28, 108, 97, 98, 133, 101, 48, 216, 242, 98, 0, 78, 108, 6, 149, 237, 27, 1, 165, 123, 130, 8, 244, 193, 245, 15, 196, 87, 101, 176, 217, 198, 18, 183, 233, 80, 139, 190, 184, 234, 252, 185, 136, 124, 98, 221, 29, 223, 21, 218, 45, 73, 140, 211, 124, 243, 251, 212, 76, 101, 77, 178, 97, 88, 58, 181, 81, 206, 163, 188, 0, 116, 212, 187, 48, 226, 74, 223, 165, 65, 61, 216, 149, 215, 164, 209, 196, 109, 211, 214, 244, 251, 67, 105, 233, 106, 52, 110, 217, 252, 173, 103, 136, 70, 218, 96, 184, 208, 68, 4, 45, 115, 51, 3, 29, 229, 170, 10, 76, 95, 221, 13, 124, 201, 80, 5, 113, 60, 39, 2, 65, 170, 190, 11, 16, 16, 201, 12, 32, 134, 87, 104, 181, 37, 32, 111, 133, 179, 185, 102, 212, 9, 206, 97, 228, 159, 94, 222, 249, 14, 41, 217, 201, 152, 176, 208, 152, 34, 199, 215, 168, 180, 89, 179, 61, 23, 46, 180, 13, 129, 183, 189, 92, 59, 192, 186, 108, 173, 237, 184, 131, 32, 154, 191, 179, 182, 3, 182, 226, 12, 116, 177, 210, 154, 234, 213, 71, 57, 157, 210, 119, 175, 4, 219, 38, 21, 115, 220, 22, 131, 227, 99, 11, 18, 148, 100, 59, 132, 13, 109, 106, 62, 122, 106, 90, 168, 228, 14, 207, 11, 147, 9, 255, 157, 10, 0, 174, 39, 125, 7, 158, 177, 240, 15, 147, 68, 135, 8, 163, 210, 30, 1, 242, 104, 105, 6, 194, 254, 247, 98, 87, 93, 128, 101, 103, 203, 25, 108, 54, 113, 110, 107, 6, 231, 254, 212, 27, 118, 137, 211, 43, 224, 16, 218, 122, 90, 103, 221, 74, 204, 249, 185, 223, 111, 142, 190, 239, 249, 23, 183, 190, 67, 96, 176, 142, 213, 214, 214, 163, 232, 161, 209, 147, 126, 56, 216, 194, 196, 79, 223, 242, 82, 209, 187, 103, 241, 166, 188, 87, 103, 63, 181, 6, 221, 72, 178, 54, 75, 216, 13, 43, 218, 175, 10, 27, 76, 54, 3, 74, 246, 65, 4, 122, 96, 223, 96, 239, 195, 168, 103, 223, 85, 49, 110, 142, 239, 70, 105, 190, 121, 203, 97, 179, 140, 188, 102, 131, 26, 37, 111, 210, 160, 82, 104, 226, 54, 204, 12, 119, 149, 187, 11, 71, 3, 34, 2, 22, 185, 85, 5, 38, 47, 197, 186, 59, 190, 178, 189, 11, 40, 43, 180, 90, 146, 92, 179, 106, 4, 194, 215, 255, 167, 181, 208, 207, 49, 44, 217, 158, 139, 91, 222, 174, 29, 155, 100, 194, 176, 236, 99, 242, 38, 117, 106, 163, 156, 2, 109, 147, 10, 156, 9, 6, 169, 235, 14, 54, 63, 114, 7, 103, 133, 5, 0, 87, 19, 149, 191, 74, 130, 226, 184, 122, 20, 123, 177, 43, 174, 12, 182, 27, 56, 146, 210, 142, 155, 229, 213, 190, 13, 124, 220, 239, 183, 11, 219, 223, 33, 134, 211, 210, 212, 241, 212, 226, 66, 104, 221, 179, 248, 31, 218, 131, 110, 129, 190, 22, 205, 246, 185, 38, 91, 111, 176, 119, 225, 24, 183, 71, 119, 136, 8, 90, 230, 255, 15, 106, 112, 102, 6, 59, 202, 17, 1, 11, 92, 143, 101, 158, 255, 248, 98, 174, 105, 97, 107, 255, 211, 22, 108, 207, 69, 160, 10, 226, 120, 215, 13, 210, 238, 78, 4, 131, 84, 57, 3, 179, 194, 167, 103, 38, 97, 208, 96, 22, 247, 73, 105, 71, 77, 62, 110, 119, 219, 174, 209, 106, 74, 217, 214, 90, 220, 64, 223, 11, 102, 55, 216, 59, 240, 169, 188, 174, 83, 222, 187, 158, 197, 71, 178, 207, 127, 48, 181, 255, 233, 189, 189, 242, 28, 202, 186, 194, 138, 83, 179, 147, 48, 36, 180, 163, 166, 186, 208, 54, 5, 205, 215, 6, 147, 84, 222, 87, 41, 35, 217, 103, 191, 179, 102, 122, 46, 196, 97, 74, 184, 93, 104, 27, 2, 42, 111, 43, 148, 180, 11, 190, 55, 195, 12, 142, 161, 90, 5, 223, 27, 45, 2, 239, 141, 0, 0, 0, 0, 25, 27, 49, 65, 50, 54, 98, 130, 43, 45, 83, 195, 100, 108, 197, 4, 125, 119, 244, 69, 86, 90, 167, 134, 79, 65, 150, 199, 200, 217, 138, 8, 209, 194, 187, 73, 250, 239, 232, 138, 227, 244, 217, 203, 172, 181, 79, 12, 181, 174, 126, 77, 158, 131, 45, 142, 135, 152, 28, 207, 74, 194, 18, 81, 83, 217, 35, 16, 120, 244, 112, 211, 97, 239, 65, 146, 46, 174, 215, 85, 55, 181, 230, 20, 28, 152, 181, 215, 5, 131, 132, 150, 130, 27, 152, 89, 155, 0, 169, 24, 176, 45, 250, 219, 169, 54, 203, 154, 230, 119, 93, 93, 255, 108, 108, 28, 212, 65, 63, 223, 205, 90, 14, 158, 149, 132, 36, 162, 140, 159, 21, 227, 167, 178, 70, 32, 190, 169, 119, 97, 241, 232, 225, 166, 232, 243, 208, 231, 195, 222, 131, 36, 218, 197, 178, 101, 93, 93, 174, 170, 68, 70, 159, 235, 111, 107, 204, 40, 118, 112, 253, 105, 57, 49, 107, 174, 32, 42, 90, 239, 11, 7, 9, 44, 18, 28, 56, 109, 223, 70, 54, 243, 198, 93, 7, 178, 237, 112, 84, 113, 244, 107, 101, 48, 187, 42, 243, 247, 162, 49, 194, 182, 137, 28, 145, 117, 144, 7, 160, 52, 23, 159, 188, 251, 14, 132, 141, 186, 37, 169, 222, 121, 60, 178, 239, 56, 115, 243, 121, 255, 106, 232, 72, 190, 65, 197, 27, 125, 88, 222, 42, 60, 240, 121, 79, 5, 233, 98, 126, 68, 194, 79, 45, 135, 219, 84, 28, 198, 148, 21, 138, 1, 141, 14, 187, 64, 166, 35, 232, 131, 191, 56, 217, 194, 56, 160, 197, 13, 33, 187, 244, 76, 10, 150, 167, 143, 19, 141, 150, 206, 92, 204, 0, 9, 69, 215, 49, 72, 110, 250, 98, 139, 119, 225, 83, 202, 186, 187, 93, 84, 163, 160, 108, 21, 136, 141, 63, 214, 145, 150, 14, 151, 222, 215, 152, 80, 199, 204, 169, 17, 236, 225, 250, 210, 245, 250, 203, 147, 114, 98, 215, 92, 107, 121, 230, 29, 64, 84, 181, 222, 89, 79, 132, 159, 22, 14, 18, 88, 15, 21, 35, 25, 36, 56, 112, 218, 61, 35, 65, 155, 101, 253, 107, 167, 124, 230, 90, 230, 87, 203, 9, 37, 78, 208, 56, 100, 1, 145, 174, 163, 24, 138, 159, 226, 51, 167, 204, 33, 42, 188, 253, 96, 173, 36, 225, 175, 180, 63, 208, 238, 159, 18, 131, 45, 134, 9, 178, 108, 201, 72, 36, 171, 208, 83, 21, 234, 251, 126, 70, 41, 226, 101, 119, 104, 47, 63, 121, 246, 54, 36, 72, 183, 29, 9, 27, 116, 4, 18, 42, 53, 75, 83, 188, 242, 82, 72, 141, 179, 121, 101, 222, 112, 96, 126, 239, 49, 231, 230, 243, 254, 254, 253, 194, 191, 213, 208, 145, 124, 204, 203, 160, 61, 131, 138, 54, 250, 154, 145, 7, 187, 177, 188, 84, 120, 168, 167, 101, 57, 59, 131, 152, 75, 34, 152, 169, 10, 9, 181, 250, 201, 16, 174, 203, 136, 95, 239, 93, 79, 70, 244, 108, 14, 109, 217, 63, 205, 116, 194, 14, 140, 243, 90, 18, 67, 234, 65, 35, 2, 193, 108, 112, 193, 216, 119, 65, 128, 151, 54, 215, 71, 142, 45, 230, 6, 165, 0, 181, 197, 188, 27, 132, 132, 113, 65, 138, 26, 104, 90, 187, 91, 67, 119, 232, 152, 90, 108, 217, 217, 21, 45, 79, 30, 12, 54, 126, 95, 39, 27, 45, 156, 62, 0, 28, 221, 185, 152, 0, 18, 160, 131, 49, 83, 139, 174, 98, 144, 146, 181, 83, 209, 221, 244, 197, 22, 196, 239, 244, 87, 239, 194, 167, 148, 246, 217, 150, 213, 174, 7, 188, 233, 183, 28, 141, 168, 156, 49, 222, 107, 133, 42, 239, 42, 202, 107, 121, 237, 211, 112, 72, 172, 248, 93, 27, 111, 225, 70, 42, 46, 102, 222, 54, 225, 127, 197, 7, 160, 84, 232, 84, 99, 77, 243, 101, 34, 2, 178, 243, 229, 27, 169, 194, 164, 48, 132, 145, 103, 41, 159, 160, 38, 228, 197, 174, 184, 253, 222, 159, 249, 214, 243, 204, 58, 207, 232, 253, 123, 128, 169, 107, 188, 153, 178, 90, 253, 178, 159, 9, 62, 171, 132, 56, 127, 44, 28, 36, 176, 53, 7, 21, 241, 30, 42, 70, 50, 7, 49, 119, 115, 72, 112, 225, 180, 81, 107, 208, 245, 122, 70, 131, 54, 99, 93, 178, 119, 203, 250, 215, 78, 210, 225, 230, 15, 249, 204, 181, 204, 224, 215, 132, 141, 175, 150, 18, 74, 182, 141, 35, 11, 157, 160, 112, 200, 132, 187, 65, 137, 3, 35, 93, 70, 26, 56, 108, 7, 49, 21, 63, 196, 40, 14, 14, 133, 103, 79, 152, 66, 126, 84, 169, 3, 85, 121, 250, 192, 76, 98, 203, 129, 129, 56, 197, 31, 152, 35, 244, 94, 179, 14, 167, 157, 170, 21, 150, 220, 229, 84, 0, 27, 252, 79, 49, 90, 215, 98, 98, 153, 206, 121, 83, 216, 73, 225, 79, 23, 80, 250, 126, 86, 123, 215, 45, 149, 98, 204, 28, 212, 45, 141, 138, 19, 52, 150, 187, 82, 31, 187, 232, 145, 6, 160, 217, 208, 94, 126, 243, 236, 71, 101, 194, 173, 108, 72, 145, 110, 117, 83, 160, 47, 58, 18, 54, 232, 35, 9, 7, 169, 8, 36, 84, 106, 17, 63, 101, 43, 150, 167, 121, 228, 143, 188, 72, 165, 164, 145, 27, 102, 189, 138, 42, 39, 242, 203, 188, 224, 235, 208, 141, 161, 192, 253, 222, 98, 217, 230, 239, 35, 20, 188, 225, 189, 13, 167, 208, 252, 38, 138, 131, 63, 63, 145, 178, 126, 112, 208, 36, 185, 105, 203, 21, 248, 66, 230, 70, 59, 91, 253, 119, 122, 220, 101, 107, 181, 197, 126, 90, 244, 238, 83, 9, 55, 247, 72, 56, 118, 184, 9, 174, 177, 161, 18, 159, 240, 138, 63, 204, 51, 147, 36, 253, 114, 0, 0, 0, 0, 1, 194, 106, 55, 3, 132, 212, 110, 2, 70, 190, 89, 7, 9, 168, 220, 6, 203, 194, 235, 4, 141, 124, 178, 5, 79, 22, 133, 14, 19, 81, 184, 15, 209, 59, 143, 13, 151, 133, 214, 12, 85, 239, 225, 9, 26, 249, 100, 8, 216, 147, 83, 10, 158, 45, 10, 11, 92, 71, 61, 28, 38, 163, 112, 29, 228, 201, 71, 31, 162, 119, 30, 30, 96, 29, 41, 27, 47, 11, 172, 26, 237, 97, 155, 24, 171, 223, 194, 25, 105, 181, 245, 18, 53, 242, 200, 19, 247, 152, 255, 17, 177, 38, 166, 16, 115, 76, 145, 21, 60, 90, 20, 20, 254, 48, 35, 22, 184, 142, 122, 23, 122, 228, 77, 56, 77, 70, 224, 57, 143, 44, 215, 59, 201, 146, 142, 58, 11, 248, 185, 63, 68, 238, 60, 62, 134, 132, 11, 60, 192, 58, 82, 61, 2, 80, 101, 54, 94, 23, 88, 55, 156, 125, 111, 53, 218, 195, 54, 52, 24, 169, 1, 49, 87, 191, 132, 48, 149, 213, 179, 50, 211, 107, 234, 51, 17, 1, 221, 36, 107, 229, 144, 37, 169, 143, 167, 39, 239, 49, 254, 38, 45, 91, 201, 35, 98, 77, 76, 34, 160, 39, 123, 32, 230, 153, 34, 33, 36, 243, 21, 42, 120, 180, 40, 43, 186, 222, 31, 41, 252, 96, 70, 40, 62, 10, 113, 45, 113, 28, 244, 44, 179, 118, 195, 46, 245, 200, 154, 47, 55, 162, 173, 112, 154, 141, 192, 113, 88, 231, 247, 115, 30, 89, 174, 114, 220, 51, 153, 119, 147, 37, 28, 118, 81, 79, 43, 116, 23, 241, 114, 117, 213, 155, 69, 126, 137, 220, 120, 127, 75, 182, 79, 125, 13, 8, 22, 124, 207, 98, 33, 121, 128, 116, 164, 120, 66, 30, 147, 122, 4, 160, 202, 123, 198, 202, 253, 108, 188, 46, 176, 109, 126, 68, 135, 111, 56, 250, 222, 110, 250, 144, 233, 107, 181, 134, 108, 106, 119, 236, 91, 104, 49, 82, 2, 105, 243, 56, 53, 98, 175, 127, 8, 99, 109, 21, 63, 97, 43, 171, 102, 96, 233, 193, 81, 101, 166, 215, 212, 100, 100, 189, 227, 102, 34, 3, 186, 103, 224, 105, 141, 72, 215, 203, 32, 73, 21, 161, 23, 75, 83, 31, 78, 74, 145, 117, 121, 79, 222, 99, 252, 78, 28, 9, 203, 76, 90, 183, 146, 77, 152, 221, 165, 70, 196, 154, 152, 71, 6, 240, 175, 69, 64, 78, 246, 68, 130, 36, 193, 65, 205, 50, 68, 64, 15, 88, 115, 66, 73, 230, 42, 67, 139, 140, 29, 84, 241, 104, 80, 85, 51, 2, 103, 87, 117, 188, 62, 86, 183, 214, 9, 83, 248, 192, 140, 82, 58, 170, 187, 80, 124, 20, 226, 81, 190, 126, 213, 90, 226, 57, 232, 91, 32, 83, 223, 89, 102, 237, 134, 88, 164, 135, 177, 93, 235, 145, 52, 92, 41, 251, 3, 94, 111, 69, 90, 95, 173, 47, 109, 225, 53, 27, 128, 224, 247, 113, 183, 226, 177, 207, 238, 227, 115, 165, 217, 230, 60, 179, 92, 231, 254, 217, 107, 229, 184, 103, 50, 228, 122, 13, 5, 239, 38, 74, 56, 238, 228, 32, 15, 236, 162, 158, 86, 237, 96, 244, 97, 232, 47, 226, 228, 233, 237, 136, 211, 235, 171, 54, 138, 234, 105, 92, 189, 253, 19, 184, 240, 252, 209, 210, 199, 254, 151, 108, 158, 255, 85, 6, 169, 250, 26, 16, 44, 251, 216, 122, 27, 249, 158, 196, 66, 248, 92, 174, 117, 243, 0, 233, 72, 242, 194, 131, 127, 240, 132, 61, 38, 241, 70, 87, 17, 244, 9, 65, 148, 245, 203, 43, 163, 247, 141, 149, 250, 246, 79, 255, 205, 217, 120, 93, 96, 216, 186, 55, 87, 218, 252, 137, 14, 219, 62, 227, 57, 222, 113, 245, 188, 223, 179, 159, 139, 221, 245, 33, 210, 220, 55, 75, 229, 215, 107, 12, 216, 214, 169, 102, 239, 212, 239, 216, 182, 213, 45, 178, 129, 208, 98, 164, 4, 209, 160, 206, 51, 211, 230, 112, 106, 210, 36, 26, 93, 197, 94, 254, 16, 196, 156, 148, 39, 198, 218, 42, 126, 199, 24, 64, 73, 194, 87, 86, 204, 195, 149, 60, 251, 193, 211, 130, 162, 192, 17, 232, 149, 203, 77, 175, 168, 202, 143, 197, 159, 200, 201, 123, 198, 201, 11, 17, 241, 204, 68, 7, 116, 205, 134, 109, 67, 207, 192, 211, 26, 206, 2, 185, 45, 145, 175, 150, 64, 144, 109, 252, 119, 146, 43, 66, 46, 147, 233, 40, 25, 150, 166, 62, 156, 151, 100, 84, 171, 149, 34, 234, 242, 148, 224, 128, 197, 159, 188, 199, 248, 158, 126, 173, 207, 156, 56, 19, 150, 157, 250, 121, 161, 152, 181, 111, 36, 153, 119, 5, 19, 155, 49, 187, 74, 154, 243, 209, 125, 141, 137, 53, 48, 140, 75, 95, 7, 142, 13, 225, 94, 143, 207, 139, 105, 138, 128, 157, 236, 139, 66, 247, 219, 137, 4, 73, 130, 136, 198, 35, 181, 131, 154, 100, 136, 130, 88, 14, 191, 128, 30, 176, 230, 129, 220, 218, 209, 132, 147, 204, 84, 133, 81, 166, 99, 135, 23, 24, 58, 134, 213, 114, 13, 169, 226, 208, 160, 168, 32, 186, 151, 170, 102, 4, 206, 171, 164, 110, 249, 174, 235, 120, 124, 175, 41, 18, 75, 173, 111, 172, 18, 172, 173, 198, 37, 167, 241, 129, 24, 166, 51, 235, 47, 164, 117, 85, 118, 165, 183, 63, 65, 160, 248, 41, 196, 161, 58, 67, 243, 163, 124, 253, 170, 162, 190, 151, 157, 181, 196, 115, 208, 180, 6, 25, 231, 182, 64, 167, 190, 183, 130, 205, 137, 178, 205, 219, 12, 179, 15, 177, 59, 177, 73, 15, 98, 176, 139, 101, 85, 187, 215, 34, 104, 186, 21, 72, 95, 184, 83, 246, 6, 185, 145, 156, 49, 188, 222, 138, 180, 189, 28, 224, 131, 191, 90, 94, 218, 190, 152, 52, 237, 0, 0, 0, 0, 184, 188, 103, 101, 170, 9, 200, 139, 18, 181, 175, 238, 143, 98, 151, 87, 55, 222, 240, 50, 37, 107, 95, 220, 157, 215, 56, 185, 197, 180, 40, 239, 125, 8, 79, 138, 111, 189, 224, 100, 215, 1, 135, 1, 74, 214, 191, 184, 242, 106, 216, 221, 224, 223, 119, 51, 88, 99, 16, 86, 80, 25, 87, 159, 232, 165, 48, 250, 250, 16, 159, 20, 66, 172, 248, 113, 223, 123, 192, 200, 103, 199, 167, 173, 117, 114, 8, 67, 205, 206, 111, 38, 149, 173, 127, 112, 45, 17, 24, 21, 63, 164, 183, 251, 135, 24, 208, 158, 26, 207, 232, 39, 162, 115, 143, 66, 176, 198, 32, 172, 8, 122, 71, 201, 160, 50, 175, 62, 24, 142, 200, 91, 10, 59, 103, 181, 178, 135, 0, 208, 47, 80, 56, 105, 151, 236, 95, 12, 133, 89, 240, 226, 61, 229, 151, 135, 101, 134, 135, 209, 221, 58, 224, 180, 207, 143, 79, 90, 119, 51, 40, 63, 234, 228, 16, 134, 82, 88, 119, 227, 64, 237, 216, 13, 248, 81, 191, 104, 240, 43, 248, 161, 72, 151, 159, 196, 90, 34, 48, 42, 226, 158, 87, 79, 127, 73, 111, 246, 199, 245, 8, 147, 213, 64, 167, 125, 109, 252, 192, 24, 53, 159, 208, 78, 141, 35, 183, 43, 159, 150, 24, 197, 39, 42, 127, 160, 186, 253, 71, 25, 2, 65, 32, 124, 16, 244, 143, 146, 168, 72, 232, 247, 155, 20, 88, 61, 35, 168, 63, 88, 49, 29, 144, 182, 137, 161, 247, 211, 20, 118, 207, 106, 172, 202, 168, 15, 190, 127, 7, 225, 6, 195, 96, 132, 94, 160, 112, 210, 230, 28, 23, 183, 244, 169, 184, 89, 76, 21, 223, 60, 209, 194, 231, 133, 105, 126, 128, 224, 123, 203, 47, 14, 195, 119, 72, 107, 203, 13, 15, 162, 115, 177, 104, 199, 97, 4, 199, 41, 217, 184, 160, 76, 68, 111, 152, 245, 252, 211, 255, 144, 238, 102, 80, 126, 86, 218, 55, 27, 14, 185, 39, 77, 182, 5, 64, 40, 164, 176, 239, 198, 28, 12, 136, 163, 129, 219, 176, 26, 57, 103, 215, 127, 43, 210, 120, 145, 147, 110, 31, 244, 59, 38, 247, 3, 131, 154, 144, 102, 145, 47, 63, 136, 41, 147, 88, 237, 180, 68, 96, 84, 12, 248, 7, 49, 30, 77, 168, 223, 166, 241, 207, 186, 254, 146, 223, 236, 70, 46, 184, 137, 84, 155, 23, 103, 236, 39, 112, 2, 113, 240, 72, 187, 201, 76, 47, 222, 219, 249, 128, 48, 99, 69, 231, 85, 107, 63, 160, 156, 211, 131, 199, 249, 193, 54, 104, 23, 121, 138, 15, 114, 228, 93, 55, 203, 92, 225, 80, 174, 78, 84, 255, 64, 246, 232, 152, 37, 174, 139, 136, 115, 22, 55, 239, 22, 4, 130, 64, 248, 188, 62, 39, 157, 33, 233, 31, 36, 153, 85, 120, 65, 139, 224, 215, 175, 51, 92, 176, 202, 237, 89, 182, 59, 85, 229, 209, 94, 71, 80, 126, 176, 255, 236, 25, 213, 98, 59, 33, 108, 218, 135, 70, 9, 200, 50, 233, 231, 112, 142, 142, 130, 40, 237, 158, 212, 144, 81, 249, 177, 130, 228, 86, 95, 58, 88, 49, 58, 167, 143, 9, 131, 31, 51, 110, 230, 13, 134, 193, 8, 181, 58, 166, 109, 189, 64, 225, 164, 5, 252, 134, 193, 23, 73, 41, 47, 175, 245, 78, 74, 50, 34, 118, 243, 138, 158, 17, 150, 152, 43, 190, 120, 32, 151, 217, 29, 120, 244, 201, 75, 192, 72, 174, 46, 210, 253, 1, 192, 106, 65, 102, 165, 247, 150, 94, 28, 79, 42, 57, 121, 93, 159, 150, 151, 229, 35, 241, 242, 77, 107, 25, 5, 245, 215, 126, 96, 231, 98, 209, 142, 95, 222, 182, 235, 194, 9, 142, 82, 122, 181, 233, 55, 104, 0, 70, 217, 208, 188, 33, 188, 136, 223, 49, 234, 48, 99, 86, 143, 34, 214, 249, 97, 154, 106, 158, 4, 7, 189, 166, 189, 191, 1, 193, 216, 173, 180, 110, 54, 21, 8, 9, 83, 29, 114, 78, 154, 165, 206, 41, 255, 183, 123, 134, 17, 15, 199, 225, 116, 146, 16, 217, 205, 42, 172, 190, 168, 56, 25, 17, 70, 128, 165, 118, 35, 216, 198, 102, 117, 96, 122, 1, 16, 114, 207, 174, 254, 202, 115, 201, 155, 87, 164, 241, 34, 239, 24, 150, 71, 253, 173, 57, 169, 69, 17, 94, 204, 118, 77, 238, 6, 206, 241, 137, 99, 220, 68, 38, 141, 100, 248, 65, 232, 249, 47, 121, 81, 65, 147, 30, 52, 83, 38, 177, 218, 235, 154, 214, 191, 179, 249, 198, 233, 11, 69, 161, 140, 25, 240, 14, 98, 161, 76, 105, 7, 60, 155, 81, 190, 132, 39, 54, 219, 150, 146, 153, 53, 46, 46, 254, 80, 38, 84, 185, 153, 158, 232, 222, 252, 140, 93, 113, 18, 52, 225, 22, 119, 169, 54, 46, 206, 17, 138, 73, 171, 3, 63, 230, 69, 187, 131, 129, 32, 227, 224, 145, 118, 91, 92, 246, 19, 73, 233, 89, 253, 241, 85, 62, 152, 108, 130, 6, 33, 212, 62, 97, 68, 198, 139, 206, 170, 126, 55, 169, 207, 214, 127, 65, 56, 110, 195, 38, 93, 124, 118, 137, 179, 196, 202, 238, 214, 89, 29, 214, 111, 225, 161, 177, 10, 243, 20, 30, 228, 75, 168, 121, 129, 19, 203, 105, 215, 171, 119, 14, 178, 185, 194, 161, 92, 1, 126, 198, 57, 156, 169, 254, 128, 36, 21, 153, 229, 54, 160, 54, 11, 142, 28, 81, 110, 134, 102, 22, 167, 62, 218, 113, 194, 44, 111, 222, 44, 148, 211, 185, 73, 9, 4, 129, 240, 177, 184, 230, 149, 163, 13, 73, 123, 27, 177, 46, 30, 67, 210, 62, 72, 251, 110, 89, 45, 233, 219, 246, 195, 81, 103, 145, 166, 204, 176, 169, 31, 116, 12, 206, 122, 102, 185, 97, 148, 222, 5, 6, 241, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 4, 0, 8, 0, 4, 0, 2, 0, 0, 0, 4, 0, 5, 0, 16, 0, 8, 0, 2, 0, 0, 0, 4, 0, 6, 0, 32, 0, 32, 0, 2, 0, 0, 0, 4, 0, 4, 0, 16, 0, 16, 0, 3, 0, 0, 0, 8, 0, 16, 0, 32, 0, 32, 0, 3, 0, 0, 0, 8, 0, 16, 0, 128, 0, 128, 0, 3, 0, 0, 0, 8, 0, 32, 0, 128, 0, 0, 1, 3, 0, 0, 0, 32, 0, 128, 0, 2, 1, 0, 4, 3, 0, 0, 0, 32, 0, 2, 1, 2, 1, 0, 16, 3, 0, 0, 0, 46, 39, 0, 0, 228, 32, 0, 0, 1, 1, 0, 0, 30, 1, 0, 0, 15, 0, 0, 0, 174, 43, 0, 0, 204, 33, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 188, 34, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 10, 0, 0, 0, 12, 0, 0, 0, 14, 0, 0, 0, 16, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 28, 0, 0, 0, 32, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 56, 0, 0, 0, 64, 0, 0, 0, 80, 0, 0, 0, 96, 0, 0, 0, 112, 0, 0, 0, 128, 0, 0, 0, 160, 0, 0, 0, 192, 0, 0, 0, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 12, 0, 0, 0, 16, 0, 0, 0, 24, 0, 0, 0, 32, 0, 0, 0, 48, 0, 0, 0, 64, 0, 0, 0, 96, 0, 0, 0, 128, 0, 0, 0, 192, 0, 0, 0, 0, 1, 0, 0, 128, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 12, 0, 0, 0, 16, 0, 0, 0, 24, 0, 0, 0, 32, 0, 0, 0, 48, 0, 0, 0, 64, 0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 150, 65, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 17, 0, 18, 0, 0, 0, 8, 0, 7, 0, 9, 0, 6, 0, 10, 0, 5, 0, 11, 0, 4, 0, 12, 0, 3, 0, 13, 0, 2, 0, 14, 0, 1, 0, 15, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 9, 0, 10, 0, 11, 0, 13, 0, 15, 0, 17, 0, 19, 0, 23, 0, 27, 0, 31, 0, 35, 0, 43, 0, 51, 0, 59, 0, 67, 0, 83, 0, 99, 0, 115, 0, 131, 0, 163, 0, 195, 0, 227, 0, 2, 1, 0, 0, 0, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 17, 0, 17, 0, 17, 0, 17, 0, 18, 0, 18, 0, 18, 0, 18, 0, 19, 0, 19, 0, 19, 0, 19, 0, 20, 0, 20, 0, 20, 0, 20, 0, 21, 0, 21, 0, 21, 0, 21, 0, 16, 0, 73, 0, 195, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 7, 0, 9, 0, 13, 0, 17, 0, 25, 0, 33, 0, 49, 0, 65, 0, 97, 0, 129, 0, 193, 0, 1, 1, 129, 1, 1, 2, 1, 3, 1, 4, 1, 6, 1, 8, 1, 12, 1, 16, 1, 24, 1, 32, 1, 48, 1, 64, 1, 96, 0, 0, 0, 0, 16, 0, 16, 0, 16, 0, 16, 0, 17, 0, 17, 0, 18, 0, 18, 0, 19, 0, 19, 0, 20, 0, 20, 0, 21, 0, 21, 0, 22, 0, 22, 0, 23, 0, 23, 0, 24, 0, 24, 0, 25, 0, 25, 0, 26, 0, 26, 0, 27, 0, 27, 0, 28, 0, 28, 0, 29, 0, 29, 0, 64, 0, 64, 0, 12, 0, 8, 0, 140, 0, 8, 0, 76, 0, 8, 0, 204, 0, 8, 0, 44, 0, 8, 0, 172, 0, 8, 0, 108, 0, 8, 0, 236, 0, 8, 0, 28, 0, 8, 0, 156, 0, 8, 0, 92, 0, 8, 0, 220, 0, 8, 0, 60, 0, 8, 0, 188, 0, 8, 0, 124, 0, 8, 0, 252, 0, 8, 0, 2, 0, 8, 0, 130, 0, 8, 0, 66, 0, 8, 0, 194, 0, 8, 0, 34, 0, 8, 0, 162, 0, 8, 0, 98, 0, 8, 0, 226, 0, 8, 0, 18, 0, 8, 0, 146, 0, 8, 0, 82, 0, 8, 0, 210, 0, 8, 0, 50, 0, 8, 0, 178, 0, 8, 0, 114, 0, 8, 0, 242, 0, 8, 0, 10, 0, 8, 0, 138, 0, 8, 0, 74, 0, 8, 0, 202, 0, 8, 0, 42, 0, 8, 0, 170, 0, 8, 0, 106, 0, 8, 0, 234, 0, 8, 0, 26, 0, 8, 0, 154, 0, 8, 0, 90, 0, 8, 0, 218, 0, 8, 0, 58, 0, 8, 0, 186, 0, 8, 0, 122, 0, 8, 0, 250, 0, 8, 0, 6, 0, 8, 0, 134, 0, 8, 0, 70, 0, 8, 0, 198, 0, 8, 0, 38, 0, 8, 0, 166, 0, 8, 0, 102], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);
allocate([8, 0, 230, 0, 8, 0, 22, 0, 8, 0, 150, 0, 8, 0, 86, 0, 8, 0, 214, 0, 8, 0, 54, 0, 8, 0, 182, 0, 8, 0, 118, 0, 8, 0, 246, 0, 8, 0, 14, 0, 8, 0, 142, 0, 8, 0, 78, 0, 8, 0, 206, 0, 8, 0, 46, 0, 8, 0, 174, 0, 8, 0, 110, 0, 8, 0, 238, 0, 8, 0, 30, 0, 8, 0, 158, 0, 8, 0, 94, 0, 8, 0, 222, 0, 8, 0, 62, 0, 8, 0, 190, 0, 8, 0, 126, 0, 8, 0, 254, 0, 8, 0, 1, 0, 8, 0, 129, 0, 8, 0, 65, 0, 8, 0, 193, 0, 8, 0, 33, 0, 8, 0, 161, 0, 8, 0, 97, 0, 8, 0, 225, 0, 8, 0, 17, 0, 8, 0, 145, 0, 8, 0, 81, 0, 8, 0, 209, 0, 8, 0, 49, 0, 8, 0, 177, 0, 8, 0, 113, 0, 8, 0, 241, 0, 8, 0, 9, 0, 8, 0, 137, 0, 8, 0, 73, 0, 8, 0, 201, 0, 8, 0, 41, 0, 8, 0, 169, 0, 8, 0, 105, 0, 8, 0, 233, 0, 8, 0, 25, 0, 8, 0, 153, 0, 8, 0, 89, 0, 8, 0, 217, 0, 8, 0, 57, 0, 8, 0, 185, 0, 8, 0, 121, 0, 8, 0, 249, 0, 8, 0, 5, 0, 8, 0, 133, 0, 8, 0, 69, 0, 8, 0, 197, 0, 8, 0, 37, 0, 8, 0, 165, 0, 8, 0, 101, 0, 8, 0, 229, 0, 8, 0, 21, 0, 8, 0, 149, 0, 8, 0, 85, 0, 8, 0, 213, 0, 8, 0, 53, 0, 8, 0, 181, 0, 8, 0, 117, 0, 8, 0, 245, 0, 8, 0, 13, 0, 8, 0, 141, 0, 8, 0, 77, 0, 8, 0, 205, 0, 8, 0, 45, 0, 8, 0, 173, 0, 8, 0, 109, 0, 8, 0, 237, 0, 8, 0, 29, 0, 8, 0, 157, 0, 8, 0, 93, 0, 8, 0, 221, 0, 8, 0, 61, 0, 8, 0, 189, 0, 8, 0, 125, 0, 8, 0, 253, 0, 8, 0, 19, 0, 9, 0, 19, 1, 9, 0, 147, 0, 9, 0, 147, 1, 9, 0, 83, 0, 9, 0, 83, 1, 9, 0, 211, 0, 9, 0, 211, 1, 9, 0, 51, 0, 9, 0, 51, 1, 9, 0, 179, 0, 9, 0, 179, 1, 9, 0, 115, 0, 9, 0, 115, 1, 9, 0, 243, 0, 9, 0, 243, 1, 9, 0, 11, 0, 9, 0, 11, 1, 9, 0, 139, 0, 9, 0, 139, 1, 9, 0, 75, 0, 9, 0, 75, 1, 9, 0, 203, 0, 9, 0, 203, 1, 9, 0, 43, 0, 9, 0, 43, 1, 9, 0, 171, 0, 9, 0, 171, 1, 9, 0, 107, 0, 9, 0, 107, 1, 9, 0, 235, 0, 9, 0, 235, 1, 9, 0, 27, 0, 9, 0, 27, 1, 9, 0, 155, 0, 9, 0, 155, 1, 9, 0, 91, 0, 9, 0, 91, 1, 9, 0, 219, 0, 9, 0, 219, 1, 9, 0, 59, 0, 9, 0, 59, 1, 9, 0, 187, 0, 9, 0, 187, 1, 9, 0, 123, 0, 9, 0, 123, 1, 9, 0, 251, 0, 9, 0, 251, 1, 9, 0, 7, 0, 9, 0, 7, 1, 9, 0, 135, 0, 9, 0, 135, 1, 9, 0, 71, 0, 9, 0, 71, 1, 9, 0, 199, 0, 9, 0, 199, 1, 9, 0, 39, 0, 9, 0, 39, 1, 9, 0, 167, 0, 9, 0, 167, 1, 9, 0, 103, 0, 9, 0, 103, 1, 9, 0, 231, 0, 9, 0, 231, 1, 9, 0, 23, 0, 9, 0, 23, 1, 9, 0, 151, 0, 9, 0, 151, 1, 9, 0, 87, 0, 9, 0, 87, 1, 9, 0, 215, 0, 9, 0, 215, 1, 9, 0, 55, 0, 9, 0, 55, 1, 9, 0, 183, 0, 9, 0, 183, 1, 9, 0, 119, 0, 9, 0, 119, 1, 9, 0, 247, 0, 9, 0, 247, 1, 9, 0, 15, 0, 9, 0, 15, 1, 9, 0, 143, 0, 9, 0, 143, 1, 9, 0, 79, 0, 9, 0, 79, 1, 9, 0, 207, 0, 9, 0, 207, 1, 9, 0, 47, 0, 9, 0, 47, 1, 9, 0, 175, 0, 9, 0, 175, 1, 9, 0, 111, 0, 9, 0, 111, 1, 9, 0, 239, 0, 9, 0, 239, 1, 9, 0, 31, 0, 9, 0, 31, 1, 9, 0, 159, 0, 9, 0, 159, 1, 9, 0, 95, 0, 9, 0, 95, 1, 9, 0, 223, 0, 9, 0, 223, 1, 9, 0, 63, 0, 9, 0, 63, 1, 9, 0, 191, 0, 9, 0, 191, 1, 9, 0, 127, 0, 9, 0, 127, 1, 9, 0, 255, 0, 9, 0, 255, 1, 9, 0, 0, 0, 7, 0, 64, 0, 7, 0, 32, 0, 7, 0, 96, 0, 7, 0, 16, 0, 7, 0, 80, 0, 7, 0, 48, 0, 7, 0, 112, 0, 7, 0, 8, 0, 7, 0, 72, 0, 7, 0, 40, 0, 7, 0, 104, 0, 7, 0, 24, 0, 7, 0, 88, 0, 7, 0, 56, 0, 7, 0, 120, 0, 7, 0, 4, 0, 7, 0, 68, 0, 7, 0, 36, 0, 7, 0, 100, 0, 7, 0, 20, 0, 7, 0, 84, 0, 7, 0, 52, 0, 7, 0, 116, 0, 7, 0, 3, 0, 8, 0, 131, 0, 8, 0, 67, 0, 8, 0, 195, 0, 8, 0, 35, 0, 8, 0, 163, 0, 8, 0, 99, 0, 8, 0, 227, 0, 8, 0, 0, 0, 5, 0, 16, 0, 5, 0, 8, 0, 5, 0, 24, 0, 5, 0, 4, 0, 5, 0, 20, 0, 5, 0, 12, 0, 5, 0, 28, 0, 5, 0, 2, 0, 5, 0, 18, 0, 5, 0, 10, 0, 5, 0, 26, 0, 5, 0, 6, 0, 5, 0, 22, 0, 5, 0, 14, 0, 5, 0, 30, 0, 5, 0, 1, 0, 5, 0, 17, 0, 5, 0, 9, 0, 5, 0, 25, 0, 5, 0, 5, 0, 5, 0, 21, 0, 5, 0, 13, 0, 5, 0, 29, 0, 5, 0, 3, 0, 5, 0, 19, 0, 5, 0, 11, 0, 5, 0, 27, 0, 5, 0, 7, 0, 5, 0, 23, 0, 5, 0, 96, 7, 0, 0, 0, 8, 80, 0, 0, 8, 16, 0, 20, 8, 115, 0, 18, 7, 31, 0, 0, 8, 112, 0, 0, 8, 48, 0, 0, 9, 192, 0, 16, 7, 10, 0, 0, 8, 96, 0, 0, 8, 32, 0, 0, 9, 160, 0, 0, 8, 0, 0, 0, 8, 128, 0, 0, 8, 64, 0, 0, 9, 224, 0, 16, 7, 6, 0, 0, 8, 88, 0, 0, 8, 24, 0, 0, 9, 144, 0, 19, 7, 59, 0, 0, 8, 120, 0, 0, 8, 56, 0, 0, 9, 208, 0, 17, 7, 17, 0, 0, 8, 104, 0, 0, 8, 40, 0, 0, 9, 176, 0, 0, 8, 8, 0, 0, 8, 136, 0, 0, 8, 72, 0, 0, 9, 240, 0, 16, 7, 4, 0, 0, 8, 84, 0, 0, 8, 20, 0, 21, 8, 227, 0, 19, 7, 43, 0, 0, 8, 116, 0, 0, 8, 52, 0, 0, 9, 200, 0, 17, 7, 13, 0, 0, 8, 100, 0, 0, 8, 36, 0, 0, 9, 168, 0, 0, 8, 4, 0, 0, 8, 132, 0, 0, 8, 68, 0, 0, 9, 232, 0, 16, 7, 8, 0, 0, 8, 92, 0, 0, 8, 28, 0, 0, 9, 152, 0, 20, 7, 83, 0, 0, 8, 124, 0, 0, 8, 60, 0, 0, 9, 216, 0, 18, 7, 23, 0, 0, 8, 108, 0, 0, 8, 44, 0, 0, 9, 184, 0, 0, 8, 12, 0, 0, 8, 140, 0, 0, 8, 76, 0, 0, 9, 248, 0, 16, 7, 3, 0, 0, 8, 82, 0, 0, 8, 18, 0, 21, 8, 163, 0, 19, 7, 35, 0, 0, 8, 114, 0, 0, 8, 50, 0, 0, 9, 196, 0, 17, 7, 11, 0, 0, 8, 98, 0, 0, 8, 34, 0, 0, 9, 164, 0, 0, 8, 2, 0, 0, 8, 130, 0, 0, 8, 66, 0, 0, 9, 228, 0, 16, 7, 7, 0, 0, 8, 90, 0, 0, 8, 26, 0, 0, 9, 148, 0, 20, 7, 67, 0, 0, 8, 122, 0, 0, 8, 58, 0, 0, 9, 212, 0, 18, 7, 19, 0, 0, 8, 106, 0, 0, 8, 42, 0, 0, 9, 180, 0, 0, 8, 10, 0, 0, 8, 138, 0, 0, 8, 74, 0, 0, 9, 244, 0, 16, 7, 5, 0, 0, 8, 86, 0, 0, 8, 22, 0, 64, 8, 0, 0, 19, 7, 51, 0, 0, 8, 118, 0, 0, 8, 54, 0, 0, 9, 204, 0, 17, 7, 15, 0, 0, 8, 102, 0, 0, 8, 38, 0, 0, 9, 172, 0, 0, 8, 6, 0, 0, 8, 134, 0, 0, 8, 70, 0, 0, 9, 236, 0, 16, 7, 9, 0, 0, 8, 94, 0, 0, 8, 30, 0, 0, 9, 156, 0, 20, 7, 99, 0, 0, 8, 126, 0, 0, 8, 62, 0, 0, 9, 220, 0, 18, 7, 27, 0, 0, 8, 110, 0, 0, 8, 46, 0, 0, 9, 188, 0, 0, 8, 14, 0, 0, 8, 142, 0, 0, 8, 78, 0, 0, 9, 252, 0, 96, 7, 0, 0, 0, 8, 81, 0, 0, 8, 17, 0, 21, 8, 131, 0, 18, 7, 31, 0, 0, 8, 113, 0, 0, 8, 49, 0, 0, 9, 194, 0, 16, 7, 10, 0, 0, 8, 97, 0, 0, 8, 33, 0, 0, 9, 162, 0, 0, 8, 1, 0, 0, 8, 129, 0, 0, 8, 65, 0, 0, 9, 226, 0, 16, 7, 6, 0, 0, 8, 89, 0, 0, 8, 25, 0, 0, 9, 146, 0, 19, 7, 59, 0, 0, 8, 121, 0, 0, 8, 57, 0, 0, 9, 210, 0, 17, 7, 17, 0, 0, 8, 105, 0, 0, 8, 41, 0, 0, 9, 178, 0, 0, 8, 9, 0, 0, 8, 137, 0, 0, 8, 73, 0, 0, 9, 242, 0, 16, 7, 4, 0, 0, 8, 85, 0, 0, 8, 21, 0, 16, 8, 2, 1, 19, 7, 43, 0, 0, 8, 117, 0, 0, 8, 53, 0, 0, 9, 202, 0, 17, 7, 13, 0, 0, 8, 101, 0, 0, 8, 37, 0, 0, 9, 170, 0, 0, 8, 5, 0, 0, 8, 133, 0, 0, 8, 69, 0, 0, 9, 234, 0, 16, 7, 8, 0, 0, 8, 93, 0, 0, 8, 29, 0, 0, 9, 154, 0, 20, 7, 83, 0, 0, 8, 125, 0, 0, 8, 61, 0, 0, 9, 218, 0, 18, 7, 23, 0, 0, 8, 109, 0, 0, 8, 45, 0, 0, 9, 186, 0, 0, 8, 13, 0, 0, 8, 141, 0, 0, 8, 77, 0, 0, 9, 250, 0, 16, 7, 3, 0, 0, 8, 83, 0, 0, 8, 19, 0, 21, 8, 195, 0, 19, 7, 35, 0, 0, 8, 115, 0, 0, 8, 51, 0, 0, 9, 198, 0, 17, 7, 11, 0, 0, 8, 99, 0, 0, 8, 35, 0, 0, 9, 166, 0, 0, 8, 3, 0, 0, 8, 131, 0, 0, 8, 67, 0, 0, 9, 230, 0, 16, 7, 7, 0, 0, 8, 91, 0, 0, 8, 27, 0, 0, 9, 150, 0, 20, 7, 67, 0, 0, 8, 123, 0, 0, 8, 59, 0, 0, 9, 214, 0, 18, 7, 19, 0, 0, 8, 107, 0, 0, 8, 43, 0, 0, 9, 182, 0, 0, 8, 11, 0, 0, 8, 139, 0, 0, 8, 75, 0, 0, 9, 246, 0, 16, 7, 5, 0, 0, 8, 87, 0, 0, 8, 23, 0, 64, 8, 0, 0, 19, 7, 51, 0, 0, 8, 119, 0, 0, 8, 55, 0, 0, 9, 206, 0, 17, 7, 15, 0, 0, 8, 103, 0, 0, 8, 39, 0, 0, 9, 174, 0, 0, 8, 7, 0, 0, 8, 135, 0, 0, 8, 71, 0, 0, 9, 238, 0, 16, 7, 9, 0, 0, 8, 95, 0, 0, 8, 31, 0, 0, 9, 158, 0, 20, 7, 99, 0, 0, 8, 127, 0, 0, 8, 63, 0, 0, 9, 222, 0, 18, 7, 27, 0, 0, 8, 111, 0, 0, 8, 47, 0, 0, 9, 190, 0, 0, 8, 15, 0, 0, 8, 143, 0, 0, 8, 79, 0, 0, 9, 254, 0, 96, 7, 0, 0, 0, 8, 80, 0, 0, 8, 16, 0, 20, 8, 115, 0, 18, 7, 31, 0, 0, 8, 112, 0, 0, 8, 48, 0, 0, 9, 193, 0, 16, 7, 10, 0, 0, 8, 96, 0, 0, 8, 32, 0, 0, 9, 161, 0, 0, 8, 0, 0, 0, 8, 128, 0, 0, 8, 64, 0, 0, 9, 225, 0, 16, 7, 6, 0, 0, 8, 88, 0, 0, 8, 24, 0, 0, 9, 145, 0, 19, 7, 59, 0, 0, 8, 120, 0, 0, 8, 56, 0, 0, 9, 209, 0, 17, 7, 17, 0, 0, 8, 104, 0, 0, 8, 40, 0, 0, 9, 177, 0, 0, 8, 8, 0, 0, 8, 136, 0, 0, 8, 72, 0, 0, 9, 241, 0, 16, 7, 4, 0, 0, 8, 84, 0, 0, 8, 20, 0, 21, 8, 227, 0, 19, 7, 43, 0, 0, 8, 116, 0, 0, 8, 52, 0, 0, 9, 201, 0, 17, 7, 13, 0, 0, 8, 100, 0, 0, 8, 36, 0, 0, 9, 169, 0, 0, 8, 4, 0, 0, 8, 132, 0, 0, 8, 68, 0, 0, 9, 233, 0, 16, 7, 8, 0, 0, 8, 92, 0, 0, 8, 28, 0, 0, 9, 153, 0, 20, 7, 83, 0, 0, 8, 124, 0, 0, 8, 60, 0, 0, 9, 217, 0, 18, 7, 23, 0, 0, 8, 108, 0, 0, 8, 44, 0, 0, 9, 185, 0, 0, 8, 12, 0, 0, 8, 140, 0, 0, 8, 76, 0, 0, 9, 249, 0, 16, 7, 3, 0, 0, 8, 82, 0, 0, 8, 18, 0, 21, 8, 163, 0, 19, 7, 35, 0, 0, 8, 114, 0, 0, 8, 50, 0, 0, 9, 197, 0, 17, 7, 11, 0, 0, 8, 98, 0, 0, 8, 34, 0, 0, 9, 165, 0, 0, 8, 2, 0, 0, 8, 130, 0, 0, 8, 66, 0, 0, 9, 229, 0, 16, 7, 7, 0, 0, 8, 90, 0, 0, 8, 26, 0, 0, 9, 149, 0, 20, 7, 67, 0, 0, 8, 122, 0, 0, 8, 58, 0, 0, 9, 213, 0, 18, 7, 19, 0, 0, 8, 106, 0, 0, 8, 42, 0, 0, 9, 181, 0, 0, 8, 10, 0, 0, 8, 138, 0, 0, 8, 74, 0, 0, 9, 245, 0, 16, 7, 5, 0, 0, 8, 86, 0, 0, 8, 22, 0, 64, 8, 0, 0, 19, 7, 51, 0, 0, 8, 118, 0, 0, 8, 54, 0, 0, 9, 205, 0, 17, 7, 15, 0, 0, 8, 102, 0, 0, 8, 38, 0, 0, 9, 173, 0, 0, 8, 6, 0, 0, 8, 134, 0, 0, 8, 70, 0, 0, 9, 237, 0, 16, 7, 9, 0, 0, 8, 94, 0, 0, 8, 30, 0, 0, 9, 157, 0, 20, 7, 99, 0, 0, 8, 126, 0, 0, 8, 62, 0, 0, 9, 221, 0, 18, 7, 27, 0, 0, 8, 110, 0, 0, 8, 46, 0, 0, 9, 189, 0, 0, 8, 14, 0, 0, 8, 142, 0, 0, 8, 78, 0, 0, 9, 253, 0, 96, 7, 0, 0, 0, 8, 81, 0, 0, 8, 17, 0, 21, 8, 131, 0, 18, 7, 31, 0, 0, 8, 113, 0, 0, 8, 49, 0, 0, 9, 195, 0, 16, 7, 10, 0, 0, 8, 97, 0, 0, 8, 33, 0, 0, 9, 163, 0, 0, 8, 1, 0, 0, 8, 129, 0, 0, 8, 65, 0, 0, 9, 227, 0, 16, 7, 6, 0, 0, 8, 89, 0, 0, 8, 25, 0, 0, 9, 147, 0, 19, 7, 59, 0, 0, 8, 121, 0, 0, 8, 57, 0, 0, 9, 211, 0, 17, 7, 17, 0, 0, 8, 105, 0, 0, 8, 41, 0, 0, 9, 179, 0, 0, 8, 9, 0, 0, 8, 137, 0, 0, 8, 73, 0, 0, 9, 243, 0, 16, 7, 4, 0, 0, 8, 85, 0, 0, 8, 21, 0, 16, 8, 2, 1, 19, 7, 43, 0, 0, 8, 117, 0, 0, 8, 53, 0, 0, 9, 203, 0, 17, 7, 13, 0, 0, 8, 101, 0, 0, 8, 37, 0, 0, 9, 171, 0, 0, 8, 5, 0, 0, 8, 133, 0, 0, 8, 69, 0, 0, 9, 235, 0, 16, 7, 8, 0, 0, 8, 93, 0, 0, 8, 29, 0, 0, 9, 155, 0, 20, 7, 83, 0, 0, 8, 125, 0, 0, 8, 61, 0, 0, 9, 219, 0, 18, 7, 23, 0, 0, 8, 109, 0, 0, 8, 45, 0, 0, 9, 187, 0, 0, 8, 13, 0, 0, 8, 141, 0, 0, 8, 77, 0, 0, 9, 251, 0, 16, 7, 3, 0, 0, 8, 83, 0, 0, 8, 19, 0, 21, 8, 195, 0, 19, 7, 35, 0, 0, 8, 115, 0, 0, 8, 51, 0, 0, 9, 199, 0, 17, 7, 11, 0, 0, 8, 99, 0, 0, 8, 35, 0, 0, 9, 167, 0, 0, 8, 3, 0, 0, 8, 131, 0, 0, 8, 67, 0, 0, 9, 231, 0, 16, 7, 7, 0, 0, 8, 91, 0, 0, 8, 27, 0, 0, 9, 151, 0, 20, 7, 67, 0, 0, 8, 123, 0, 0, 8, 59, 0, 0, 9, 215, 0, 18, 7, 19, 0, 0, 8, 107, 0, 0, 8, 43, 0, 0, 9, 183, 0, 0, 8, 11, 0, 0, 8, 139, 0, 0, 8, 75, 0, 0, 9, 247, 0, 16, 7, 5, 0, 0, 8, 87, 0, 0, 8, 23, 0, 64, 8, 0, 0, 19, 7, 51, 0, 0, 8, 119, 0, 0, 8, 55, 0, 0, 9, 207, 0, 17, 7, 15, 0, 0, 8, 103, 0, 0, 8, 39, 0, 0, 9, 175, 0, 0, 8, 7, 0, 0, 8, 135, 0, 0, 8, 71, 0, 0, 9, 239, 0, 16, 7, 9, 0, 0, 8, 95, 0, 0, 8, 31, 0, 0, 9, 159, 0, 20, 7, 99, 0, 0, 8, 127, 0, 0, 8, 63, 0, 0, 9, 223, 0, 18, 7, 27, 0, 0, 8, 111, 0, 0, 8, 47, 0, 0, 9, 191, 0, 0, 8, 15, 0, 0, 8, 143, 0, 0, 8, 79, 0, 0, 9, 255, 0, 16, 5, 1, 0, 23, 5, 1, 1, 19, 5, 17, 0, 27, 5, 1, 16, 17, 5, 5, 0, 25, 5, 1, 4, 21, 5, 65, 0, 29, 5, 1, 64, 16, 5, 3, 0, 24, 5, 1, 2, 20, 5, 33, 0, 28, 5, 1, 32, 18, 5, 9, 0, 26, 5, 1, 8, 22, 5, 129, 0, 64, 5, 0, 0, 16, 5, 2, 0, 23, 5, 129, 1, 19, 5, 25, 0, 27, 5, 1, 24, 17, 5, 7, 0, 25, 5, 1, 6, 21, 5, 97, 0, 29, 5, 1, 96, 16, 5, 4, 0, 24, 5, 1, 3, 20, 5, 49, 0, 28, 5, 1, 48, 18, 5, 13, 0, 26, 5, 1, 12, 22, 5, 193, 0, 64, 5, 0, 0, 119, 0, 114, 0, 37, 100, 0, 67, 58, 54, 58, 0, 49, 58, 0, 50, 58, 0, 51, 58, 0, 52, 58, 0, 53, 58, 0, 76, 105, 115, 116, 0, 37, 108, 108, 100, 0, 0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 49, 46, 50, 46, 53, 0, 105, 110, 99, 111, 114, 114, 101, 99, 116, 32, 104, 101, 97, 100, 101, 114, 32, 99, 104, 101, 99, 107, 0, 117, 110, 107, 110, 111, 119, 110, 32, 99, 111, 109, 112, 114, 101, 115, 115, 105, 111, 110, 32, 109, 101, 116, 104, 111, 100, 0, 105, 110, 118, 97, 108, 105, 100, 32, 119, 105, 110, 100, 111, 119, 32, 115, 105, 122, 101, 0, 117, 110, 107, 110, 111, 119, 110, 32, 104, 101, 97, 100, 101, 114, 32, 102, 108, 97, 103, 115, 32, 115, 101, 116, 0, 104, 101, 97, 100, 101, 114, 32, 99, 114, 99, 32, 109, 105, 115, 109, 97, 116, 99, 104, 0, 105, 110, 118, 97, 108, 105, 100, 32, 98, 108, 111, 99, 107, 32, 116, 121, 112, 101, 0, 105, 110, 118, 97, 108, 105, 100, 32, 115, 116, 111, 114, 101, 100, 32, 98, 108, 111, 99, 107, 32, 108, 101, 110, 103, 116, 104, 115, 0, 116, 111, 111, 32, 109, 97, 110, 121, 32, 108, 101, 110, 103, 116, 104, 32, 111, 114, 32, 100, 105, 115, 116, 97, 110, 99, 101, 32, 115, 121, 109, 98, 111, 108, 115, 0, 105, 110, 118, 97, 108, 105, 100, 32, 99, 111, 100, 101, 32, 108, 101, 110, 103, 116, 104, 115, 32, 115, 101, 116, 0, 105, 110, 118, 97, 108, 105, 100, 32, 98, 105, 116, 32, 108, 101, 110, 103, 116, 104, 32, 114, 101, 112, 101, 97, 116, 0, 105, 110, 118, 97, 108, 105, 100, 32, 99, 111, 100, 101, 32, 45, 45, 32, 109, 105, 115, 115, 105, 110, 103, 32, 101, 110, 100, 45, 111, 102, 45, 98, 108, 111, 99, 107, 0, 105, 110, 118, 97, 108, 105, 100, 32, 108, 105, 116, 101, 114, 97, 108, 47, 108, 101, 110, 103, 116, 104, 115, 32, 115, 101, 116, 0, 105, 110, 118, 97, 108, 105, 100, 32, 100, 105, 115, 116, 97, 110, 99, 101, 115, 32, 115, 101, 116, 0, 105, 110, 99, 111, 114, 114, 101, 99, 116, 32, 100, 97, 116, 97, 32, 99, 104, 101, 99, 107, 0, 105, 110, 99, 111, 114, 114, 101, 99, 116, 32, 108, 101, 110, 103, 116, 104, 32, 99, 104, 101, 99, 107, 0, 105, 110, 118, 97, 108, 105, 100, 32, 100, 105, 115, 116, 97, 110, 99, 101, 32, 116, 111, 111, 32, 102, 97, 114, 32, 98, 97, 99, 107, 0, 105, 110, 118, 97, 108, 105, 100, 32, 100, 105, 115, 116, 97, 110, 99, 101, 32, 99, 111, 100, 101, 0, 105, 110, 118, 97, 108, 105, 100, 32, 108, 105, 116, 101, 114, 97, 108, 47, 108, 101, 110, 103, 116, 104, 32, 99, 111, 100, 101, 0, 110, 101, 101, 100, 32, 100, 105, 99, 116, 105, 111, 110, 97, 114, 121, 0, 115, 116, 114, 101, 97, 109, 32, 101, 110, 100, 0, 0, 102, 105, 108, 101, 32, 101, 114, 114, 111, 114, 0, 115, 116, 114, 101, 97, 109, 32, 101, 114, 114, 111, 114, 0, 100, 97, 116, 97, 32, 101, 114, 114, 111, 114, 0, 105, 110, 115, 117, 102, 102, 105, 99, 105, 101, 110, 116, 32, 109, 101, 109, 111, 114, 121, 0, 98, 117, 102, 102, 101, 114, 32, 101, 114, 114, 111, 114, 0, 105, 110, 99, 111, 109, 112, 97, 116, 105, 98, 108, 101, 32, 118, 101, 114, 115, 105, 111, 110, 0, 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 84, 33, 34, 25, 13, 1, 2, 3, 17, 75, 28, 12, 16, 4, 11, 29, 18, 30, 39, 104, 110, 111, 112, 113, 98, 32, 5, 6, 15, 19, 20, 21, 26, 8, 22, 7, 40, 36, 23, 24, 9, 10, 14, 27, 31, 37, 35, 131, 130, 125, 38, 42, 43, 60, 61, 62, 63, 67, 71, 74, 77, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108, 114, 115, 116, 121, 122, 123, 124, 0, 73, 108, 108, 101, 103, 97, 108, 32, 98, 121, 116, 101, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0, 68, 111, 109, 97, 105, 110, 32, 101, 114, 114, 111, 114, 0, 82, 101, 115, 117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 97, 98, 108, 101, 0, 78, 111, 116, 32, 97, 32, 116, 116, 121, 0, 80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110, 111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 78, 111, 32, 115, 117, 99, 104, 32, 112, 114, 111, 99, 101, 115, 115, 0, 70, 105, 108, 101, 32, 101, 120, 105, 115, 116, 115, 0, 86, 97, 108, 117, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 32, 102, 111, 114, 32, 100, 97, 116, 97, 32, 116, 121, 112, 101, 0, 78, 111, 32, 115, 112, 97, 99, 101, 32, 108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101, 0, 79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121, 0, 73, 110, 116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116, 101, 109, 32, 99, 97, 108, 108, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 116, 101, 109, 112, 111, 114, 97, 114, 105, 108, 121, 32, 117, 110, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 73, 110, 118, 97, 108, 105, 100, 32, 115, 101, 101, 107, 0, 67, 114, 111, 115, 115, 45, 100, 101, 118, 105, 99, 101, 32, 108, 105, 110, 107, 0, 82, 101, 97, 100, 45, 111, 110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109, 0, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32, 101, 109, 112, 116, 121, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 112, 101, 101, 114, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 116, 105, 109, 101, 100, 32, 111, 117, 116, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 102, 117, 115, 101, 100, 0, 72, 111, 115, 116, 32, 105, 115, 32, 100, 111, 119, 110, 0, 72, 111, 115, 116, 32, 105, 115, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 65, 100, 100, 114, 101, 115, 115, 32, 105, 110, 32, 117, 115, 101, 0, 66, 114, 111, 107, 101, 110, 32, 112, 105, 112, 101, 0, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115, 0, 66, 108, 111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 0, 78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98, 117, 115, 121, 0, 69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32, 101, 114, 114, 111, 114, 0, 73, 110, 118, 97, 108, 105, 100, 32, 97, 114, 103, 117, 109, 101, 110, 116, 0, 65, 114, 103, 117, 109, 101, 110, 116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 83, 121, 109, 98, 111, 108, 105, 99, 32, 108, 105, 110, 107, 32, 108, 111, 111, 112, 0, 70, 105, 108, 101, 110, 97, 109, 101, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 111, 112, 101, 110, 32, 102, 105, 108, 101, 115, 32, 105, 110, 32, 115, 121, 115, 116, 101, 109, 0, 78, 111, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 66, 97, 100, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 0, 78, 111, 32, 99, 104, 105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 0, 66, 97, 100, 32, 97, 100, 100, 114, 101, 115, 115, 0, 70, 105, 108, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 108, 105, 110, 107, 115, 0, 78, 111, 32, 108, 111, 99, 107, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 100, 101, 97, 100, 108, 111, 99, 107, 32, 119, 111, 117, 108, 100, 32, 111, 99, 99, 117, 114, 0, 83, 116, 97, 116, 101, 32, 110, 111, 116, 32, 114, 101, 99, 111, 118, 101, 114, 97, 98, 108, 101, 0, 80, 114, 101, 118, 105, 111, 117, 115, 32, 111, 119, 110, 101, 114, 32, 100, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 99, 97, 110, 99, 101, 108, 101, 100, 0, 70, 117, 110, 99, 116, 105, 111, 110, 32, 110, 111, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101, 100, 0, 78, 111, 32, 109, 101, 115, 115, 97, 103, 101, 32, 111, 102, 32, 100, 101, 115, 105, 114, 101, 100, 32, 116, 121, 112, 101, 0, 73, 100, 101, 110, 116, 105, 102, 105, 101, 114, 32, 114, 101, 109, 111, 118, 101, 100, 0, 68, 101, 118, 105, 99, 101, 32, 110, 111, 116, 32, 97, 32, 115, 116, 114, 101, 97, 109, 0, 78, 111, 32, 100, 97, 116, 97, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 68, 101, 118, 105, 99, 101, 32, 116, 105, 109, 101, 111, 117, 116, 0, 79, 117, 116, 32, 111, 102, 32, 115, 116, 114, 101, 97, 109, 115, 32, 114, 101, 115, 111, 117, 114, 99, 101, 115, 0, 76, 105, 110, 107, 32, 104, 97, 115, 32, 98, 101, 101, 110, 32, 115, 101, 118, 101, 114, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 101, 114, 114, 111, 114, 0, 66, 97, 100, 32, 109, 101, 115, 115, 97, 103, 101, 0, 70, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 32, 105, 110, 32, 98, 97, 100, 32, 115, 116, 97, 116, 101, 0, 78, 111, 116, 32, 97, 32, 115, 111, 99, 107, 101, 116, 0, 68, 101, 115, 116, 105, 110, 97, 116, 105, 111, 110, 32, 97, 100, 100, 114, 101, 115, 115, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 77, 101, 115, 115, 97, 103, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 119, 114, 111, 110, 103, 32, 116, 121, 112, 101, 32, 102, 111, 114, 32, 115, 111, 99, 107, 101, 116, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 116, 121, 112, 101, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 78, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 65, 100, 100, 114, 101, 115, 115, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 121, 32, 112, 114, 111, 116, 111, 99, 111, 108, 0, 65, 100, 100, 114, 101, 115, 115, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 78, 101, 116, 119, 111, 114, 107, 32, 105, 115, 32, 100, 111, 119, 110, 0, 78, 101, 116, 119, 111, 114, 107, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 110, 101, 116, 119, 111, 114, 107, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 97, 98, 111, 114, 116, 101, 100, 0, 78, 111, 32, 98, 117, 102, 102, 101, 114, 32, 115, 112, 97, 99, 101, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 83, 111, 99, 107, 101, 116, 32, 105, 115, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 67, 97, 110, 110, 111, 116, 32, 115, 101, 110, 100, 32, 97, 102, 116, 101, 114, 32, 115, 111, 99, 107, 101, 116, 32, 115, 104, 117, 116, 100, 111, 119, 110, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 97, 108, 114, 101, 97, 100, 121, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 83, 116, 97, 108, 101, 32, 102, 105, 108, 101, 32, 104, 97, 110, 100, 108, 101, 0, 82, 101, 109, 111, 116, 101, 32, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 81, 117, 111, 116, 97, 32, 101, 120, 99, 101, 101, 100, 101, 100, 0, 78, 111, 32, 109, 101, 100, 105, 117, 109, 32, 102, 111, 117, 110, 100, 0, 87, 114, 111, 110, 103, 32, 109, 101, 100, 105, 117, 109, 32, 116, 121, 112, 101, 0, 78, 111, 32, 101, 114, 114, 111, 114, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 0, 0, 114, 119, 97], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE + 10240);
allocate([17, 0, 10, 0, 17, 17, 17, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 15, 10, 17, 17, 17, 3, 10, 7, 0, 1, 19, 9, 11, 11, 0, 0, 9, 6, 11, 0, 0, 11, 0, 6, 17, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 10, 10, 17, 17, 17, 0, 10, 0, 0, 2, 0, 9, 11, 0, 0, 0, 9, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 4, 13, 0, 0, 0, 0, 9, 14, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 15, 0, 0, 0, 0, 9, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 11, 0, 0, 0, 0, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 45, 43, 32, 32, 32, 48, 88, 48, 120, 0, 40, 110, 117, 108, 108, 41, 0, 45, 48, 88, 43, 48, 88, 32, 48, 88, 45, 48, 120, 43, 48, 120, 32, 48, 120, 0, 105, 110, 102, 0, 73, 78, 70, 0, 110, 97, 110, 0, 78, 65, 78, 0, 46, 0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE + 17806);
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);
assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr + 1] = HEAP8[ptr + 1];
  HEAP8[tempDoublePtr + 2] = HEAP8[ptr + 2];
  HEAP8[tempDoublePtr + 3] = HEAP8[ptr + 3];
}

function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr + 1] = HEAP8[ptr + 1];
  HEAP8[tempDoublePtr + 2] = HEAP8[ptr + 2];
  HEAP8[tempDoublePtr + 3] = HEAP8[ptr + 3];
  HEAP8[tempDoublePtr + 4] = HEAP8[ptr + 4];
  HEAP8[tempDoublePtr + 5] = HEAP8[ptr + 5];
  HEAP8[tempDoublePtr + 6] = HEAP8[ptr + 6];
  HEAP8[tempDoublePtr + 7] = HEAP8[ptr + 7];
}

var _BDtoIHigh = true;
Module["_i64Subtract"] = _i64Subtract;
Module["_i64Add"] = _i64Add;

function _pthread_cleanup_push(routine, arg) {
  __ATEXIT__.push(function () {
    Runtime.dynCall("vi", routine, [arg]);
  });

  _pthread_cleanup_push.level = __ATEXIT__.length;
}

Module["_memset"] = _memset;
var _BDtoILow = true;
Module["_bitshift64Lshr"] = _bitshift64Lshr;
Module["_bitshift64Shl"] = _bitshift64Shl;

function _pthread_cleanup_pop() {
  assert(_pthread_cleanup_push.level == __ATEXIT__.length, "cannot pop if something else added meanwhile!");

  __ATEXIT__.pop();

  _pthread_cleanup_push.level = __ATEXIT__.length;
}

function _abort() {
  Module["abort"]();
}

var ERRNO_CODES = {
  EPERM: 1,
  ENOENT: 2,
  ESRCH: 3,
  EINTR: 4,
  EIO: 5,
  ENXIO: 6,
  E2BIG: 7,
  ENOEXEC: 8,
  EBADF: 9,
  ECHILD: 10,
  EAGAIN: 11,
  EWOULDBLOCK: 11,
  ENOMEM: 12,
  EACCES: 13,
  EFAULT: 14,
  ENOTBLK: 15,
  EBUSY: 16,
  EEXIST: 17,
  EXDEV: 18,
  ENODEV: 19,
  ENOTDIR: 20,
  EISDIR: 21,
  EINVAL: 22,
  ENFILE: 23,
  EMFILE: 24,
  ENOTTY: 25,
  ETXTBSY: 26,
  EFBIG: 27,
  ENOSPC: 28,
  ESPIPE: 29,
  EROFS: 30,
  EMLINK: 31,
  EPIPE: 32,
  EDOM: 33,
  ERANGE: 34,
  ENOMSG: 42,
  EIDRM: 43,
  ECHRNG: 44,
  EL2NSYNC: 45,
  EL3HLT: 46,
  EL3RST: 47,
  ELNRNG: 48,
  EUNATCH: 49,
  ENOCSI: 50,
  EL2HLT: 51,
  EDEADLK: 35,
  ENOLCK: 37,
  EBADE: 52,
  EBADR: 53,
  EXFULL: 54,
  ENOANO: 55,
  EBADRQC: 56,
  EBADSLT: 57,
  EDEADLOCK: 35,
  EBFONT: 59,
  ENOSTR: 60,
  ENODATA: 61,
  ETIME: 62,
  ENOSR: 63,
  ENONET: 64,
  ENOPKG: 65,
  EREMOTE: 66,
  ENOLINK: 67,
  EADV: 68,
  ESRMNT: 69,
  ECOMM: 70,
  EPROTO: 71,
  EMULTIHOP: 72,
  EDOTDOT: 73,
  EBADMSG: 74,
  ENOTUNIQ: 76,
  EBADFD: 77,
  EREMCHG: 78,
  ELIBACC: 79,
  ELIBBAD: 80,
  ELIBSCN: 81,
  ELIBMAX: 82,
  ELIBEXEC: 83,
  ENOSYS: 38,
  ENOTEMPTY: 39,
  ENAMETOOLONG: 36,
  ELOOP: 40,
  EOPNOTSUPP: 95,
  EPFNOSUPPORT: 96,
  ECONNRESET: 104,
  ENOBUFS: 105,
  EAFNOSUPPORT: 97,
  EPROTOTYPE: 91,
  ENOTSOCK: 88,
  ENOPROTOOPT: 92,
  ESHUTDOWN: 108,
  ECONNREFUSED: 111,
  EADDRINUSE: 98,
  ECONNABORTED: 103,
  ENETUNREACH: 101,
  ENETDOWN: 100,
  ETIMEDOUT: 110,
  EHOSTDOWN: 112,
  EHOSTUNREACH: 113,
  EINPROGRESS: 115,
  EALREADY: 114,
  EDESTADDRREQ: 89,
  EMSGSIZE: 90,
  EPROTONOSUPPORT: 93,
  ESOCKTNOSUPPORT: 94,
  EADDRNOTAVAIL: 99,
  ENETRESET: 102,
  EISCONN: 106,
  ENOTCONN: 107,
  ETOOMANYREFS: 109,
  EUSERS: 87,
  EDQUOT: 122,
  ESTALE: 116,
  ENOTSUP: 95,
  ENOMEDIUM: 123,
  EILSEQ: 84,
  EOVERFLOW: 75,
  ECANCELED: 125,
  ENOTRECOVERABLE: 131,
  EOWNERDEAD: 130,
  ESTRPIPE: 86
};
var ERRNO_MESSAGES = {
  0: "Success",
  1: "Not super-user",
  2: "No such file or directory",
  3: "No such process",
  4: "Interrupted system call",
  5: "I/O error",
  6: "No such device or address",
  7: "Arg list too long",
  8: "Exec format error",
  9: "Bad file number",
  10: "No children",
  11: "No more processes",
  12: "Not enough core",
  13: "Permission denied",
  14: "Bad address",
  15: "Block device required",
  16: "Mount device busy",
  17: "File exists",
  18: "Cross-device link",
  19: "No such device",
  20: "Not a directory",
  21: "Is a directory",
  22: "Invalid argument",
  23: "Too many open files in system",
  24: "Too many open files",
  25: "Not a typewriter",
  26: "Text file busy",
  27: "File too large",
  28: "No space left on device",
  29: "Illegal seek",
  30: "Read only file system",
  31: "Too many links",
  32: "Broken pipe",
  33: "Math arg out of domain of func",
  34: "Math result not representable",
  35: "File locking deadlock error",
  36: "File or path name too long",
  37: "No record locks available",
  38: "Function not implemented",
  39: "Directory not empty",
  40: "Too many symbolic links",
  42: "No message of desired type",
  43: "Identifier removed",
  44: "Channel number out of range",
  45: "Level 2 not synchronized",
  46: "Level 3 halted",
  47: "Level 3 reset",
  48: "Link number out of range",
  49: "Protocol driver not attached",
  50: "No CSI structure available",
  51: "Level 2 halted",
  52: "Invalid exchange",
  53: "Invalid request descriptor",
  54: "Exchange full",
  55: "No anode",
  56: "Invalid request code",
  57: "Invalid slot",
  59: "Bad font file fmt",
  60: "Device not a stream",
  61: "No data (for no delay io)",
  62: "Timer expired",
  63: "Out of streams resources",
  64: "Machine is not on the network",
  65: "Package not installed",
  66: "The object is remote",
  67: "The link has been severed",
  68: "Advertise error",
  69: "Srmount error",
  70: "Communication error on send",
  71: "Protocol error",
  72: "Multihop attempted",
  73: "Cross mount point (not really error)",
  74: "Trying to read unreadable message",
  75: "Value too large for defined data type",
  76: "Given log. name not unique",
  77: "f.d. invalid for this operation",
  78: "Remote address changed",
  79: "Can   access a needed shared lib",
  80: "Accessing a corrupted shared lib",
  81: ".lib section in a.out corrupted",
  82: "Attempting to link in too many libs",
  83: "Attempting to exec a shared library",
  84: "Illegal byte sequence",
  86: "Streams pipe error",
  87: "Too many users",
  88: "Socket operation on non-socket",
  89: "Destination address required",
  90: "Message too long",
  91: "Protocol wrong type for socket",
  92: "Protocol not available",
  93: "Unknown protocol",
  94: "Socket type not supported",
  95: "Not supported",
  96: "Protocol family not supported",
  97: "Address family not supported by protocol family",
  98: "Address already in use",
  99: "Address not available",
  100: "Network interface is not configured",
  101: "Network is unreachable",
  102: "Connection reset by network",
  103: "Connection aborted",
  104: "Connection reset by peer",
  105: "No buffer space available",
  106: "Socket is already connected",
  107: "Socket is not connected",
  108: "Can't send after socket shutdown",
  109: "Too many references",
  110: "Connection timed out",
  111: "Connection refused",
  112: "Host is down",
  113: "Host is unreachable",
  114: "Socket already connected",
  115: "Connection already in progress",
  116: "Stale file handle",
  122: "Quota exceeded",
  123: "No medium (in tape drive)",
  125: "Operation canceled",
  130: "Previous owner died",
  131: "State not recoverable"
};

function ___setErrNo(value) {
  if (Module["___errno_location"]) HEAP32[Module["___errno_location"]() >> 2] = value;
  return value;
}

var PATH = {
  splitPath: function splitPath(filename) {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: function normalizeArray(parts, allowAboveRoot) {
    var up = 0;

    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];

      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift("..");
      }
    }

    return parts;
  },
  normalize: function normalize(path) {
    var isAbsolute = path.charAt(0) === "/",
        trailingSlash = path.substr(-1) === "/";
    path = PATH.normalizeArray(path.split("/").filter(function (p) {
      return !!p;
    }), !isAbsolute).join("/");

    if (!path && !isAbsolute) {
      path = ".";
    }

    if (path && trailingSlash) {
      path += "/";
    }

    return (isAbsolute ? "/" : "") + path;
  },
  dirname: function dirname(path) {
    var result = PATH.splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      return ".";
    }

    if (dir) {
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  },
  basename: function basename(path) {
    if (path === "/") return "/";
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1) return path;
    return path.substr(lastSlash + 1);
  },
  extname: function extname(path) {
    return PATH.splitPath(path)[3];
  },
  join: function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return PATH.normalize(paths.join("/"));
  },
  join2: function join2(l, r) {
    return PATH.normalize(l + "/" + r);
  },
  resolve: function resolve() {
    var resolvedPath = "",
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : FS.cwd();

      if (typeof path !== "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }

      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charAt(0) === "/";
    }

    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function (p) {
      return !!p;
    }), !resolvedAbsolute).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  },
  relative: function relative(from, to) {
    from = PATH.resolve(from).substr(1);
    to = PATH.resolve(to).substr(1);

    function trim(arr) {
      var start = 0;

      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }

      var end = arr.length - 1;

      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;

    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];

    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }
};
var TTY = {
  ttys: [],
  init: function init() {},
  shutdown: function shutdown() {},
  register: function register(dev, ops) {
    TTY.ttys[dev] = {
      input: [],
      output: [],
      ops: ops
    };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open: function open(stream) {
      var tty = TTY.ttys[stream.node.rdev];

      if (!tty) {
        throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
      }

      stream.tty = tty;
      stream.seekable = false;
    },
    close: function close(stream) {
      stream.tty.ops.flush(stream.tty);
    },
    flush: function flush(stream) {
      stream.tty.ops.flush(stream.tty);
    },
    read: function read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
      }

      var bytesRead = 0;

      for (var i = 0; i < length; i++) {
        var result;

        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO);
        }

        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
        }

        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }

      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }

      return bytesRead;
    },
    write: function write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
      }

      for (var i = 0; i < length; i++) {
        try {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO);
        }
      }

      if (length) {
        stream.node.timestamp = Date.now();
      }

      return i;
    }
  },
  default_tty_ops: {
    get_char: function get_char(tty) {
      if (!tty.input.length) {
        var result = null;

        if (ENVIRONMENT_IS_NODE) {
          var BUFSIZE = 256;
          var buf = new Buffer(BUFSIZE);
          var bytesRead = 0;
          var fd = process.stdin.fd;
          var usingDevice = false;

          try {
            fd = fs.openSync("/dev/stdin", "r");
            usingDevice = true;
          } catch (e) {}

          bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);

          if (usingDevice) {
            fs.closeSync(fd);
          }

          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString("utf-8");
          } else {
            result = null;
          }
        } else if (typeof window != "undefined" && typeof window.prompt == "function") {
          result = window.prompt("Input: ");

          if (result !== null) {
            result += "\n";
          }
        } else if (typeof readline == "function") {
          result = readline();

          if (result !== null) {
            result += "\n";
          }
        }

        if (!result) {
          return null;
        }

        tty.input = intArrayFromString(result, true);
      }

      return tty.input.shift();
    },
    put_char: function put_char(tty, val) {
      if (val === null || val === 10) {
        Module["print"](UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    flush: function flush(tty) {
      if (tty.output && tty.output.length > 0) {
        Module["print"](UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    }
  },
  default_tty1_ops: {
    put_char: function put_char(tty, val) {
      if (val === null || val === 10) {
        Module["printErr"](UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    flush: function flush(tty) {
      if (tty.output && tty.output.length > 0) {
        Module["printErr"](UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    }
  }
};
var MEMFS = {
  ops_table: null,
  mount: function mount(_mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, 0);
  },
  createNode: function createNode(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    if (!MEMFS.ops_table) {
      MEMFS.ops_table = {
        dir: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            lookup: MEMFS.node_ops.lookup,
            mknod: MEMFS.node_ops.mknod,
            rename: MEMFS.node_ops.rename,
            unlink: MEMFS.node_ops.unlink,
            rmdir: MEMFS.node_ops.rmdir,
            readdir: MEMFS.node_ops.readdir,
            symlink: MEMFS.node_ops.symlink
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek
          }
        },
        file: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek,
            read: MEMFS.stream_ops.read,
            write: MEMFS.stream_ops.write,
            allocate: MEMFS.stream_ops.allocate,
            mmap: MEMFS.stream_ops.mmap,
            msync: MEMFS.stream_ops.msync
          }
        },
        link: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            readlink: MEMFS.node_ops.readlink
          },
          stream: {}
        },
        chrdev: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: FS.chrdev_stream_ops
        }
      };
    }

    var node = FS.createNode(parent, name, mode, dev);

    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }

    node.timestamp = Date.now();

    if (parent) {
      parent.contents[name] = node;
    }

    return node;
  },
  getFileDataAsRegularArray: function getFileDataAsRegularArray(node) {
    if (node.contents && node.contents.subarray) {
      var arr = [];

      for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);

      return arr;
    }

    return node.contents;
  },
  getFileDataAsTypedArray: function getFileDataAsTypedArray(node) {
    if (!node.contents) return new Uint8Array();
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
    return new Uint8Array(node.contents);
  },
  expandFileStorage: function expandFileStorage(node, newCapacity) {
    if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
      node.contents = MEMFS.getFileDataAsRegularArray(node);
      node.usedBytes = node.contents.length;
    }

    if (!node.contents || node.contents.subarray) {
      var prevCapacity = node.contents ? node.contents.buffer.byteLength : 0;
      if (prevCapacity >= newCapacity) return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
      if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
      var oldContents = node.contents;
      node.contents = new Uint8Array(newCapacity);
      if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      return;
    }

    if (!node.contents && newCapacity > 0) node.contents = [];

    while (node.contents.length < newCapacity) node.contents.push(0);
  },
  resizeFileStorage: function resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;

    if (newSize == 0) {
      node.contents = null;
      node.usedBytes = 0;
      return;
    }

    if (!node.contents || node.contents.subarray) {
      var oldContents = node.contents;
      node.contents = new Uint8Array(new ArrayBuffer(newSize));

      if (oldContents) {
        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      }

      node.usedBytes = newSize;
      return;
    }

    if (!node.contents) node.contents = [];
    if (node.contents.length > newSize) node.contents.length = newSize;else while (node.contents.length < newSize) node.contents.push(0);
    node.usedBytes = newSize;
  },
  node_ops: {
    getattr: function getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;

      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }

      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr: function setattr(node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode;
      }

      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp;
      }

      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup: function lookup(parent, name) {
      throw FS.genericErrors[ERRNO_CODES.ENOENT];
    },
    mknod: function mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename: function rename(old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node;

        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}

        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
        }
      }

      delete old_node.parent.contents[old_node.name];
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      old_node.parent = new_dir;
    },
    unlink: function unlink(parent, name) {
      delete parent.contents[name];
    },
    rmdir: function rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);

      for (var i in node.contents) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
      }

      delete parent.contents[name];
    },
    readdir: function readdir(node) {
      var entries = [".", ".."];

      for (var key in node.contents) {
        if (!node.contents.hasOwnProperty(key)) {
          continue;
        }

        entries.push(key);
      }

      return entries;
    },
    symlink: function symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink: function readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      }

      return node.link;
    }
  },
  stream_ops: {
    read: function read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      assert(size >= 0);

      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
      }

      return size;
    },
    write: function write(stream, buffer, offset, length, position, canOwn) {
      if (!length) return 0;
      var node = stream.node;
      node.timestamp = Date.now();

      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }

      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position);else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    },
    llseek: function llseek(stream, offset, whence) {
      var position = offset;

      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }

      if (position < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      }

      return position;
    },
    allocate: function allocate(stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    },
    mmap: function mmap(stream, buffer, offset, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
      }

      var ptr;
      var allocated;
      var contents = stream.node.contents;

      if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        if (position > 0 || position + length < stream.node.usedBytes) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length);
          } else {
            contents = Array.prototype.slice.call(contents, position, position + length);
          }
        }

        allocated = true;
        ptr = _malloc(length);

        if (!ptr) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
        }

        buffer.set(contents, ptr);
      }

      return {
        ptr: ptr,
        allocated: allocated
      };
    },
    msync: function msync(stream, buffer, offset, length, mmapFlags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
      }

      if (mmapFlags & 2) {
        return 0;
      }

      var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    }
  }
};
var IDBFS = {
  dbs: {},
  indexedDB: function (_indexedDB) {
    function indexedDB() {
      return _indexedDB.apply(this, arguments);
    }

    indexedDB.toString = function () {
      return _indexedDB.toString();
    };

    return indexedDB;
  }(function () {
    if (typeof indexedDB !== "undefined") return indexedDB;
    var ret = null;
    if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    assert(ret, "IDBFS used, but indexedDB not supported");
    return ret;
  }),
  DB_VERSION: 21,
  DB_STORE_NAME: "FILE_DATA",
  mount: function mount(_mount2) {
    return MEMFS.mount.apply(null, arguments);
  },
  syncfs: function syncfs(mount, populate, callback) {
    IDBFS.getLocalSet(mount, function (err, local) {
      if (err) return callback(err);
      IDBFS.getRemoteSet(mount, function (err, remote) {
        if (err) return callback(err);
        var src = populate ? remote : local;
        var dst = populate ? local : remote;
        IDBFS.reconcile(src, dst, callback);
      });
    });
  },
  getDB: function getDB(name, callback) {
    var db = IDBFS.dbs[name];

    if (db) {
      return callback(null, db);
    }

    var req;

    try {
      req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
    } catch (e) {
      return callback(e);
    }

    req.onupgradeneeded = function (e) {
      var db = e.target.result;
      var transaction = e.target.transaction;
      var fileStore;

      if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
        fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
      } else {
        fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
      }

      if (!fileStore.indexNames.contains("timestamp")) {
        fileStore.createIndex("timestamp", "timestamp", {
          unique: false
        });
      }
    };

    req.onsuccess = function () {
      db = req.result;
      IDBFS.dbs[name] = db;
      callback(null, db);
    };

    req.onerror = function (e) {
      callback(this.error);
      e.preventDefault();
    };
  },
  getLocalSet: function getLocalSet(mount, callback) {
    var entries = {};

    function isRealDir(p) {
      return p !== "." && p !== "..";
    }

    function toAbsolute(root) {
      return function (p) {
        return PATH.join2(root, p);
      };
    }

    var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));

    while (check.length) {
      var path = check.pop();
      var stat;

      try {
        stat = FS.stat(path);
      } catch (e) {
        return callback(e);
      }

      if (FS.isDir(stat.mode)) {
        check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
      }

      entries[path] = {
        timestamp: stat.mtime
      };
    }

    return callback(null, {
      type: "local",
      entries: entries
    });
  },
  getRemoteSet: function getRemoteSet(mount, callback) {
    var entries = {};
    IDBFS.getDB(mount.mountpoint, function (err, db) {
      if (err) return callback(err);
      var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");

      transaction.onerror = function (e) {
        callback(this.error);
        e.preventDefault();
      };

      var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
      var index = store.index("timestamp");

      index.openKeyCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (!cursor) {
          return callback(null, {
            type: "remote",
            db: db,
            entries: entries
          });
        }

        entries[cursor.primaryKey] = {
          timestamp: cursor.key
        };
        cursor.continue();
      };
    });
  },
  loadLocalEntry: function loadLocalEntry(path, callback) {
    var stat, node;

    try {
      var lookup = FS.lookupPath(path);
      node = lookup.node;
      stat = FS.stat(path);
    } catch (e) {
      return callback(e);
    }

    if (FS.isDir(stat.mode)) {
      return callback(null, {
        timestamp: stat.mtime,
        mode: stat.mode
      });
    } else if (FS.isFile(stat.mode)) {
      node.contents = MEMFS.getFileDataAsTypedArray(node);
      return callback(null, {
        timestamp: stat.mtime,
        mode: stat.mode,
        contents: node.contents
      });
    } else {
      return callback(new Error("node type not supported"));
    }
  },
  storeLocalEntry: function storeLocalEntry(path, entry, callback) {
    try {
      if (FS.isDir(entry.mode)) {
        FS.mkdir(path, entry.mode);
      } else if (FS.isFile(entry.mode)) {
        FS.writeFile(path, entry.contents, {
          encoding: "binary",
          canOwn: true
        });
      } else {
        return callback(new Error("node type not supported"));
      }

      FS.chmod(path, entry.mode);
      FS.utime(path, entry.timestamp, entry.timestamp);
    } catch (e) {
      return callback(e);
    }

    callback(null);
  },
  removeLocalEntry: function removeLocalEntry(path, callback) {
    try {
      var lookup = FS.lookupPath(path);
      var stat = FS.stat(path);

      if (FS.isDir(stat.mode)) {
        FS.rmdir(path);
      } else if (FS.isFile(stat.mode)) {
        FS.unlink(path);
      }
    } catch (e) {
      return callback(e);
    }

    callback(null);
  },
  loadRemoteEntry: function loadRemoteEntry(store, path, callback) {
    var req = store.get(path);

    req.onsuccess = function (event) {
      callback(null, event.target.result);
    };

    req.onerror = function (e) {
      callback(this.error);
      e.preventDefault();
    };
  },
  storeRemoteEntry: function storeRemoteEntry(store, path, entry, callback) {
    var req = store.put(entry, path);

    req.onsuccess = function () {
      callback(null);
    };

    req.onerror = function (e) {
      callback(this.error);
      e.preventDefault();
    };
  },
  removeRemoteEntry: function removeRemoteEntry(store, path, callback) {
    var req = store.delete(path);

    req.onsuccess = function () {
      callback(null);
    };

    req.onerror = function (e) {
      callback(this.error);
      e.preventDefault();
    };
  },
  reconcile: function reconcile(src, dst, callback) {
    var total = 0;
    var create = [];
    Object.keys(src.entries).forEach(function (key) {
      var e = src.entries[key];
      var e2 = dst.entries[key];

      if (!e2 || e.timestamp > e2.timestamp) {
        create.push(key);
        total++;
      }
    });
    var remove = [];
    Object.keys(dst.entries).forEach(function (key) {
      var e = dst.entries[key];
      var e2 = src.entries[key];

      if (!e2) {
        remove.push(key);
        total++;
      }
    });

    if (!total) {
      return callback(null);
    }

    var errored = false;
    var completed = 0;
    var db = src.type === "remote" ? src.db : dst.db;
    var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);

    function done(err) {
      if (err) {
        if (!done.errored) {
          done.errored = true;
          return callback(err);
        }

        return;
      }

      if (++completed >= total) {
        return callback(null);
      }
    }

    transaction.onerror = function (e) {
      done(this.error);
      e.preventDefault();
    };

    create.sort().forEach(function (path) {
      if (dst.type === "local") {
        IDBFS.loadRemoteEntry(store, path, function (err, entry) {
          if (err) return done(err);
          IDBFS.storeLocalEntry(path, entry, done);
        });
      } else {
        IDBFS.loadLocalEntry(path, function (err, entry) {
          if (err) return done(err);
          IDBFS.storeRemoteEntry(store, path, entry, done);
        });
      }
    });
    remove.sort().reverse().forEach(function (path) {
      if (dst.type === "local") {
        IDBFS.removeLocalEntry(path, done);
      } else {
        IDBFS.removeRemoteEntry(store, path, done);
      }
    });
  }
};
var NODEFS = {
  isWindows: false,
  staticInit: function staticInit() {
    NODEFS.isWindows = !!process.platform.match(/^win/);
  },
  mount: function mount(_mount3) {
    assert(ENVIRONMENT_IS_NODE);
    return NODEFS.createNode(null, "/", NODEFS.getMode(_mount3.opts.root), 0);
  },
  createNode: function createNode(parent, name, mode, dev) {
    if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    var node = FS.createNode(parent, name, mode);
    node.node_ops = NODEFS.node_ops;
    node.stream_ops = NODEFS.stream_ops;
    return node;
  },
  getMode: function getMode(path) {
    var stat;

    try {
      stat = fs.lstatSync(path);

      if (NODEFS.isWindows) {
        stat.mode = stat.mode | (stat.mode & 146) >> 1;
      }
    } catch (e) {
      if (!e.code) throw e;
      throw new FS.ErrnoError(ERRNO_CODES[e.code]);
    }

    return stat.mode;
  },
  realPath: function realPath(node) {
    var parts = [];

    while (node.parent !== node) {
      parts.push(node.name);
      node = node.parent;
    }

    parts.push(node.mount.opts.root);
    parts.reverse();
    return PATH.join.apply(null, parts);
  },
  flagsToPermissionStringMap: {
    0: "r",
    1: "r+",
    2: "r+",
    64: "r",
    65: "r+",
    66: "r+",
    129: "rx+",
    193: "rx+",
    514: "w+",
    577: "w",
    578: "w+",
    705: "wx",
    706: "wx+",
    1024: "a",
    1025: "a",
    1026: "a+",
    1089: "a",
    1090: "a+",
    1153: "ax",
    1154: "ax+",
    1217: "ax",
    1218: "ax+",
    4096: "rs",
    4098: "rs+"
  },
  flagsToPermissionString: function flagsToPermissionString(flags) {
    flags &= ~32768;

    if (flags in NODEFS.flagsToPermissionStringMap) {
      return NODEFS.flagsToPermissionStringMap[flags];
    } else {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }
  },
  node_ops: {
    getattr: function getattr(node) {
      var path = NODEFS.realPath(node);
      var stat;

      try {
        stat = fs.lstatSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }

      if (NODEFS.isWindows && !stat.blksize) {
        stat.blksize = 4096;
      }

      if (NODEFS.isWindows && !stat.blocks) {
        stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0;
      }

      return {
        dev: stat.dev,
        ino: stat.ino,
        mode: stat.mode,
        nlink: stat.nlink,
        uid: stat.uid,
        gid: stat.gid,
        rdev: stat.rdev,
        size: stat.size,
        atime: stat.atime,
        mtime: stat.mtime,
        ctime: stat.ctime,
        blksize: stat.blksize,
        blocks: stat.blocks
      };
    },
    setattr: function setattr(node, attr) {
      var path = NODEFS.realPath(node);

      try {
        if (attr.mode !== undefined) {
          fs.chmodSync(path, attr.mode);
          node.mode = attr.mode;
        }

        if (attr.timestamp !== undefined) {
          var date = new Date(attr.timestamp);
          fs.utimesSync(path, date, date);
        }

        if (attr.size !== undefined) {
          fs.truncateSync(path, attr.size);
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    lookup: function lookup(parent, name) {
      var path = PATH.join2(NODEFS.realPath(parent), name);
      var mode = NODEFS.getMode(path);
      return NODEFS.createNode(parent, name, mode);
    },
    mknod: function mknod(parent, name, mode, dev) {
      var node = NODEFS.createNode(parent, name, mode, dev);
      var path = NODEFS.realPath(node);

      try {
        if (FS.isDir(node.mode)) {
          fs.mkdirSync(path, node.mode);
        } else {
          fs.writeFileSync(path, "", {
            mode: node.mode
          });
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }

      return node;
    },
    rename: function rename(oldNode, newDir, newName) {
      var oldPath = NODEFS.realPath(oldNode);
      var newPath = PATH.join2(NODEFS.realPath(newDir), newName);

      try {
        fs.renameSync(oldPath, newPath);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    unlink: function unlink(parent, name) {
      var path = PATH.join2(NODEFS.realPath(parent), name);

      try {
        fs.unlinkSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    rmdir: function rmdir(parent, name) {
      var path = PATH.join2(NODEFS.realPath(parent), name);

      try {
        fs.rmdirSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    readdir: function readdir(node) {
      var path = NODEFS.realPath(node);

      try {
        return fs.readdirSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    symlink: function symlink(parent, newName, oldPath) {
      var newPath = PATH.join2(NODEFS.realPath(parent), newName);

      try {
        fs.symlinkSync(oldPath, newPath);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    readlink: function readlink(node) {
      var path = NODEFS.realPath(node);

      try {
        path = fs.readlinkSync(path);
        path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
        return path;
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    }
  },
  stream_ops: {
    open: function open(stream) {
      var path = NODEFS.realPath(stream.node);

      try {
        if (FS.isFile(stream.node.mode)) {
          stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    close: function close(stream) {
      try {
        if (FS.isFile(stream.node.mode) && stream.nfd) {
          fs.closeSync(stream.nfd);
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    },
    read: function read(stream, buffer, offset, length, position) {
      if (length === 0) return 0;
      var nbuffer = new Buffer(length);
      var res;

      try {
        res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
      } catch (e) {
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }

      if (res > 0) {
        for (var i = 0; i < res; i++) {
          buffer[offset + i] = nbuffer[i];
        }
      }

      return res;
    },
    write: function write(stream, buffer, offset, length, position) {
      var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
      var res;

      try {
        res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
      } catch (e) {
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }

      return res;
    },
    llseek: function llseek(stream, offset, whence) {
      var position = offset;

      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          try {
            var stat = fs.fstatSync(stream.nfd);
            position += stat.size;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }
      }

      if (position < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      }

      return position;
    }
  }
};
var WORKERFS = {
  DIR_MODE: 16895,
  FILE_MODE: 33279,
  reader: null,
  mount: function mount(_mount4) {
    assert(ENVIRONMENT_IS_WORKER);
    if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
    var root = WORKERFS.createNode(null, "/", WORKERFS.DIR_MODE, 0);
    var createdParents = {};

    function ensureParent(path) {
      var parts = path.split("/");
      var parent = root;

      for (var i = 0; i < parts.length - 1; i++) {
        var curr = parts.slice(0, i + 1).join("/");

        if (!createdParents[curr]) {
          createdParents[curr] = WORKERFS.createNode(parent, curr, WORKERFS.DIR_MODE, 0);
        }

        parent = createdParents[curr];
      }

      return parent;
    }

    function base(path) {
      var parts = path.split("/");
      return parts[parts.length - 1];
    }

    Array.prototype.forEach.call(_mount4.opts["files"] || [], function (file) {
      WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
    });
    (_mount4.opts["blobs"] || []).forEach(function (obj) {
      WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
    });
    (_mount4.opts["packages"] || []).forEach(function (pack) {
      pack["metadata"].files.forEach(function (file) {
        var name = file.filename.substr(1);
        WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end));
      });
    });
    return root;
  },
  createNode: function createNode(parent, name, mode, dev, contents, mtime) {
    var node = FS.createNode(parent, name, mode);
    node.mode = mode;
    node.node_ops = WORKERFS.node_ops;
    node.stream_ops = WORKERFS.stream_ops;
    node.timestamp = (mtime || new Date()).getTime();
    assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);

    if (mode === WORKERFS.FILE_MODE) {
      node.size = contents.size;
      node.contents = contents;
    } else {
      node.size = 4096;
      node.contents = {};
    }

    if (parent) {
      parent.contents[name] = node;
    }

    return node;
  },
  node_ops: {
    getattr: function getattr(node) {
      return {
        dev: 1,
        ino: undefined,
        mode: node.mode,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: undefined,
        size: node.size,
        atime: new Date(node.timestamp),
        mtime: new Date(node.timestamp),
        ctime: new Date(node.timestamp),
        blksize: 4096,
        blocks: Math.ceil(node.size / 4096)
      };
    },
    setattr: function setattr(node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode;
      }

      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp;
      }
    },
    lookup: function lookup(parent, name) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    },
    mknod: function mknod(parent, name, mode, dev) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    },
    rename: function rename(oldNode, newDir, newName) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    },
    unlink: function unlink(parent, name) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    },
    rmdir: function rmdir(parent, name) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    },
    readdir: function readdir(node) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    },
    symlink: function symlink(parent, newName, oldPath) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    },
    readlink: function readlink(node) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }
  },
  stream_ops: {
    read: function read(stream, buffer, offset, length, position) {
      if (position >= stream.node.size) return 0;
      var chunk = stream.node.contents.slice(position, position + length);
      var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
      buffer.set(new Uint8Array(ab), offset);
      return chunk.size;
    },
    write: function write(stream, buffer, offset, length, position) {
      throw new FS.ErrnoError(ERRNO_CODES.EIO);
    },
    llseek: function llseek(stream, offset, whence) {
      var position = offset;

      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.size;
        }
      }

      if (position < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      }

      return position;
    }
  }
};

var _stdin = allocate(1, "i32*", ALLOC_STATIC);

var _stdout = allocate(1, "i32*", ALLOC_STATIC);

var _stderr = allocate(1, "i32*", ALLOC_STATIC);

var FS = {
  root: null,
  mounts: [],
  devices: [null],
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  trackingDelegate: {},
  tracking: {
    openFlags: {
      READ: 1,
      WRITE: 2
    }
  },
  ErrnoError: null,
  genericErrors: {},
  filesystems: null,
  handleFSError: function handleFSError(e) {
    if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
    return ___setErrNo(e.errno);
  },
  lookupPath: function lookupPath(path, opts) {
    path = PATH.resolve(FS.cwd(), path);
    opts = opts || {};
    if (!path) return {
      path: "",
      node: null
    };
    var defaults = {
      follow_mount: true,
      recurse_count: 0
    };

    for (var key in defaults) {
      if (opts[key] === undefined) {
        opts[key] = defaults[key];
      }
    }

    if (opts.recurse_count > 8) {
      throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
    }

    var parts = PATH.normalizeArray(path.split("/").filter(function (p) {
      return !!p;
    }), false);
    var current = FS.root;
    var current_path = "/";

    for (var i = 0; i < parts.length; i++) {
      var islast = i === parts.length - 1;

      if (islast && opts.parent) {
        break;
      }

      current = FS.lookupNode(current, parts[i]);
      current_path = PATH.join2(current_path, parts[i]);

      if (FS.isMountpoint(current)) {
        if (!islast || islast && opts.follow_mount) {
          current = current.mounted.root;
        }
      }

      if (!islast || opts.follow) {
        var count = 0;

        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path);
          current_path = PATH.resolve(PATH.dirname(current_path), link);
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count
          });
          current = lookup.node;

          if (count++ > 40) {
            throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
          }
        }
      }
    }

    return {
      path: current_path,
      node: current
    };
  },
  getPath: function getPath(node) {
    var path;

    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
      }

      path = path ? node.name + "/" + path : node.name;
      node = node.parent;
    }
  },
  hashName: function hashName(parentid, name) {
    var hash = 0;

    for (var i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
    }

    return (parentid + hash >>> 0) % FS.nameTable.length;
  },
  hashAddNode: function hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode: function hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);

    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];

      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }

        current = current.name_next;
      }
    }
  },
  lookupNode: function lookupNode(parent, name) {
    var err = FS.mayLookup(parent);

    if (err) {
      throw new FS.ErrnoError(err, parent);
    }

    var hash = FS.hashName(parent.id, name);

    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;

      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }

    return FS.lookup(parent, name);
  },
  createNode: function createNode(parent, name, mode, rdev) {
    if (!FS.FSNode) {
      FS.FSNode = function (parent, name, mode, rdev) {
        if (!parent) {
          parent = this;
        }

        this.parent = parent;
        this.mount = parent.mount;
        this.mounted = null;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.node_ops = {};
        this.stream_ops = {};
        this.rdev = rdev;
      };

      FS.FSNode.prototype = {};
      var readMode = 292 | 73;
      var writeMode = 146;
      Object.defineProperties(FS.FSNode.prototype, {
        read: {
          get: function get() {
            return (this.mode & readMode) === readMode;
          },
          set: function set(val) {
            val ? this.mode |= readMode : this.mode &= ~readMode;
          }
        },
        write: {
          get: function get() {
            return (this.mode & writeMode) === writeMode;
          },
          set: function set(val) {
            val ? this.mode |= writeMode : this.mode &= ~writeMode;
          }
        },
        isFolder: {
          get: function get() {
            return FS.isDir(this.mode);
          }
        },
        isDevice: {
          get: function get() {
            return FS.isChrdev(this.mode);
          }
        }
      });
    }

    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode: function destroyNode(node) {
    FS.hashRemoveNode(node);
  },
  isRoot: function isRoot(node) {
    return node === node.parent;
  },
  isMountpoint: function isMountpoint(node) {
    return !!node.mounted;
  },
  isFile: function isFile(mode) {
    return (mode & 61440) === 32768;
  },
  isDir: function isDir(mode) {
    return (mode & 61440) === 16384;
  },
  isLink: function isLink(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev: function isChrdev(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev: function isBlkdev(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO: function isFIFO(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket: function isSocket(mode) {
    return (mode & 49152) === 49152;
  },
  flagModes: {
    "r": 0,
    "rs": 1052672,
    "r+": 2,
    "w": 577,
    "wx": 705,
    "xw": 705,
    "w+": 578,
    "wx+": 706,
    "xw+": 706,
    "a": 1089,
    "ax": 1217,
    "xa": 1217,
    "a+": 1090,
    "ax+": 1218,
    "xa+": 1218
  },
  modeStringToFlags: function modeStringToFlags(str) {
    var flags = FS.flagModes[str];

    if (typeof flags === "undefined") {
      throw new Error("Unknown file open mode: " + str);
    }

    return flags;
  },
  flagsToPermissionString: function flagsToPermissionString(flag) {
    var perms = ["r", "w", "rw"][flag & 3];

    if (flag & 512) {
      perms += "w";
    }

    return perms;
  },
  nodePermissions: function nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }

    if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
      return ERRNO_CODES.EACCES;
    } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
      return ERRNO_CODES.EACCES;
    } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
      return ERRNO_CODES.EACCES;
    }

    return 0;
  },
  mayLookup: function mayLookup(dir) {
    var err = FS.nodePermissions(dir, "x");
    if (err) return err;
    if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES;
    return 0;
  },
  mayCreate: function mayCreate(dir, name) {
    try {
      var node = FS.lookupNode(dir, name);
      return ERRNO_CODES.EEXIST;
    } catch (e) {}

    return FS.nodePermissions(dir, "wx");
  },
  mayDelete: function mayDelete(dir, name, isdir) {
    var node;

    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }

    var err = FS.nodePermissions(dir, "wx");

    if (err) {
      return err;
    }

    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return ERRNO_CODES.ENOTDIR;
      }

      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return ERRNO_CODES.EBUSY;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return ERRNO_CODES.EISDIR;
      }
    }

    return 0;
  },
  mayOpen: function mayOpen(node, flags) {
    if (!node) {
      return ERRNO_CODES.ENOENT;
    }

    if (FS.isLink(node.mode)) {
      return ERRNO_CODES.ELOOP;
    } else if (FS.isDir(node.mode)) {
      if ((flags & 2097155) !== 0 || flags & 512) {
        return ERRNO_CODES.EISDIR;
      }
    }

    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  },
  MAX_OPEN_FDS: 4096,
  nextfd: function nextfd(fd_start, fd_end) {
    fd_start = fd_start || 0;
    fd_end = fd_end || FS.MAX_OPEN_FDS;

    for (var fd = fd_start; fd <= fd_end; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }

    throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
  },
  getStream: function getStream(fd) {
    return FS.streams[fd];
  },
  createStream: function createStream(stream, fd_start, fd_end) {
    if (!FS.FSStream) {
      FS.FSStream = function () {};

      FS.FSStream.prototype = {};
      Object.defineProperties(FS.FSStream.prototype, {
        object: {
          get: function get() {
            return this.node;
          },
          set: function set(val) {
            this.node = val;
          }
        },
        isRead: {
          get: function get() {
            return (this.flags & 2097155) !== 1;
          }
        },
        isWrite: {
          get: function get() {
            return (this.flags & 2097155) !== 0;
          }
        },
        isAppend: {
          get: function get() {
            return this.flags & 1024;
          }
        }
      });
    }

    var newStream = new FS.FSStream();

    for (var p in stream) {
      newStream[p] = stream[p];
    }

    stream = newStream;
    var fd = FS.nextfd(fd_start, fd_end);
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream: function closeStream(fd) {
    FS.streams[fd] = null;
  },
  chrdev_stream_ops: {
    open: function open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;

      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
    },
    llseek: function llseek() {
      throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
    }
  },
  major: function major(dev) {
    return dev >> 8;
  },
  minor: function minor(dev) {
    return dev & 255;
  },
  makedev: function makedev(ma, mi) {
    return ma << 8 | mi;
  },
  registerDevice: function registerDevice(dev, ops) {
    FS.devices[dev] = {
      stream_ops: ops
    };
  },
  getDevice: function getDevice(dev) {
    return FS.devices[dev];
  },
  getMounts: function getMounts(mount) {
    var mounts = [];
    var check = [mount];

    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push.apply(check, m.mounts);
    }

    return mounts;
  },
  syncfs: function syncfs(populate, callback) {
    if (typeof populate === "function") {
      callback = populate;
      populate = false;
    }

    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;

    function done(err) {
      if (err) {
        if (!done.errored) {
          done.errored = true;
          return callback(err);
        }

        return;
      }

      if (++completed >= mounts.length) {
        callback(null);
      }
    }

    mounts.forEach(function (mount) {
      if (!mount.type.syncfs) {
        return done(null);
      }

      mount.type.syncfs(mount, populate, done);
    });
  },
  mount: function mount(type, opts, mountpoint) {
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;

    if (root && FS.root) {
      throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, {
        follow_mount: false
      });
      mountpoint = lookup.path;
      node = lookup.node;

      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
      }

      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
      }
    }

    var mount = {
      type: type,
      opts: opts,
      mountpoint: mountpoint,
      mounts: []
    };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;

    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;

      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }

    return mountRoot;
  },
  unmount: function unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, {
      follow_mount: false
    });

    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    Object.keys(FS.nameTable).forEach(function (hash) {
      var current = FS.nameTable[hash];

      while (current) {
        var next = current.name_next;

        if (mounts.indexOf(current.mount) !== -1) {
          FS.destroyNode(current);
        }

        current = next;
      }
    });
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    assert(idx !== -1);
    node.mount.mounts.splice(idx, 1);
  },
  lookup: function lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod: function mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);

    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    var err = FS.mayCreate(parent, name);

    if (err) {
      throw new FS.ErrnoError(err);
    }

    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  create: function create(path, mode) {
    mode = mode !== undefined ? mode : 438;
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir: function mkdir(path, mode) {
    mode = mode !== undefined ? mode : 511;
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdev: function mkdev(path, mode, dev) {
    if (typeof dev === "undefined") {
      dev = mode;
      mode = 438;
    }

    mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink: function symlink(oldpath, newpath) {
    if (!PATH.resolve(oldpath)) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    }

    var lookup = FS.lookupPath(newpath, {
      parent: true
    });
    var parent = lookup.node;

    if (!parent) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    }

    var newname = PATH.basename(newpath);
    var err = FS.mayCreate(parent, newname);

    if (err) {
      throw new FS.ErrnoError(err);
    }

    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename: function rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;

    try {
      lookup = FS.lookupPath(old_path, {
        parent: true
      });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, {
        parent: true
      });
      new_dir = lookup.node;
    } catch (e) {
      throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
    }

    if (!old_dir || !new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT);

    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
    }

    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH.relative(old_path, new_dirname);

    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    relative = PATH.relative(new_path, old_dirname);

    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
    }

    var new_node;

    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}

    if (old_node === new_node) {
      return;
    }

    var isdir = FS.isDir(old_node.mode);
    var err = FS.mayDelete(old_dir, old_name, isdir);

    if (err) {
      throw new FS.ErrnoError(err);
    }

    err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);

    if (err) {
      throw new FS.ErrnoError(err);
    }

    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
      throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
    }

    if (new_dir !== old_dir) {
      err = FS.nodePermissions(old_dir, "w");

      if (err) {
        throw new FS.ErrnoError(err);
      }
    }

    try {
      if (FS.trackingDelegate["willMovePath"]) {
        FS.trackingDelegate["willMovePath"](old_path, new_path);
      }
    } catch (e) {
      console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
    }

    FS.hashRemoveNode(old_node);

    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }

    try {
      if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
    } catch (e) {
      console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
    }
  },
  rmdir: function rmdir(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var err = FS.mayDelete(parent, name, true);

    if (err) {
      throw new FS.ErrnoError(err);
    }

    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
    }

    try {
      if (FS.trackingDelegate["willDeletePath"]) {
        FS.trackingDelegate["willDeletePath"](path);
      }
    } catch (e) {
      console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
    }

    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);

    try {
      if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
    } catch (e) {
      console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
    }
  },
  readdir: function readdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;

    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
    }

    return node.node_ops.readdir(node);
  },
  unlink: function unlink(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var err = FS.mayDelete(parent, name, false);

    if (err) {
      if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
      throw new FS.ErrnoError(err);
    }

    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
    }

    try {
      if (FS.trackingDelegate["willDeletePath"]) {
        FS.trackingDelegate["willDeletePath"](path);
      }
    } catch (e) {
      console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
    }

    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);

    try {
      if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
    } catch (e) {
      console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
    }
  },
  readlink: function readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;

    if (!link) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    }

    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
  },
  stat: function stat(path, dontFollow) {
    var lookup = FS.lookupPath(path, {
      follow: !dontFollow
    });
    var node = lookup.node;

    if (!node) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    }

    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    return node.node_ops.getattr(node);
  },
  lstat: function lstat(path) {
    return FS.stat(path, true);
  },
  chmod: function chmod(path, mode, dontFollow) {
    var node;

    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }

    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    node.node_ops.setattr(node, {
      mode: mode & 4095 | node.mode & ~4095,
      timestamp: Date.now()
    });
  },
  lchmod: function lchmod(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod: function fchmod(fd, mode) {
    var stream = FS.getStream(fd);

    if (!stream) {
      throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    }

    FS.chmod(stream.node, mode);
  },
  chown: function chown(path, uid, gid, dontFollow) {
    var node;

    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }

    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    node.node_ops.setattr(node, {
      timestamp: Date.now()
    });
  },
  lchown: function lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown: function fchown(fd, uid, gid) {
    var stream = FS.getStream(fd);

    if (!stream) {
      throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    }

    FS.chown(stream.node, uid, gid);
  },
  truncate: function truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    var node;

    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, {
        follow: true
      });
      node = lookup.node;
    } else {
      node = path;
    }

    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(ERRNO_CODES.EPERM);
    }

    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
    }

    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    var err = FS.nodePermissions(node, "w");

    if (err) {
      throw new FS.ErrnoError(err);
    }

    node.node_ops.setattr(node, {
      size: len,
      timestamp: Date.now()
    });
  },
  ftruncate: function ftruncate(fd, len) {
    var stream = FS.getStream(fd);

    if (!stream) {
      throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    }

    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    FS.truncate(stream.node, len);
  },
  utime: function utime(path, atime, mtime) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    node.node_ops.setattr(node, {
      timestamp: Math.max(atime, mtime)
    });
  },
  open: function open(path, flags, mode, fd_start, fd_end) {
    if (path === "") {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    }

    flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
    mode = typeof mode === "undefined" ? 438 : mode;

    if (flags & 64) {
      mode = mode & 4095 | 32768;
    } else {
      mode = 0;
    }

    var node;

    if (typeof path === "object") {
      node = path;
    } else {
      path = PATH.normalize(path);

      try {
        var lookup = FS.lookupPath(path, {
          follow: !(flags & 131072)
        });
        node = lookup.node;
      } catch (e) {}
    }

    var created = false;

    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
        }
      } else {
        node = FS.mknod(path, mode, 0);
        created = true;
      }
    }

    if (!node) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
    }

    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }

    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
    }

    if (!created) {
      var err = FS.mayOpen(node, flags);

      if (err) {
        throw new FS.ErrnoError(err);
      }
    }

    if (flags & 512) {
      FS.truncate(node, 0);
    }

    flags &= ~(128 | 512);
    var stream = FS.createStream({
      node: node,
      path: FS.getPath(node),
      flags: flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      ungotten: [],
      error: false
    }, fd_start, fd_end);

    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }

    if (Module["logReadFiles"] && !(flags & 1)) {
      if (!FS.readFiles) FS.readFiles = {};

      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
        Module["printErr"]("read file: " + path);
      }
    }

    try {
      if (FS.trackingDelegate["onOpenFile"]) {
        var trackingFlags = 0;

        if ((flags & 2097155) !== 1) {
          trackingFlags |= FS.tracking.openFlags.READ;
        }

        if ((flags & 2097155) !== 0) {
          trackingFlags |= FS.tracking.openFlags.WRITE;
        }

        FS.trackingDelegate["onOpenFile"](path, trackingFlags);
      }
    } catch (e) {
      console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
    }

    return stream;
  },
  close: function close(stream) {
    if (stream.getdents) stream.getdents = null;

    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
  },
  llseek: function llseek(stream, offset, whence) {
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
    }

    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read: function read(stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    }

    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
    }

    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    var seeking = true;

    if (typeof position === "undefined") {
      position = stream.position;
      seeking = false;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
    }

    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write: function write(stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    }

    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
    }

    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    if (stream.flags & 1024) {
      FS.llseek(stream, 0, 2);
    }

    var seeking = true;

    if (typeof position === "undefined") {
      position = stream.position;
      seeking = false;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
    }

    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
    if (!seeking) stream.position += bytesWritten;

    try {
      if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
    } catch (e) {
      console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + e.message);
    }

    return bytesWritten;
  },
  allocate: function allocate(stream, offset, length) {
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }

    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    }

    if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
    }

    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
    }

    stream.stream_ops.allocate(stream, offset, length);
  },
  mmap: function mmap(stream, buffer, offset, length, position, prot, flags) {
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(ERRNO_CODES.EACCES);
    }

    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
    }

    return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
  },
  msync: function msync(stream, buffer, offset, length, mmapFlags) {
    if (!stream || !stream.stream_ops.msync) {
      return 0;
    }

    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  munmap: function munmap(stream) {
    return 0;
  },
  ioctl: function ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
    }

    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile: function readFile(path, opts) {
    opts = opts || {};
    opts.flags = opts.flags || "r";
    opts.encoding = opts.encoding || "binary";

    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error('Invalid encoding type "' + opts.encoding + '"');
    }

    var ret;
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);

    if (opts.encoding === "utf8") {
      ret = UTF8ArrayToString(buf, 0);
    } else if (opts.encoding === "binary") {
      ret = buf;
    }

    FS.close(stream);
    return ret;
  },
  writeFile: function writeFile(path, data, opts) {
    opts = opts || {};
    opts.flags = opts.flags || "w";
    opts.encoding = opts.encoding || "utf8";

    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error('Invalid encoding type "' + opts.encoding + '"');
    }

    var stream = FS.open(path, opts.flags, opts.mode);

    if (opts.encoding === "utf8") {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
      FS.write(stream, buf, 0, actualNumBytes, 0, opts.canOwn);
    } else if (opts.encoding === "binary") {
      FS.write(stream, data, 0, data.length, 0, opts.canOwn);
    }

    FS.close(stream);
  },
  cwd: function cwd() {
    return FS.currentPath;
  },
  chdir: function chdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });

    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
    }

    var err = FS.nodePermissions(lookup.node, "x");

    if (err) {
      throw new FS.ErrnoError(err);
    }

    FS.currentPath = lookup.path;
  },
  createDefaultDirectories: function createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices: function createDefaultDevices() {
    FS.mkdir("/dev");
    FS.registerDevice(FS.makedev(1, 3), {
      read: function read() {
        return 0;
      },
      write: function write(stream, buffer, offset, length, pos) {
        return length;
      }
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    var random_device;

    if (typeof crypto !== "undefined") {
      var randomBuffer = new Uint8Array(1);

      random_device = function random_device() {
        crypto.getRandomValues(randomBuffer);
        return randomBuffer[0];
      };
    } else if (ENVIRONMENT_IS_NODE) {
      random_device = function random_device() {
        return __webpack_require__("HEbwG9").randomBytes(1)[0];
      };
    } else {
      random_device = function random_device() {
        return Math.random() * 256 | 0;
      };
    }

    FS.createDevice("/dev", "random", random_device);
    FS.createDevice("/dev", "urandom", random_device);
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories: function createSpecialDirectories() {
    FS.mkdir("/proc");
    FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount({
      mount: function mount() {
        var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
        node.node_ops = {
          lookup: function lookup(parent, name) {
            var fd = +name;
            var stream = FS.getStream(fd);
            if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
            var ret = {
              parent: null,
              mount: {
                mountpoint: "fake"
              },
              node_ops: {
                readlink: function readlink() {
                  return stream.path;
                }
              }
            };
            ret.parent = ret;
            return ret;
          }
        };
        return node;
      }
    }, {}, "/proc/self/fd");
  },
  createStandardStreams: function createStandardStreams() {
    if (Module["stdin"]) {
      FS.createDevice("/dev", "stdin", Module["stdin"]);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }

    if (Module["stdout"]) {
      FS.createDevice("/dev", "stdout", null, Module["stdout"]);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }

    if (Module["stderr"]) {
      FS.createDevice("/dev", "stderr", null, Module["stderr"]);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }

    var stdin = FS.open("/dev/stdin", "r");
    assert(stdin.fd === 0, "invalid handle for stdin (" + stdin.fd + ")");
    var stdout = FS.open("/dev/stdout", "w");
    assert(stdout.fd === 1, "invalid handle for stdout (" + stdout.fd + ")");
    var stderr = FS.open("/dev/stderr", "w");
    assert(stderr.fd === 2, "invalid handle for stderr (" + stderr.fd + ")");
  },
  ensureErrnoError: function ensureErrnoError() {
    if (FS.ErrnoError) return;

    FS.ErrnoError = function ErrnoError(errno, node) {
      this.node = node;

      this.setErrno = function (errno) {
        this.errno = errno;

        for (var key in ERRNO_CODES) {
          if (ERRNO_CODES[key] === errno) {
            this.code = key;
            break;
          }
        }
      };

      this.setErrno(errno);
      this.message = ERRNO_MESSAGES[errno];
    };

    FS.ErrnoError.prototype = new Error();
    FS.ErrnoError.prototype.constructor = FS.ErrnoError;
    [ERRNO_CODES.ENOENT].forEach(function (code) {
      FS.genericErrors[code] = new FS.ErrnoError(code);
      FS.genericErrors[code].stack = "<generic error, no stack>";
    });
  },
  staticInit: function staticInit() {
    FS.ensureErrnoError();
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = {
      "MEMFS": MEMFS,
      "IDBFS": IDBFS,
      "NODEFS": NODEFS,
      "WORKERFS": WORKERFS
    };
  },
  init: function init(input, output, error) {
    assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
    FS.init.initialized = true;
    FS.ensureErrnoError();
    Module["stdin"] = input || Module["stdin"];
    Module["stdout"] = output || Module["stdout"];
    Module["stderr"] = error || Module["stderr"];
    FS.createStandardStreams();
  },
  quit: function quit() {
    FS.init.initialized = false;
    var fflush = Module["_fflush"];
    if (fflush) fflush(0);

    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i];

      if (!stream) {
        continue;
      }

      FS.close(stream);
    }
  },
  getMode: function getMode(canRead, canWrite) {
    var mode = 0;
    if (canRead) mode |= 292 | 73;
    if (canWrite) mode |= 146;
    return mode;
  },
  joinPath: function joinPath(parts, forceRelative) {
    var path = PATH.join.apply(null, parts);
    if (forceRelative && path[0] == "/") path = path.substr(1);
    return path;
  },
  absolutePath: function absolutePath(relative, base) {
    return PATH.resolve(base, relative);
  },
  standardizePath: function standardizePath(path) {
    return PATH.normalize(path);
  },
  findObject: function findObject(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);

    if (ret.exists) {
      return ret.object;
    } else {
      ___setErrNo(ret.error);

      return null;
    }
  },
  analyzePath: function analyzePath(path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      path = lookup.path;
    } catch (e) {}

    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    };

    try {
      var lookup = FS.lookupPath(path, {
        parent: true
      });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }

    return ret;
  },
  createFolder: function createFolder(parent, name, canRead, canWrite) {
    var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
    var mode = FS.getMode(canRead, canWrite);
    return FS.mkdir(path, mode);
  },
  createPath: function createPath(parent, path, canRead, canWrite) {
    parent = typeof parent === "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();

    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);

      try {
        FS.mkdir(current);
      } catch (e) {}

      parent = current;
    }

    return current;
  },
  createFile: function createFile(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
    var mode = FS.getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile: function createDataFile(parent, name, data, canRead, canWrite, canOwn) {
    var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
    var mode = FS.getMode(canRead, canWrite);
    var node = FS.create(path, mode);

    if (data) {
      if (typeof data === "string") {
        var arr = new Array(data.length);

        for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);

        data = arr;
      }

      FS.chmod(node, mode | 146);
      var stream = FS.open(node, "w");
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }

    return node;
  },
  createDevice: function createDevice(parent, name, input, output) {
    var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
    var mode = FS.getMode(!!input, !!output);
    if (!FS.createDevice.major) FS.createDevice.major = 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    FS.registerDevice(dev, {
      open: function open(stream) {
        stream.seekable = false;
      },
      close: function close(stream) {
        if (output && output.buffer && output.buffer.length) {
          output(10);
        }
      },
      read: function read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;

        for (var i = 0; i < length; i++) {
          var result;

          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }

          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
          }

          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }

        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }

        return bytesRead;
      },
      write: function write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
        }

        if (length) {
          stream.node.timestamp = Date.now();
        }

        return i;
      }
    });
    return FS.mkdev(path, mode, dev);
  },
  createLink: function createLink(parent, name, target, canRead, canWrite) {
    var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
    return FS.symlink(target, path);
  },
  forceLoadFile: function forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    var success = true;

    if (typeof XMLHttpRequest !== "undefined") {
      throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else if (Module["read"]) {
      try {
        obj.contents = intArrayFromString(Module["read"](obj.url), true);
        obj.usedBytes = obj.contents.length;
      } catch (e) {
        success = false;
      }
    } else {
      throw new Error("Cannot load without read() or XMLHttpRequest.");
    }

    if (!success) ___setErrNo(ERRNO_CODES.EIO);
    return success;
  },
  createLazyFile: function createLazyFile(parent, name, url, canRead, canWrite) {
    function LazyUint8Array() {
      this.lengthKnown = false;
      this.chunks = [];
    }

    LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
      if (idx > this.length - 1 || idx < 0) {
        return undefined;
      }

      var chunkOffset = idx % this.chunkSize;
      var chunkNum = idx / this.chunkSize | 0;
      return this.getter(chunkNum)[chunkOffset];
    };

    LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
      this.getter = getter;
    };

    LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
      var xhr = new XMLHttpRequest();
      xhr.open("HEAD", url, false);
      xhr.send(null);
      if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
      var datalength = Number(xhr.getResponseHeader("Content-length"));
      var header;
      var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
      var chunkSize = 1024 * 1024;
      if (!hasByteServing) chunkSize = datalength;

      var doXHR = function doXHR(from, to) {
        if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
        if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
        if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";

        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }

        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);

        if (xhr.response !== undefined) {
          return new Uint8Array(xhr.response || []);
        } else {
          return intArrayFromString(xhr.responseText || "", true);
        }
      };

      var lazyArray = this;
      lazyArray.setDataGetter(function (chunkNum) {
        var start = chunkNum * chunkSize;
        var end = (chunkNum + 1) * chunkSize - 1;
        end = Math.min(end, datalength - 1);

        if (typeof lazyArray.chunks[chunkNum] === "undefined") {
          lazyArray.chunks[chunkNum] = doXHR(start, end);
        }

        if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
        return lazyArray.chunks[chunkNum];
      });
      this._length = datalength;
      this._chunkSize = chunkSize;
      this.lengthKnown = true;
    };

    if (typeof XMLHttpRequest !== "undefined") {
      if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
      var lazyArray = new LazyUint8Array();
      Object.defineProperty(lazyArray, "length", {
        get: function get() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }

          return this._length;
        }
      });
      Object.defineProperty(lazyArray, "chunkSize", {
        get: function get() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }

          return this._chunkSize;
        }
      });
      var properties = {
        isDevice: false,
        contents: lazyArray
      };
    } else {
      var properties = {
        isDevice: false,
        url: url
      };
    }

    var node = FS.createFile(parent, name, properties, canRead, canWrite);

    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }

    Object.defineProperty(node, "usedBytes", {
      get: function get() {
        return this.contents.length;
      }
    });
    var stream_ops = {};
    var keys = Object.keys(node.stream_ops);
    keys.forEach(function (key) {
      var fn = node.stream_ops[key];

      stream_ops[key] = function forceLoadLazyFile() {
        if (!FS.forceLoadFile(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO);
        }

        return fn.apply(null, arguments);
      };
    });

    stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
      if (!FS.forceLoadFile(node)) {
        throw new FS.ErrnoError(ERRNO_CODES.EIO);
      }

      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      assert(size >= 0);

      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i);
        }
      }

      return size;
    };

    node.stream_ops = stream_ops;
    return node;
  },
  createPreloadedFile: function createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
    Browser.init();
    var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
    var dep = getUniqueRunDependency("cp " + fullname);

    function processData(byteArray) {
      function finish(byteArray) {
        if (preFinish) preFinish();

        if (!dontCreateFile) {
          FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
        }

        if (onload) onload();
        removeRunDependency(dep);
      }

      var handled = false;
      Module["preloadPlugins"].forEach(function (plugin) {
        if (handled) return;

        if (plugin["canHandle"](fullname)) {
          plugin["handle"](byteArray, fullname, finish, function () {
            if (onerror) onerror();
            removeRunDependency(dep);
          });
          handled = true;
        }
      });
      if (!handled) finish(byteArray);
    }

    addRunDependency(dep);

    if (typeof url == "string") {
      Browser.asyncLoad(url, function (byteArray) {
        processData(byteArray);
      }, onerror);
    } else {
      processData(url);
    }
  },
  indexedDB: function indexedDB() {
    return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  },
  DB_NAME: function DB_NAME() {
    return "EM_FS_" + window.location.pathname;
  },
  DB_VERSION: 20,
  DB_STORE_NAME: "FILE_DATA",
  saveFilesToDB: function saveFilesToDB(paths, onload, onerror) {
    onload = onload || function () {};

    onerror = onerror || function () {};

    var indexedDB = FS.indexedDB();

    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
    } catch (e) {
      return onerror(e);
    }

    openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
      console.log("creating db");
      var db = openRequest.result;
      db.createObjectStore(FS.DB_STORE_NAME);
    };

    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result;
      var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
      var files = transaction.objectStore(FS.DB_STORE_NAME);
      var ok = 0,
          fail = 0,
          total = paths.length;

      function finish() {
        if (fail == 0) onload();else onerror();
      }

      paths.forEach(function (path) {
        var putRequest = files.put(FS.analyzePath(path).object.contents, path);

        putRequest.onsuccess = function putRequest_onsuccess() {
          ok++;
          if (ok + fail == total) finish();
        };

        putRequest.onerror = function putRequest_onerror() {
          fail++;
          if (ok + fail == total) finish();
        };
      });
      transaction.onerror = onerror;
    };

    openRequest.onerror = onerror;
  },
  loadFilesFromDB: function loadFilesFromDB(paths, onload, onerror) {
    onload = onload || function () {};

    onerror = onerror || function () {};

    var indexedDB = FS.indexedDB();

    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
    } catch (e) {
      return onerror(e);
    }

    openRequest.onupgradeneeded = onerror;

    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result;

      try {
        var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
      } catch (e) {
        onerror(e);
        return;
      }

      var files = transaction.objectStore(FS.DB_STORE_NAME);
      var ok = 0,
          fail = 0,
          total = paths.length;

      function finish() {
        if (fail == 0) onload();else onerror();
      }

      paths.forEach(function (path) {
        var getRequest = files.get(path);

        getRequest.onsuccess = function getRequest_onsuccess() {
          if (FS.analyzePath(path).exists) {
            FS.unlink(path);
          }

          FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
          ok++;
          if (ok + fail == total) finish();
        };

        getRequest.onerror = function getRequest_onerror() {
          fail++;
          if (ok + fail == total) finish();
        };
      });
      transaction.onerror = onerror;
    };

    openRequest.onerror = onerror;
  }
};
var SYSCALLS = {
  DEFAULT_POLLMASK: 5,
  mappings: {},
  umask: 511,
  calculateAt: function calculateAt(dirfd, path) {
    if (path[0] !== "/") {
      var dir;

      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = FS.getStream(dirfd);
        if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        dir = dirstream.path;
      }

      path = PATH.join2(dir, path);
    }

    return path;
  },
  doStat: function doStat(func, path, buf) {
    try {
      var stat = func(path);
    } catch (e) {
      if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
        return -ERRNO_CODES.ENOTDIR;
      }

      throw e;
    }

    HEAP32[buf >> 2] = stat.dev;
    HEAP32[buf + 4 >> 2] = 0;
    HEAP32[buf + 8 >> 2] = stat.ino;
    HEAP32[buf + 12 >> 2] = stat.mode;
    HEAP32[buf + 16 >> 2] = stat.nlink;
    HEAP32[buf + 20 >> 2] = stat.uid;
    HEAP32[buf + 24 >> 2] = stat.gid;
    HEAP32[buf + 28 >> 2] = stat.rdev;
    HEAP32[buf + 32 >> 2] = 0;
    HEAP32[buf + 36 >> 2] = stat.size;
    HEAP32[buf + 40 >> 2] = 4096;
    HEAP32[buf + 44 >> 2] = stat.blocks;
    HEAP32[buf + 48 >> 2] = stat.atime.getTime() / 1e3 | 0;
    HEAP32[buf + 52 >> 2] = 0;
    HEAP32[buf + 56 >> 2] = stat.mtime.getTime() / 1e3 | 0;
    HEAP32[buf + 60 >> 2] = 0;
    HEAP32[buf + 64 >> 2] = stat.ctime.getTime() / 1e3 | 0;
    HEAP32[buf + 68 >> 2] = 0;
    HEAP32[buf + 72 >> 2] = stat.ino;
    return 0;
  },
  doMsync: function doMsync(addr, stream, len, flags) {
    var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
    FS.msync(stream, buffer, 0, len, flags);
  },
  doMkdir: function doMkdir(path, mode) {
    path = PATH.normalize(path);
    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
    FS.mkdir(path, mode, 0);
    return 0;
  },
  doMknod: function doMknod(path, mode, dev) {
    switch (mode & 61440) {
      case 32768:
      case 8192:
      case 24576:
      case 4096:
      case 49152:
        break;

      default:
        return -ERRNO_CODES.EINVAL;
    }

    FS.mknod(path, mode, dev);
    return 0;
  },
  doReadlink: function doReadlink(path, buf, bufsize) {
    if (bufsize <= 0) return -ERRNO_CODES.EINVAL;
    var ret = FS.readlink(path);
    ret = ret.slice(0, Math.max(0, bufsize));
    writeStringToMemory(ret, buf, true);
    return ret.length;
  },
  doAccess: function doAccess(path, amode) {
    if (amode & ~7) {
      return -ERRNO_CODES.EINVAL;
    }

    var node;
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    node = lookup.node;
    var perms = "";
    if (amode & 4) perms += "r";
    if (amode & 2) perms += "w";
    if (amode & 1) perms += "x";

    if (perms && FS.nodePermissions(node, perms)) {
      return -ERRNO_CODES.EACCES;
    }

    return 0;
  },
  doDup: function doDup(path, flags, suggestFD) {
    var suggest = FS.getStream(suggestFD);
    if (suggest) FS.close(suggest);
    return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
  },
  doReadv: function doReadv(stream, iov, iovcnt, offset) {
    var ret = 0;

    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAP32[iov + i * 8 >> 2];
      var len = HEAP32[iov + (i * 8 + 4) >> 2];
      var curr = FS.read(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) break;
    }

    return ret;
  },
  doWritev: function doWritev(stream, iov, iovcnt, offset) {
    var ret = 0;

    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAP32[iov + i * 8 >> 2];
      var len = HEAP32[iov + (i * 8 + 4) >> 2];
      var curr = FS.write(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
    }

    return ret;
  },
  varargs: 0,
  get: function get(varargs) {
    SYSCALLS.varargs += 4;
    var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
    return ret;
  },
  getStr: function getStr() {
    var ret = Pointer_stringify(SYSCALLS.get());
    return ret;
  },
  getStreamFromFD: function getStreamFromFD() {
    var stream = FS.getStream(SYSCALLS.get());
    if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    return stream;
  },
  getSocketFromFD: function getSocketFromFD() {
    var socket = SOCKFS.getSocket(SYSCALLS.get());
    if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    return socket;
  },
  getSocketAddress: function getSocketAddress(allowNull) {
    var addrp = SYSCALLS.get(),
        addrlen = SYSCALLS.get();
    if (allowNull && addrp === 0) return null;

    var info = __read_sockaddr(addrp, addrlen);

    if (info.errno) throw new FS.ErrnoError(info.errno);
    info.addr = DNS.lookup_addr(info.addr) || info.addr;
    return info;
  },
  get64: function get64() {
    var low = SYSCALLS.get(),
        high = SYSCALLS.get();
    if (low >= 0) assert(high === 0);else assert(high === -1);
    return low;
  },
  getZero: function getZero() {
    assert(SYSCALLS.get() === 0);
  }
};

function ___syscall5(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var pathname = SYSCALLS.getStr(),
        flags = SYSCALLS.get(),
        mode = SYSCALLS.get();
    var stream = FS.open(pathname, flags, mode);
    return stream.fd;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

function ___lock() {}

function ___unlock() {}

function ___syscall6(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var stream = SYSCALLS.getStreamFromFD();
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

function _sysconf(name) {
  switch (name) {
    case 30:
      return PAGE_SIZE;

    case 85:
      return totalMemory / PAGE_SIZE;

    case 132:
    case 133:
    case 12:
    case 137:
    case 138:
    case 15:
    case 235:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 149:
    case 13:
    case 10:
    case 236:
    case 153:
    case 9:
    case 21:
    case 22:
    case 159:
    case 154:
    case 14:
    case 77:
    case 78:
    case 139:
    case 80:
    case 81:
    case 82:
    case 68:
    case 67:
    case 164:
    case 11:
    case 29:
    case 47:
    case 48:
    case 95:
    case 52:
    case 51:
    case 46:
      return 200809;

    case 79:
      return 0;

    case 27:
    case 246:
    case 127:
    case 128:
    case 23:
    case 24:
    case 160:
    case 161:
    case 181:
    case 182:
    case 242:
    case 183:
    case 184:
    case 243:
    case 244:
    case 245:
    case 165:
    case 178:
    case 179:
    case 49:
    case 50:
    case 168:
    case 169:
    case 175:
    case 170:
    case 171:
    case 172:
    case 97:
    case 76:
    case 32:
    case 173:
    case 35:
      return -1;

    case 176:
    case 177:
    case 7:
    case 155:
    case 8:
    case 157:
    case 125:
    case 126:
    case 92:
    case 93:
    case 129:
    case 130:
    case 131:
    case 94:
    case 91:
      return 1;

    case 74:
    case 60:
    case 69:
    case 70:
    case 4:
      return 1024;

    case 31:
    case 42:
    case 72:
      return 32;

    case 87:
    case 26:
    case 33:
      return 2147483647;

    case 34:
    case 1:
      return 47839;

    case 38:
    case 36:
      return 99;

    case 43:
    case 37:
      return 2048;

    case 0:
      return 2097152;

    case 3:
      return 65536;

    case 28:
      return 32768;

    case 44:
      return 32767;

    case 75:
      return 16384;

    case 39:
      return 1e3;

    case 89:
      return 700;

    case 71:
      return 256;

    case 40:
      return 255;

    case 2:
      return 100;

    case 180:
      return 64;

    case 25:
      return 20;

    case 5:
      return 16;

    case 6:
      return 6;

    case 73:
      return 4;

    case 84:
      {
        if (typeof navigator === "object") return navigator["hardwareConcurrency"] || 1;
        return 1;
      }
  }

  ___setErrNo(ERRNO_CODES.EINVAL);

  return -1;
}

function _sbrk(bytes) {
  var self = _sbrk;

  if (!self.called) {
    DYNAMICTOP = alignMemoryPage(DYNAMICTOP);
    self.called = true;
    assert(Runtime.dynamicAlloc);
    self.alloc = Runtime.dynamicAlloc;

    Runtime.dynamicAlloc = function () {
      abort("cannot dynamically allocate, sbrk now has control");
    };
  }

  var ret = DYNAMICTOP;

  if (bytes != 0) {
    var success = self.alloc(bytes);
    if (!success) return -1 >>> 0;
  }

  return ret;
}

function _emscripten_memcpy_big(dest, src, num) {
  HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
  return dest;
}

Module["_memcpy"] = _memcpy;
Module["_memmove"] = _memmove;
var _BItoD = true;

function _emscripten_set_main_loop_timing(mode, value) {
  Browser.mainLoop.timingMode = mode;
  Browser.mainLoop.timingValue = value;

  if (!Browser.mainLoop.func) {
    return 1;
  }

  if (mode == 0) {
    Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
      setTimeout(Browser.mainLoop.runner, value);
    };

    Browser.mainLoop.method = "timeout";
  } else if (mode == 1) {
    Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
      Browser.requestAnimationFrame(Browser.mainLoop.runner);
    };

    Browser.mainLoop.method = "rAF";
  } else if (mode == 2) {
    if (!window["setImmediate"]) {
      var setImmediates = [];
      var emscriptenMainLoopMessageId = "__emcc";

      function Browser_setImmediate_messageHandler(event) {
        if (event.source === window && event.data === emscriptenMainLoopMessageId) {
          event.stopPropagation();
          setImmediates.shift()();
        }
      }

      window.addEventListener("message", Browser_setImmediate_messageHandler, true);

      window["setImmediate"] = function Browser_emulated_setImmediate(func) {
        setImmediates.push(func);
        window.postMessage(emscriptenMainLoopMessageId, "*");
      };
    }

    Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
      window["setImmediate"](Browser.mainLoop.runner);
    };

    Browser.mainLoop.method = "immediate";
  }

  return 0;
}

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
  Module["noExitRuntime"] = true;
  assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  Browser.mainLoop.func = func;
  Browser.mainLoop.arg = arg;
  var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;

  Browser.mainLoop.runner = function Browser_mainLoop_runner() {
    if (ABORT) return;

    if (Browser.mainLoop.queue.length > 0) {
      var start = Date.now();
      var blocker = Browser.mainLoop.queue.shift();
      blocker.func(blocker.arg);

      if (Browser.mainLoop.remainingBlockers) {
        var remaining = Browser.mainLoop.remainingBlockers;
        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);

        if (blocker.counted) {
          Browser.mainLoop.remainingBlockers = next;
        } else {
          next = next + .5;
          Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
        }
      }

      console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
      Browser.mainLoop.updateStatus();
      setTimeout(Browser.mainLoop.runner, 0);
      return;
    }

    if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
    Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;

    if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
      Browser.mainLoop.scheduler();
      return;
    }

    if (Browser.mainLoop.method === "timeout" && Module.ctx) {
      Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
      Browser.mainLoop.method = "";
    }

    Browser.mainLoop.runIter(function () {
      if (typeof arg !== "undefined") {
        Runtime.dynCall("vi", func, [arg]);
      } else {
        Runtime.dynCall("v", func);
      }
    });
    if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
    if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
    Browser.mainLoop.scheduler();
  };

  if (!noSetTiming) {
    if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps);else _emscripten_set_main_loop_timing(1, 1);
    Browser.mainLoop.scheduler();
  }

  if (simulateInfiniteLoop) {
    throw "SimulateInfiniteLoop";
  }
}

var Browser = {
  mainLoop: {
    scheduler: null,
    method: "",
    currentlyRunningMainloop: 0,
    func: null,
    arg: 0,
    timingMode: 0,
    timingValue: 0,
    currentFrameNumber: 0,
    queue: [],
    pause: function pause() {
      Browser.mainLoop.scheduler = null;
      Browser.mainLoop.currentlyRunningMainloop++;
    },
    resume: function resume() {
      Browser.mainLoop.currentlyRunningMainloop++;
      var timingMode = Browser.mainLoop.timingMode;
      var timingValue = Browser.mainLoop.timingValue;
      var func = Browser.mainLoop.func;
      Browser.mainLoop.func = null;

      _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);

      _emscripten_set_main_loop_timing(timingMode, timingValue);

      Browser.mainLoop.scheduler();
    },
    updateStatus: function updateStatus() {
      if (Module["setStatus"]) {
        var message = Module["statusMessage"] || "Please wait...";
        var remaining = Browser.mainLoop.remainingBlockers;
        var expected = Browser.mainLoop.expectedBlockers;

        if (remaining) {
          if (remaining < expected) {
            Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
          } else {
            Module["setStatus"](message);
          }
        } else {
          Module["setStatus"]("");
        }
      }
    },
    runIter: function runIter(func) {
      if (ABORT) return;

      if (Module["preMainLoop"]) {
        var preRet = Module["preMainLoop"]();

        if (preRet === false) {
          return;
        }
      }

      try {
        func();
      } catch (e) {
        if (e instanceof ExitStatus) {
          return;
        } else {
          if (e && typeof e === "object" && e.stack) Module.printErr("exception thrown: " + [e, e.stack]);
          throw e;
        }
      }

      if (Module["postMainLoop"]) Module["postMainLoop"]();
    }
  },
  isFullScreen: false,
  pointerLock: false,
  moduleContextCreatedCallbacks: [],
  workers: [],
  init: function init() {
    if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
    if (Browser.initted) return;
    Browser.initted = true;

    try {
      new Blob();
      Browser.hasBlobConstructor = true;
    } catch (e) {
      Browser.hasBlobConstructor = false;
      console.log("warning: no blob constructor, cannot create blobs with mimetypes");
    }

    Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
    Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;

    if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
      console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
      Module.noImageDecoding = true;
    }

    var imagePlugin = {};

    imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
      return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
    };

    imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
      var b = null;

      if (Browser.hasBlobConstructor) {
        try {
          b = new Blob([byteArray], {
            type: Browser.getMimetype(name)
          });

          if (b.size !== byteArray.length) {
            b = new Blob([new Uint8Array(byteArray).buffer], {
              type: Browser.getMimetype(name)
            });
          }
        } catch (e) {
          Runtime.warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
        }
      }

      if (!b) {
        var bb = new Browser.BlobBuilder();
        bb.append(new Uint8Array(byteArray).buffer);
        b = bb.getBlob();
      }

      var url = Browser.URLObject.createObjectURL(b);
      var img = new Image();

      img.onload = function img_onload() {
        assert(img.complete, "Image " + name + " could not be decoded");
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        Module["preloadedImages"][name] = canvas;
        Browser.URLObject.revokeObjectURL(url);
        if (onload) onload(byteArray);
      };

      img.onerror = function img_onerror(event) {
        console.log("Image " + url + " could not be decoded");
        if (onerror) onerror();
      };

      img.src = url;
    };

    Module["preloadPlugins"].push(imagePlugin);
    var audioPlugin = {};

    audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
      return !Module.noAudioDecoding && name.substr(-4) in {
        ".ogg": 1,
        ".wav": 1,
        ".mp3": 1
      };
    };

    audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
      var done = false;

      function finish(audio) {
        if (done) return;
        done = true;
        Module["preloadedAudios"][name] = audio;
        if (onload) onload(byteArray);
      }

      function fail() {
        if (done) return;
        done = true;
        Module["preloadedAudios"][name] = new Audio();
        if (onerror) onerror();
      }

      if (Browser.hasBlobConstructor) {
        try {
          var b = new Blob([byteArray], {
            type: Browser.getMimetype(name)
          });
        } catch (e) {
          return fail();
        }

        var url = Browser.URLObject.createObjectURL(b);
        var audio = new Audio();
        audio.addEventListener("canplaythrough", function () {
          finish(audio);
        }, false);

        audio.onerror = function audio_onerror(event) {
          if (done) return;
          console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");

          function encode64(data) {
            var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var PAD = "=";
            var ret = "";
            var leftchar = 0;
            var leftbits = 0;

            for (var i = 0; i < data.length; i++) {
              leftchar = leftchar << 8 | data[i];
              leftbits += 8;

              while (leftbits >= 6) {
                var curr = leftchar >> leftbits - 6 & 63;
                leftbits -= 6;
                ret += BASE[curr];
              }
            }

            if (leftbits == 2) {
              ret += BASE[(leftchar & 3) << 4];
              ret += PAD + PAD;
            } else if (leftbits == 4) {
              ret += BASE[(leftchar & 15) << 2];
              ret += PAD;
            }

            return ret;
          }

          audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
          finish(audio);
        };

        audio.src = url;
        Browser.safeSetTimeout(function () {
          finish(audio);
        }, 1e4);
      } else {
        return fail();
      }
    };

    Module["preloadPlugins"].push(audioPlugin);
    var canvas = Module["canvas"];

    function pointerLockChange() {
      Browser.pointerLock = document["pointerLockElement"] === canvas || document["mozPointerLockElement"] === canvas || document["webkitPointerLockElement"] === canvas || document["msPointerLockElement"] === canvas;
    }

    if (canvas) {
      canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function () {};

      canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function () {};

      canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
      document.addEventListener("pointerlockchange", pointerLockChange, false);
      document.addEventListener("mozpointerlockchange", pointerLockChange, false);
      document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
      document.addEventListener("mspointerlockchange", pointerLockChange, false);

      if (Module["elementPointerLock"]) {
        canvas.addEventListener("click", function (ev) {
          if (!Browser.pointerLock && canvas.requestPointerLock) {
            canvas.requestPointerLock();
            ev.preventDefault();
          }
        }, false);
      }
    }
  },
  createContext: function createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
    if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
    var ctx;
    var contextHandle;

    if (useWebGL) {
      var contextAttributes = {
        antialias: false,
        alpha: false
      };

      if (webGLContextAttributes) {
        for (var attribute in webGLContextAttributes) {
          contextAttributes[attribute] = webGLContextAttributes[attribute];
        }
      }

      contextHandle = GL.createContext(canvas, contextAttributes);

      if (contextHandle) {
        ctx = GL.getContext(contextHandle).GLctx;
      }

      canvas.style.backgroundColor = "black";
    } else {
      ctx = canvas.getContext("2d");
    }

    if (!ctx) return null;

    if (setInModule) {
      if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
      Module.ctx = ctx;
      if (useWebGL) GL.makeContextCurrent(contextHandle);
      Module.useWebGL = useWebGL;
      Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
        callback();
      });
      Browser.init();
    }

    return ctx;
  },
  destroyContext: function destroyContext(canvas, useWebGL, setInModule) {},
  fullScreenHandlersInstalled: false,
  lockPointer: undefined,
  resizeCanvas: undefined,
  requestFullScreen: function requestFullScreen(lockPointer, resizeCanvas, vrDevice) {
    Browser.lockPointer = lockPointer;
    Browser.resizeCanvas = resizeCanvas;
    Browser.vrDevice = vrDevice;
    if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
    if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
    if (typeof Browser.vrDevice === "undefined") Browser.vrDevice = null;
    var canvas = Module["canvas"];

    function fullScreenChange() {
      Browser.isFullScreen = false;
      var canvasContainer = canvas.parentNode;

      if ((document["webkitFullScreenElement"] || document["webkitFullscreenElement"] || document["mozFullScreenElement"] || document["mozFullscreenElement"] || document["fullScreenElement"] || document["fullscreenElement"] || document["msFullScreenElement"] || document["msFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
        canvas.cancelFullScreen = document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["webkitCancelFullScreen"] || document["msExitFullscreen"] || document["exitFullscreen"] || function () {};

        canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
        if (Browser.lockPointer) canvas.requestPointerLock();
        Browser.isFullScreen = true;
        if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
      } else {
        canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
        canvasContainer.parentNode.removeChild(canvasContainer);
        if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
      }

      if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullScreen);
      Browser.updateCanvasDimensions(canvas);
    }

    if (!Browser.fullScreenHandlersInstalled) {
      Browser.fullScreenHandlersInstalled = true;
      document.addEventListener("fullscreenchange", fullScreenChange, false);
      document.addEventListener("mozfullscreenchange", fullScreenChange, false);
      document.addEventListener("webkitfullscreenchange", fullScreenChange, false);
      document.addEventListener("MSFullscreenChange", fullScreenChange, false);
    }

    var canvasContainer = document.createElement("div");
    canvas.parentNode.insertBefore(canvasContainer, canvas);
    canvasContainer.appendChild(canvas);
    canvasContainer.requestFullScreen = canvasContainer["requestFullScreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullScreen"] ? function () {
      canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
    } : null);

    if (vrDevice) {
      canvasContainer.requestFullScreen({
        vrDisplay: vrDevice
      });
    } else {
      canvasContainer.requestFullScreen();
    }
  },
  nextRAF: 0,
  fakeRequestAnimationFrame: function fakeRequestAnimationFrame(func) {
    var now = Date.now();

    if (Browser.nextRAF === 0) {
      Browser.nextRAF = now + 1e3 / 60;
    } else {
      while (now + 2 >= Browser.nextRAF) {
        Browser.nextRAF += 1e3 / 60;
      }
    }

    var delay = Math.max(Browser.nextRAF - now, 0);
    setTimeout(func, delay);
  },
  requestAnimationFrame: function requestAnimationFrame(func) {
    if (typeof window === "undefined") {
      Browser.fakeRequestAnimationFrame(func);
    } else {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window["requestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["msRequestAnimationFrame"] || window["oRequestAnimationFrame"] || Browser.fakeRequestAnimationFrame;
      }

      window.requestAnimationFrame(func);
    }
  },
  safeCallback: function safeCallback(func) {
    return function () {
      if (!ABORT) return func.apply(null, arguments);
    };
  },
  allowAsyncCallbacks: true,
  queuedAsyncCallbacks: [],
  pauseAsyncCallbacks: function pauseAsyncCallbacks() {
    Browser.allowAsyncCallbacks = false;
  },
  resumeAsyncCallbacks: function resumeAsyncCallbacks() {
    Browser.allowAsyncCallbacks = true;

    if (Browser.queuedAsyncCallbacks.length > 0) {
      var callbacks = Browser.queuedAsyncCallbacks;
      Browser.queuedAsyncCallbacks = [];
      callbacks.forEach(function (func) {
        func();
      });
    }
  },
  safeRequestAnimationFrame: function safeRequestAnimationFrame(func) {
    return Browser.requestAnimationFrame(function () {
      if (ABORT) return;

      if (Browser.allowAsyncCallbacks) {
        func();
      } else {
        Browser.queuedAsyncCallbacks.push(func);
      }
    });
  },
  safeSetTimeout: function safeSetTimeout(func, timeout) {
    Module["noExitRuntime"] = true;
    return setTimeout(function () {
      if (ABORT) return;

      if (Browser.allowAsyncCallbacks) {
        func();
      } else {
        Browser.queuedAsyncCallbacks.push(func);
      }
    }, timeout);
  },
  safeSetInterval: function safeSetInterval(func, timeout) {
    Module["noExitRuntime"] = true;
    return setInterval(function () {
      if (ABORT) return;

      if (Browser.allowAsyncCallbacks) {
        func();
      }
    }, timeout);
  },
  getMimetype: function getMimetype(name) {
    return {
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "png": "image/png",
      "bmp": "image/bmp",
      "ogg": "audio/ogg",
      "wav": "audio/wav",
      "mp3": "audio/mpeg"
    }[name.substr(name.lastIndexOf(".") + 1)];
  },
  getUserMedia: function getUserMedia(func) {
    if (!window.getUserMedia) {
      window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
    }

    window.getUserMedia(func);
  },
  getMovementX: function getMovementX(event) {
    return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
  },
  getMovementY: function getMovementY(event) {
    return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
  },
  getMouseWheelDelta: function getMouseWheelDelta(event) {
    var delta = 0;

    switch (event.type) {
      case "DOMMouseScroll":
        delta = event.detail;
        break;

      case "mousewheel":
        delta = event.wheelDelta;
        break;

      case "wheel":
        delta = event["deltaY"];
        break;

      default:
        throw "unrecognized mouse wheel event: " + event.type;
    }

    return delta;
  },
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  touches: {},
  lastTouches: {},
  calculateMouseEvent: function calculateMouseEvent(event) {
    if (Browser.pointerLock) {
      if (event.type != "mousemove" && "mozMovementX" in event) {
        Browser.mouseMovementX = Browser.mouseMovementY = 0;
      } else {
        Browser.mouseMovementX = Browser.getMovementX(event);
        Browser.mouseMovementY = Browser.getMovementY(event);
      }

      if (typeof SDL != "undefined") {
        Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
        Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
      } else {
        Browser.mouseX += Browser.mouseMovementX;
        Browser.mouseY += Browser.mouseMovementY;
      }
    } else {
      var rect = Module["canvas"].getBoundingClientRect();
      var cw = Module["canvas"].width;
      var ch = Module["canvas"].height;
      var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
      var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;

      if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
        var touch = event.touch;

        if (touch === undefined) {
          return;
        }

        var adjustedX = touch.pageX - (scrollX + rect.left);
        var adjustedY = touch.pageY - (scrollY + rect.top);
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
        var coords = {
          x: adjustedX,
          y: adjustedY
        };

        if (event.type === "touchstart") {
          Browser.lastTouches[touch.identifier] = coords;
          Browser.touches[touch.identifier] = coords;
        } else if (event.type === "touchend" || event.type === "touchmove") {
          var last = Browser.touches[touch.identifier];
          if (!last) last = coords;
          Browser.lastTouches[touch.identifier] = last;
          Browser.touches[touch.identifier] = coords;
        }

        return;
      }

      var x = event.pageX - (scrollX + rect.left);
      var y = event.pageY - (scrollY + rect.top);
      x = x * (cw / rect.width);
      y = y * (ch / rect.height);
      Browser.mouseMovementX = x - Browser.mouseX;
      Browser.mouseMovementY = y - Browser.mouseY;
      Browser.mouseX = x;
      Browser.mouseY = y;
    }
  },
  xhrLoad: function xhrLoad(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
        onload(xhr.response);
      } else {
        onerror();
      }
    };

    xhr.onerror = onerror;
    xhr.send(null);
  },
  asyncLoad: function asyncLoad(url, onload, onerror, noRunDep) {
    Browser.xhrLoad(url, function (arrayBuffer) {
      assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
      onload(new Uint8Array(arrayBuffer));
      if (!noRunDep) removeRunDependency("al " + url);
    }, function (event) {
      if (onerror) {
        onerror();
      } else {
        throw 'Loading data file "' + url + '" failed.';
      }
    });
    if (!noRunDep) addRunDependency("al " + url);
  },
  resizeListeners: [],
  updateResizeListeners: function updateResizeListeners() {
    var canvas = Module["canvas"];
    Browser.resizeListeners.forEach(function (listener) {
      listener(canvas.width, canvas.height);
    });
  },
  setCanvasSize: function setCanvasSize(width, height, noUpdates) {
    var canvas = Module["canvas"];
    Browser.updateCanvasDimensions(canvas, width, height);
    if (!noUpdates) Browser.updateResizeListeners();
  },
  windowedWidth: 0,
  windowedHeight: 0,
  setFullScreenCanvasSize: function setFullScreenCanvasSize() {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen + Runtime.QUANTUM_SIZE * 0 >> 2];
      flags = flags | 8388608;
      HEAP32[SDL.screen + Runtime.QUANTUM_SIZE * 0 >> 2] = flags;
    }

    Browser.updateResizeListeners();
  },
  setWindowedCanvasSize: function setWindowedCanvasSize() {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen + Runtime.QUANTUM_SIZE * 0 >> 2];
      flags = flags & ~8388608;
      HEAP32[SDL.screen + Runtime.QUANTUM_SIZE * 0 >> 2] = flags;
    }

    Browser.updateResizeListeners();
  },
  updateCanvasDimensions: function updateCanvasDimensions(canvas, wNative, hNative) {
    if (wNative && hNative) {
      canvas.widthNative = wNative;
      canvas.heightNative = hNative;
    } else {
      wNative = canvas.widthNative;
      hNative = canvas.heightNative;
    }

    var w = wNative;
    var h = hNative;

    if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
      if (w / h < Module["forcedAspectRatio"]) {
        w = Math.round(h * Module["forcedAspectRatio"]);
      } else {
        h = Math.round(w / Module["forcedAspectRatio"]);
      }
    }

    if ((document["webkitFullScreenElement"] || document["webkitFullscreenElement"] || document["mozFullScreenElement"] || document["mozFullscreenElement"] || document["fullScreenElement"] || document["fullscreenElement"] || document["msFullScreenElement"] || document["msFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
      var factor = Math.min(screen.width / w, screen.height / h);
      w = Math.round(w * factor);
      h = Math.round(h * factor);
    }

    if (Browser.resizeCanvas) {
      if (canvas.width != w) canvas.width = w;
      if (canvas.height != h) canvas.height = h;

      if (typeof canvas.style != "undefined") {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
      }
    } else {
      if (canvas.width != wNative) canvas.width = wNative;
      if (canvas.height != hNative) canvas.height = hNative;

      if (typeof canvas.style != "undefined") {
        if (w != wNative || h != hNative) {
          canvas.style.setProperty("width", w + "px", "important");
          canvas.style.setProperty("height", h + "px", "important");
        } else {
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
        }
      }
    }
  },
  wgetRequests: {},
  nextWgetRequestHandle: 0,
  getNextWgetRequestHandle: function getNextWgetRequestHandle() {
    var handle = Browser.nextWgetRequestHandle;
    Browser.nextWgetRequestHandle++;
    return handle;
  }
};

function _time(ptr) {
  var ret = Date.now() / 1e3 | 0;

  if (ptr) {
    HEAP32[ptr >> 2] = ret;
  }

  return ret;
}

function _pthread_self() {
  return 0;
}

function ___syscall140(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var stream = SYSCALLS.getStreamFromFD(),
        offset_high = SYSCALLS.get(),
        offset_low = SYSCALLS.get(),
        result = SYSCALLS.get(),
        whence = SYSCALLS.get();
    var offset = offset_low;
    assert(offset_high === 0);
    FS.llseek(stream, offset, whence);
    HEAP32[result >> 2] = stream.position;
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

function ___syscall146(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var stream = SYSCALLS.getStreamFromFD(),
        iov = SYSCALLS.get(),
        iovcnt = SYSCALLS.get();
    return SYSCALLS.doWritev(stream, iov, iovcnt);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

function ___syscall54(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var stream = SYSCALLS.getStreamFromFD(),
        op = SYSCALLS.get();

    switch (op) {
      case 21505:
        {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        ;

      case 21506:
        {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        ;

      case 21519:
        {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          var argp = SYSCALLS.get();
          HEAP32[argp >> 2] = 0;
          return 0;
        }
        ;

      case 21520:
        {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return -ERRNO_CODES.EINVAL;
        }
        ;

      case 21531:
        {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        ;

      default:
        abort("bad ioctl syscall " + op);
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

function ___syscall221(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var stream = SYSCALLS.getStreamFromFD(),
        cmd = SYSCALLS.get();

    switch (cmd) {
      case 0:
        {
          var arg = SYSCALLS.get();

          if (arg < 0) {
            return -ERRNO_CODES.EINVAL;
          }

          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        ;

      case 1:
      case 2:
        return 0;

      case 3:
        return stream.flags;

      case 4:
        {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        ;

      case 12:
      case 12:
        {
          var arg = SYSCALLS.get();
          var offset = 0;
          HEAP16[arg + offset >> 1] = 2;
          return 0;
        }
        ;

      case 13:
      case 14:
      case 13:
      case 14:
        return 0;

      case 16:
      case 8:
        return -ERRNO_CODES.EINVAL;

      case 9:
        ___setErrNo(ERRNO_CODES.EINVAL);

        return -1;

      default:
        {
          return -ERRNO_CODES.EINVAL;
        }
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

function ___syscall145(which, varargs) {
  SYSCALLS.varargs = varargs;

  try {
    var stream = SYSCALLS.getStreamFromFD(),
        iov = SYSCALLS.get(),
        iovcnt = SYSCALLS.get();
    return SYSCALLS.doReadv(stream, iov, iovcnt);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}

FS.staticInit();

__ATINIT__.unshift(function () {
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
});

__ATMAIN__.push(function () {
  FS.ignorePermissions = false;
});

__ATEXIT__.push(function () {
  FS.quit();
});

Module["FS_createFolder"] = FS.createFolder;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createLink"] = FS.createLink;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;

__ATINIT__.unshift(function () {
  TTY.init();
});

__ATEXIT__.push(function () {
  TTY.shutdown();
});

if (ENVIRONMENT_IS_NODE) {
  var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  var NODEJS_PATH = __webpack_require__("33yfhu");

  NODEFS.staticInit();
}

Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) {
  Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice);
};

Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
  Browser.requestAnimationFrame(func);
};

Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
  Browser.setCanvasSize(width, height, noUpdates);
};

Module["pauseMainLoop"] = function Module_pauseMainLoop() {
  Browser.mainLoop.pause();
};

Module["resumeMainLoop"] = function Module_resumeMainLoop() {
  Browser.mainLoop.resume();
};

Module["getUserMedia"] = function Module_getUserMedia() {
  Browser.getUserMedia();
};

Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
  return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};

STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
staticSealed = true;
STACK_MAX = STACK_BASE + TOTAL_STACK;
DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);
assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");
var cttz_i8 = allocate([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", ALLOC_DYNAMIC);

function invoke_iiii(index, a1, a2, a3) {
  try {
    return Module["dynCall_iiii"](index, a1, a2, a3);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_iiii(x, a0, a1, a2) {
  if (x < 0 || x >= FUNCTION_TABLE_iiii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_iiii[x](a0, a1, a2);
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
  try {
    Module["dynCall_viiiii"](index, a1, a2, a3, a4, a5);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_viiiii(x, a0, a1, a2, a3, a4) {
  if (x < 0 || x >= FUNCTION_TABLE_viiiii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_viiiii[x](a0, a1, a2, a3, a4);
}

function invoke_vi(index, a1) {
  try {
    Module["dynCall_vi"](index, a1);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_vi(x, a0) {
  if (x < 0 || x >= FUNCTION_TABLE_vi.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_vi[x](a0);
}

function invoke_vii(index, a1, a2) {
  try {
    Module["dynCall_vii"](index, a1, a2);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_vii(x, a0, a1) {
  if (x < 0 || x >= FUNCTION_TABLE_vii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_vii[x](a0, a1);
}

function invoke_ii(index, a1) {
  try {
    return Module["dynCall_ii"](index, a1);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_ii(x, a0) {
  if (x < 0 || x >= FUNCTION_TABLE_ii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_ii[x](a0);
}

function invoke_viii(index, a1, a2, a3) {
  try {
    Module["dynCall_viii"](index, a1, a2, a3);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_viii(x, a0, a1, a2) {
  if (x < 0 || x >= FUNCTION_TABLE_viii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'viii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_viii[x](a0, a1, a2);
}

function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  try {
    Module["dynCall_viiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_viiiiiiii(x, a0, a1, a2, a3, a4, a5, a6, a7) {
  if (x < 0 || x >= FUNCTION_TABLE_viiiiiiii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'viiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_viiiiiiii[x](a0, a1, a2, a3, a4, a5, a6, a7);
}

function invoke_iii(index, a1, a2) {
  try {
    return Module["dynCall_iii"](index, a1, a2);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_iii(x, a0, a1) {
  if (x < 0 || x >= FUNCTION_TABLE_iii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_iii[x](a0, a1);
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
  try {
    return Module["dynCall_iiiiii"](index, a1, a2, a3, a4, a5);
  } catch (e) {
    if (typeof e !== "number" && e !== "longjmp") throw e;
    asm["setThrew"](1, 0);
  }
}

function ftCall_iiiiii(x, a0, a1, a2, a3, a4) {
  if (x < 0 || x >= FUNCTION_TABLE_iiiiii.length) {
    Module.printErr("Function table mask error (out of range)");
    Module["printErr"]("Invalid function pointer called with signature 'iiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
    Module["printErr"]("Build with ASSERTIONS=2 for more info.");
    abort(x);
  }

  return FUNCTION_TABLE_iiiiii[x](a0, a1, a2, a3, a4);
}

var dynCall_iiii = ftCall_iiii;
var dynCall_viiiii = ftCall_viiiii;
var dynCall_vi = ftCall_vi;
var dynCall_vii = ftCall_vii;
var dynCall_ii = ftCall_ii;
var dynCall_viii = ftCall_viii;
var dynCall_viiiiiiii = ftCall_viiiiiiii;
var dynCall_iii = ftCall_iii;
var dynCall_iiiiii = ftCall_iiiiii;
Module.asmGlobalArg = {
  "Math": Math,
  "Int8Array": Int8Array,
  "Int16Array": Int16Array,
  "Int32Array": Int32Array,
  "Uint8Array": Uint8Array,
  "Uint16Array": Uint16Array,
  "Uint32Array": Uint32Array,
  "Float32Array": Float32Array,
  "Float64Array": Float64Array,
  "NaN": NaN,
  "Infinity": Infinity
};
Module.asmLibraryArg = {
  "abort": abort,
  "assert": assert,
  "invoke_iiii": invoke_iiii,
  "ftCall_iiii": ftCall_iiii,
  "invoke_viiiii": invoke_viiiii,
  "ftCall_viiiii": ftCall_viiiii,
  "invoke_vi": invoke_vi,
  "ftCall_vi": ftCall_vi,
  "invoke_vii": invoke_vii,
  "ftCall_vii": ftCall_vii,
  "invoke_ii": invoke_ii,
  "ftCall_ii": ftCall_ii,
  "invoke_viii": invoke_viii,
  "ftCall_viii": ftCall_viii,
  "invoke_viiiiiiii": invoke_viiiiiiii,
  "ftCall_viiiiiiii": ftCall_viiiiiiii,
  "invoke_iii": invoke_iii,
  "ftCall_iii": ftCall_iii,
  "invoke_iiiiii": invoke_iiiiii,
  "ftCall_iiiiii": ftCall_iiiiii,
  "_pthread_cleanup_pop": _pthread_cleanup_pop,
  "___syscall221": ___syscall221,
  "___lock": ___lock,
  "_emscripten_set_main_loop": _emscripten_set_main_loop,
  "_pthread_self": _pthread_self,
  "_abort": _abort,
  "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing,
  "___syscall6": ___syscall6,
  "_sbrk": _sbrk,
  "_time": _time,
  "___syscall5": ___syscall5,
  "_emscripten_memcpy_big": _emscripten_memcpy_big,
  "___syscall54": ___syscall54,
  "___unlock": ___unlock,
  "___syscall140": ___syscall140,
  "_pthread_cleanup_push": _pthread_cleanup_push,
  "_sysconf": _sysconf,
  "___syscall145": ___syscall145,
  "___syscall146": ___syscall146,
  "___setErrNo": ___setErrNo,
  "STACKTOP": STACKTOP,
  "STACK_MAX": STACK_MAX,
  "tempDoublePtr": tempDoublePtr,
  "ABORT": ABORT,
  "cttz_i8": cttz_i8
}; // EMSCRIPTEN_START_ASM

var asm = function (global, env, buffer) {
  "use asm";

  var a = new global.Int8Array(buffer);
  var b = new global.Int16Array(buffer);
  var c = new global.Int32Array(buffer);
  var d = new global.Uint8Array(buffer);
  var e = new global.Uint16Array(buffer);
  var f = new global.Uint32Array(buffer);
  var g = new global.Float32Array(buffer);
  var h = new global.Float64Array(buffer);
  var i = env.STACKTOP | 0;
  var j = env.STACK_MAX | 0;
  var k = env.tempDoublePtr | 0;
  var l = env.ABORT | 0;
  var m = env.cttz_i8 | 0;
  var n = 0;
  var o = 0;
  var p = 0;
  var q = 0;
  var r = global.NaN,
      s = global.Infinity;
  var t = 0,
      u = 0,
      v = 0,
      w = 0,
      x = 0.0,
      y = 0,
      z = 0,
      A = 0,
      B = 0.0;
  var C = 0;
  var D = 0;
  var E = 0;
  var F = 0;
  var G = 0;
  var H = 0;
  var I = 0;
  var J = 0;
  var K = 0;
  var L = 0;
  var M = global.Math.floor;
  var N = global.Math.abs;
  var O = global.Math.sqrt;
  var P = global.Math.pow;
  var Q = global.Math.cos;
  var R = global.Math.sin;
  var S = global.Math.tan;
  var T = global.Math.acos;
  var U = global.Math.asin;
  var V = global.Math.atan;
  var W = global.Math.atan2;
  var X = global.Math.exp;
  var Y = global.Math.log;
  var Z = global.Math.ceil;
  var _ = global.Math.imul;
  var $ = global.Math.min;
  var aa = global.Math.clz32;
  var ba = env.abort;
  var ca = env.assert;
  var da = env.invoke_iiii;
  var ea = env.ftCall_iiii;
  var fa = env.invoke_viiiii;
  var ga = env.ftCall_viiiii;
  var ha = env.invoke_vi;
  var ia = env.ftCall_vi;
  var ja = env.invoke_vii;
  var ka = env.ftCall_vii;
  var la = env.invoke_ii;
  var ma = env.ftCall_ii;
  var na = env.invoke_viii;
  var oa = env.ftCall_viii;
  var pa = env.invoke_viiiiiiii;
  var qa = env.ftCall_viiiiiiii;
  var ra = env.invoke_iii;
  var sa = env.ftCall_iii;
  var ta = env.invoke_iiiiii;
  var ua = env.ftCall_iiiiii;
  var va = env._pthread_cleanup_pop;
  var wa = env.___syscall221;
  var xa = env.___lock;
  var ya = env._emscripten_set_main_loop;
  var za = env._pthread_self;
  var Aa = env._abort;
  var Ba = env._emscripten_set_main_loop_timing;
  var Ca = env.___syscall6;
  var Da = env._sbrk;
  var Ea = env._time;
  var Fa = env.___syscall5;
  var Ga = env._emscripten_memcpy_big;
  var Ha = env.___syscall54;
  var Ia = env.___unlock;
  var Ja = env.___syscall140;
  var Ka = env._pthread_cleanup_push;
  var La = env._sysconf;
  var Ma = env.___syscall145;
  var Na = env.___syscall146;
  var Oa = env.___setErrNo;
  var Pa = 0.0; // EMSCRIPTEN_START_FUNCS

  function Za(a) {
    a = a | 0;
    var b = 0;
    b = i;
    i = i + a | 0;
    i = i + 15 & -16;
    return b | 0;
  }

  function _a() {
    return i | 0;
  }

  function $a(a) {
    a = a | 0;
    i = a;
  }

  function ab(a, b) {
    a = a | 0;
    b = b | 0;
    i = a;
    j = b;
  }

  function bb(a, b) {
    a = a | 0;
    b = b | 0;

    if (!n) {
      n = a;
      o = b;
    }
  }

  function cb(b) {
    b = b | 0;
    a[k >> 0] = a[b >> 0];
    a[k + 1 >> 0] = a[b + 1 >> 0];
    a[k + 2 >> 0] = a[b + 2 >> 0];
    a[k + 3 >> 0] = a[b + 3 >> 0];
  }

  function db(b) {
    b = b | 0;
    a[k >> 0] = a[b >> 0];
    a[k + 1 >> 0] = a[b + 1 >> 0];
    a[k + 2 >> 0] = a[b + 2 >> 0];
    a[k + 3 >> 0] = a[b + 3 >> 0];
    a[k + 4 >> 0] = a[b + 4 >> 0];
    a[k + 5 >> 0] = a[b + 5 >> 0];
    a[k + 6 >> 0] = a[b + 6 >> 0];
    a[k + 7 >> 0] = a[b + 7 >> 0];
  }

  function eb(a) {
    a = a | 0;
    C = a;
  }

  function fb() {
    return C | 0;
  }

  function gb(a, b) {
    a = a | 0;
    b = b | 0;
    return mb(a, b, Fe(b) | 0) | 0;
  }

  function hb(a) {
    a = a | 0;
    if (!a) return a | 0;
    c[a >> 2] = (c[a >> 2] | 0) + 1;
    return a | 0;
  }

  function ib(a) {
    a = a | 0;
    var b = 0;
    if (!a) return;
    b = (c[a >> 2] | 0) + -1 | 0;
    c[a >> 2] = b;
    if (b) return;
    Se(a);
    return;
  }

  function jb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;

    if (!a) {
      d = Re(b) | 0;
      return d | 0;
    } else {
      d = ea(c[a + 8 >> 2] | 0, c[a + 4 >> 2] | 0, 0, b | 0) | 0;
      return d | 0;
    }

    return 0;
  }

  function kb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0;

    if (a) {
      e = ea(c[a + 8 >> 2] | 0, c[a + 4 >> 2] | 0, b | 0, d | 0) | 0;
      return e | 0;
    }

    if (!b) {
      e = Re(d) | 0;
      return e | 0;
    } else {
      e = Te(b, d) | 0;
      return e | 0;
    }

    return 0;
  }

  function lb(a, b) {
    a = a | 0;
    b = b | 0;

    if (a) {
      ka(c[a + 12 >> 2] | 0, c[a + 4 >> 2] | 0, b | 0);
      return;
    }

    if (!b) return;
    Se(b);
    return;
  }

  function mb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0;
    e = jb(a, 16) | 0;
    c[e >> 2] = 1;
    c[e + 4 >> 2] = hb(a) | 0;

    if (!d) {
      c[e + 8 >> 2] = 0;
      f = e + 12 | 0;
      c[f >> 2] = d;
      return e | 0;
    } else {
      g = jb(a, d) | 0;
      c[e + 8 >> 2] = g;
      af(g | 0, b | 0, d | 0) | 0;
      f = e + 12 | 0;
      c[f >> 2] = d;
      return e | 0;
    }

    return 0;
  }

  function nb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    d = jb(a, 20) | 0;
    c[d >> 2] = 1;
    c[d + 4 >> 2] = hb(a) | 0;
    if (!b) c[d + 8 >> 2] = 0;else c[d + 8 >> 2] = jb(a, b) | 0;
    c[d + 12 >> 2] = 0;
    c[d + 16 >> 2] = b;
    return d | 0;
  }

  function ob(a) {
    a = a | 0;
    if (!a) return a | 0;
    c[a >> 2] = (c[a >> 2] | 0) + 1;
    return a | 0;
  }

  function pb(a) {
    a = a | 0;
    var b = 0;
    if (!a) return;
    b = (c[a >> 2] | 0) + -1 | 0;
    c[a >> 2] = b;
    if (b) return;
    b = c[a + 4 >> 2] | 0;
    lb(b, c[a + 8 >> 2] | 0);
    lb(b, a);
    ib(b);
    return;
  }

  function qb(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 12 >> 2] | 0;
    return b | 0;
  }

  function rb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
    d = a + 16 | 0;
    e = c[d >> 2] | 0;

    if (e >>> 0 >= b >>> 0) {
      f = a + 12 | 0;
      c[f >> 2] = b;
      return;
    }

    g = (e | 0) == 0 ? 1 : e;

    while (1) if (g >>> 0 < b >>> 0) g = g << 1;else {
      h = g;
      break;
    }

    g = a + 8 | 0;
    c[g >> 2] = kb(c[a + 4 >> 2] | 0, c[g >> 2] | 0, h) | 0;
    c[d >> 2] = h;
    f = a + 12 | 0;
    c[f >> 2] = b;
    return;
  }

  function sb(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 16 >> 2] | 0;
    return b | 0;
  }

  function tb(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 8 >> 2] | 0;
    return b | 0;
  }

  function ub(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 8 >> 2] | 0;
    return b | 0;
  }

  function vb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
    e = a + 16 | 0;
    f = c[e >> 2] | 0;

    if (f >>> 0 >= d >>> 0) {
      g = c[a + 8 >> 2] | 0;
      h = a + 12 | 0;
      c[h >> 2] = d;
      af(g | 0, b | 0, d | 0) | 0;
      return;
    }

    i = (f | 0) == 0 ? 1 : f;

    while (1) if (i >>> 0 < d >>> 0) i = i << 1;else {
      j = i;
      break;
    }

    i = a + 8 | 0;
    f = kb(c[a + 4 >> 2] | 0, c[i >> 2] | 0, j) | 0;
    c[i >> 2] = f;
    c[e >> 2] = j;
    g = f;
    h = a + 12 | 0;
    c[h >> 2] = d;
    af(g | 0, b | 0, d | 0) | 0;
    return;
  }

  function wb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
    e = a + 12 | 0;
    f = c[e >> 2] | 0;
    g = f + d | 0;
    h = a + 16 | 0;
    i = c[h >> 2] | 0;

    if (i >>> 0 >= g >>> 0) {
      j = c[a + 8 >> 2] | 0;
      c[e >> 2] = g;
      k = j + f | 0;
      af(k | 0, b | 0, d | 0) | 0;
      return;
    }

    l = (i | 0) == 0 ? 1 : i;

    while (1) if (l >>> 0 < g >>> 0) l = l << 1;else {
      m = l;
      break;
    }

    l = a + 8 | 0;
    i = kb(c[a + 4 >> 2] | 0, c[l >> 2] | 0, m) | 0;
    c[l >> 2] = i;
    c[h >> 2] = m;
    j = i;
    c[e >> 2] = g;
    k = j + f | 0;
    af(k | 0, b | 0, d | 0) | 0;
    return;
  }

  function xb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0;
    e = a + 12 | 0;
    f = c[e >> 2] | 0;
    g = f >>> 0 < b >>> 0 ? f : b;
    b = f - g | 0;
    h = (g + d | 0) >>> 0 > f >>> 0 ? b : d;
    if (!h) return;
    d = c[a + 8 >> 2] | 0;
    bf(d + g | 0, d + (h + g) | 0, b - h | 0) | 0;
    c[e >> 2] = (c[e >> 2] | 0) - h;
    return;
  }

  function yb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
    d = jb(a, 80) | 0;
    c[d >> 2] = hb(a) | 0;
    e = d + 4 | 0;
    c[e >> 2] = Ec(b) | 0;
    f = d + 8 | 0;
    c[f >> 2] = Nb(0) | 0;
    if (!b) g = 0;else g = nb(a, 4096) | 0;
    b = d + 12 | 0;
    c[b >> 2] = g;
    g = d + 16 | 0;
    c[g >> 2] = nb(a, 4096) | 0;
    c[d + 20 >> 2] = 0;
    c[d + 56 >> 2] = 4;
    c[d + 60 >> 2] = 1;
    c[d + 64 >> 2] = d;

    if (!(od(d + 24 | 0, 14283, 56) | 0)) {
      h = zc(a, d, 5, 1) | 0;
      return h | 0;
    } else {
      a = c[d >> 2] | 0;
      Fc(c[e >> 2] | 0);
      Ob(c[f >> 2] | 0);
      pb(c[b >> 2] | 0);
      pb(c[g >> 2] | 0);
      lb(a, d);
      ib(a);
      h = 0;
      return h | 0;
    }

    return 0;
  }

  function zb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
    d = jb(a, 80) | 0;
    c[d >> 2] = hb(a) | 0;
    e = d + 4 | 0;
    c[e >> 2] = Ec(0) | 0;
    f = d + 8 | 0;
    c[f >> 2] = Nb(b) | 0;
    b = d + 12 | 0;
    c[b >> 2] = 0;
    g = d + 16 | 0;
    c[g >> 2] = nb(a, 4096) | 0;
    c[d + 20 >> 2] = 0;
    c[d + 56 >> 2] = 4;
    c[d + 60 >> 2] = 1;
    c[d + 64 >> 2] = d;

    if (!(gd(d + 24 | 0, -1, 14283, 56) | 0)) {
      h = Kb(a, d, 6, 2) | 0;
      return h | 0;
    }

    if (!d) {
      h = 0;
      return h | 0;
    }

    a = c[d >> 2] | 0;
    Fc(c[e >> 2] | 0);
    Ob(c[f >> 2] | 0);
    pb(c[b >> 2] | 0);
    pb(c[g >> 2] | 0);
    lb(a, d);
    ib(a);
    h = 0;
    return h | 0;
  }

  function Ab(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
    d = jb(a, 80) | 0;
    c[d >> 2] = hb(a) | 0;
    e = d + 4 | 0;
    c[e >> 2] = Ec(0) | 0;
    f = d + 8 | 0;
    c[f >> 2] = Nb(b) | 0;
    b = d + 12 | 0;
    c[b >> 2] = 0;
    g = d + 16 | 0;
    c[g >> 2] = nb(a, 4096) | 0;
    c[d + 20 >> 2] = 0;
    c[d + 56 >> 2] = 4;
    c[d + 60 >> 2] = 1;
    c[d + 64 >> 2] = d;

    if (!(od(d + 24 | 0, 14283, 56) | 0)) {
      h = Kb(a, d, 7, 3) | 0;
      return h | 0;
    }

    if (!d) {
      h = 0;
      return h | 0;
    }

    a = c[d >> 2] | 0;
    Fc(c[e >> 2] | 0);
    Ob(c[f >> 2] | 0);
    pb(c[b >> 2] | 0);
    pb(c[g >> 2] | 0);
    lb(a, d);
    ib(a);
    h = 0;
    return h | 0;
  }

  function Bb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    return jb(c[a >> 2] | 0, _(d, b) | 0) | 0;
  }

  function Cb(a, b) {
    a = a | 0;
    b = b | 0;
    lb(c[a >> 2] | 0, b);
    return;
  }

  function Db(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
    e = a + 16 | 0;
    f = qb(c[e >> 2] | 0) | 0;
    g = a + 20 | 0;
    h = c[g >> 2] | 0;

    do if ((f - h | 0) >>> 0 < d >>> 0) {
      xb(c[e >> 2] | 0, 0, h);
      i = c[g >> 2] | 0;
      c[g >> 2] = 0;
      j = sb(c[e >> 2] | 0) | 0;

      if (j >>> 0 < d >>> 0) {
        rb(c[e >> 2] | 0, d);
        rb(c[e >> 2] | 0, f - i | 0);
        k = d;
      } else k = j;

      j = a + 4 | 0;
      i = a + 12 | 0;
      l = a + 24 | 0;
      m = a + 28 | 0;
      n = a + 36 | 0;
      o = a + 40 | 0;

      while (1) {
        p = Jc(c[j >> 2] | 0, c[i >> 2] | 0, 4096) | 0;

        if ((p | 0) == -1) {
          q = -1;
          r = 12;
          break;
        }

        c[l >> 2] = ub(c[i >> 2] | 0) | 0;
        c[m >> 2] = p;
        s = qb(c[e >> 2] | 0) | 0;
        c[n >> 2] = (ub(c[e >> 2] | 0) | 0) + s;
        c[o >> 2] = k - s;
        s = pd(l, (p | 0) == 4096 ? 0 : 4) | 0;
        xb(c[i >> 2] | 0, 0, p - (c[m >> 2] | 0) | 0);
        rb(c[e >> 2] | 0, k - (c[o >> 2] | 0) | 0);

        if (s) {
          r = 8;
          break;
        }

        if (!((p | 0) != 0 & (qb(c[e >> 2] | 0) | 0) >>> 0 < d >>> 0)) {
          r = 8;
          break;
        }
      }

      if ((r | 0) == 8) {
        t = qb(c[e >> 2] | 0) | 0;
        break;
      } else if ((r | 0) == 12) return q | 0;
    } else t = d; while (0);

    if ((t | 0) == -1) {
      q = -1;
      return q | 0;
    }

    r = t >>> 0 < d >>> 0 ? t : d;

    if (!r) {
      q = 0;
      return q | 0;
    }

    d = tb(c[e >> 2] | 0) | 0;
    af(b | 0, d + (c[g >> 2] | 0) | 0, r | 0) | 0;
    c[g >> 2] = (c[g >> 2] | 0) + r;
    q = r;
    return q | 0;
  }

  function Eb(a) {
    a = a | 0;
    var b = 0;
    qd(a + 24 | 0) | 0;
    if (!a) return;
    b = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[a + 12 >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(b, a);
    ib(b);
    return;
  }

  function Fb(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    return Jb(a, b, c, 1, 0) | 0;
  }

  function Gb(a) {
    a = a | 0;
    var b = 0;
    Jb(a, 0, 0, 1, 4) | 0;
    id(a + 24 | 0) | 0;
    if (!a) return;
    b = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[a + 12 >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(b, a);
    ib(b);
    return;
  }

  function Hb(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    return Jb(a, b, c, 0, 0) | 0;
  }

  function Ib(a) {
    a = a | 0;
    var b = 0;
    Jb(a, 0, 0, 0, 4) | 0;
    qd(a + 24 | 0) | 0;
    if (!a) return;
    b = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[a + 12 >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(b, a);
    ib(b);
    return;
  }

  function Jb(a, b, d, e, f) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
    g = a + 16 | 0;
    h = sb(c[g >> 2] | 0) | 0;
    i = qb(c[g >> 2] | 0) | 0;
    j = a + 24 | 0;
    c[j >> 2] = b;
    b = a + 28 | 0;
    c[b >> 2] = d;
    k = a + 36 | 0;
    c[k >> 2] = (ub(c[g >> 2] | 0) | 0) + i;
    l = h - i | 0;
    m = a + 40 | 0;
    c[m >> 2] = l;
    n = (e | 0) == 0;

    a: do if ((f | 0) != 4) {
      if (n) {
        e = h;
        o = i;

        while (1) {
          if (!(c[b >> 2] | 0)) {
            p = o;
            break a;
          }

          if (!(c[m >> 2] | 0)) {
            q = o + 4096 | 0;
            rb(c[g >> 2] | 0, q);
            rb(c[g >> 2] | 0, o);
            c[k >> 2] = (ub(c[g >> 2] | 0) | 0) + o;
            c[m >> 2] = 4096;
            r = q;
          } else r = e;

          q = pd(j, f) | 0;
          s = r - (c[m >> 2] | 0) | 0;
          rb(c[g >> 2] | 0, s);

          if (!q) {
            e = r;
            o = s;
          } else {
            p = s;
            break;
          }
        }
      } else {
        o = h;
        e = i;

        while (1) {
          if (!(c[b >> 2] | 0)) {
            p = e;
            break a;
          }

          if (!(c[m >> 2] | 0)) {
            s = e + 4096 | 0;
            rb(c[g >> 2] | 0, s);
            rb(c[g >> 2] | 0, e);
            c[k >> 2] = (ub(c[g >> 2] | 0) | 0) + e;
            c[m >> 2] = 4096;
            t = s;
          } else t = o;

          s = kd(j, f) | 0;
          q = t - (c[m >> 2] | 0) | 0;
          rb(c[g >> 2] | 0, q);

          if (!s) {
            o = t;
            e = q;
          } else {
            p = q;
            break;
          }
        }
      }
    } else {
      e = l;
      o = h;
      q = i;

      while (1) {
        if (!e) {
          s = q + 4096 | 0;
          rb(c[g >> 2] | 0, s);
          rb(c[g >> 2] | 0, q);
          c[k >> 2] = (ub(c[g >> 2] | 0) | 0) + q;
          c[m >> 2] = 4096;
          u = s;
        } else u = o;

        if (n) v = pd(j, 4) | 0;else v = kd(j, 4) | 0;
        s = u - (c[m >> 2] | 0) | 0;
        rb(c[g >> 2] | 0, s);

        if (v) {
          p = s;
          break a;
        }

        e = c[m >> 2] | 0;
        o = u;
        q = s;
      }
    } while (0);

    if (!p) {
      w = d;
      return w | 0;
    }

    u = c[a + 8 >> 2] | 0;
    a = Pb(u, tb(c[g >> 2] | 0) | 0, p) | 0;
    xb(c[g >> 2] | 0, 0, a);
    w = (a | 0) == (p | 0) ? d : a;
    return w | 0;
  }

  function Kb(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;
    f = jb(a, 24) | 0;
    c[f >> 2] = 1;
    c[f + 4 >> 2] = hb(a) | 0;
    c[f + 8 >> 2] = b;
    c[f + 12 >> 2] = 0;
    c[f + 16 >> 2] = d;
    c[f + 20 >> 2] = e;
    return f | 0;
  }

  function Lb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    d = ob(b) | 0;
    b = jb(a, 24) | 0;
    c[b >> 2] = 1;
    c[b + 4 >> 2] = hb(a) | 0;
    c[b + 8 >> 2] = d;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 8;
    c[b + 20 >> 2] = 4;
    return b | 0;
  }

  function Mb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0;
    d = le(b, 13478) | 0;

    if (!d) {
      e = 0;
      return e | 0;
    }

    b = jb(a, 24) | 0;
    c[b >> 2] = 1;
    c[b + 4 >> 2] = hb(a) | 0;
    c[b + 8 >> 2] = d;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 9;
    c[b + 20 >> 2] = 5;
    e = b;
    return e | 0;
  }

  function Nb(a) {
    a = a | 0;
    if (!a) return a | 0;
    c[a >> 2] = (c[a >> 2] | 0) + 1;
    return a | 0;
  }

  function Ob(a) {
    a = a | 0;
    var b = 0;
    if (!a) return;
    b = (c[a >> 2] | 0) + -1 | 0;
    c[a >> 2] = b;
    if (b) return;
    b = c[a + 20 >> 2] | 0;
    if (b) ia(b | 0, c[a + 8 >> 2] | 0);
    b = c[a + 4 >> 2] | 0;
    lb(b, a);
    ib(b);
    return;
  }

  function Pb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0;

    if (!a) {
      e = 0;
      return e | 0;
    }

    f = c[a + 16 >> 2] | 0;

    if (!((d | 0) != 0 & (f | 0) != 0)) {
      e = 0;
      return e | 0;
    }

    g = ea(f | 0, c[a + 8 >> 2] | 0, b | 0, d | 0) | 0;
    d = a + 12 | 0;
    c[d >> 2] = (c[d >> 2] | 0) + g;
    e = g;
    return e | 0;
  }

  function Qb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0;
    d = i;
    i = i + 4096 | 0;
    e = d;
    f = b + 16 | 0;
    g = b + 8 | 0;
    h = b + 12 | 0;

    if (!b) {
      b = 0;

      while (1) {
        j = Gc(a, e, 4096) | 0;

        if ((j | 0) == -1) {
          k = -1;
          l = 8;
          break;
        }

        m = j + b | 0;

        if (!j) {
          k = m;
          l = 8;
          break;
        } else b = m;
      }

      if ((l | 0) == 8) {
        i = d;
        return k | 0;
      }
    } else n = 0;

    while (1) {
      b = Gc(a, e, 4096) | 0;

      if ((b | 0) == -1) {
        k = -1;
        l = 8;
        break;
      }

      m = c[f >> 2] | 0;

      if ((b | 0) != 0 & (m | 0) != 0) {
        j = ea(m | 0, c[g >> 2] | 0, e | 0, b | 0) | 0;
        c[h >> 2] = (c[h >> 2] | 0) + j;
      }

      j = b + n | 0;

      if (!b) {
        k = j;
        l = 8;
        break;
      } else n = j;
    }

    if ((l | 0) == 8) {
      i = d;
      return k | 0;
    }

    return 0;
  }

  function Rb(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    var d = 0;

    if (!a) {
      d = 0;
      return d | 0;
    }

    wb(a, b, c);
    d = c;
    return d | 0;
  }

  function Sb(a) {
    a = a | 0;
    pb(a);
    return;
  }

  function Tb(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    var d = 0;

    if (!a) {
      d = 0;
      return d | 0;
    }

    d = Be(b, 1, c, a) | 0;
    return d | 0;
  }

  function Ub(a) {
    a = a | 0;
    if (!a) return;
    Ce(a) | 0;
    return;
  }

  function Vb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0;
    e = jb(a, 32) | 0;
    c[e >> 2] = hb(a) | 0;
    c[e + 4 >> 2] = Ec(0) | 0;
    c[e + 8 >> 2] = Nb(b) | 0;
    c[e + 12 >> 2] = nb(a, 4096) | 0;
    c[e + 16 >> 2] = nb(a, 4096) | 0;
    c[e + 24 >> 2] = 1;
    c[e + 28 >> 2] = 0;
    c[e + 20 >> 2] = d;
    return Kb(a, e, 10, 6) | 0;
  }

  function Wb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    d = jb(a, 32) | 0;
    c[d >> 2] = hb(a) | 0;
    c[d + 4 >> 2] = Ec(b) | 0;
    c[d + 8 >> 2] = Nb(0) | 0;
    c[d + 12 >> 2] = nb(a, 4096) | 0;
    c[d + 16 >> 2] = nb(a, 4096) | 0;
    c[d + 20 >> 2] = 0;
    c[d + 24 >> 2] = 1;
    c[d + 28 >> 2] = 0;
    return zc(a, d, 11, 7) | 0;
  }

  function Xb(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0;
    e = jb(a, 32) | 0;
    c[e >> 2] = hb(a) | 0;
    c[e + 4 >> 2] = Ec(0) | 0;
    c[e + 8 >> 2] = Nb(b) | 0;
    c[e + 12 >> 2] = nb(a, 4096) | 0;
    c[e + 16 >> 2] = nb(a, 4096) | 0;
    c[e + 24 >> 2] = 1;
    c[e + 28 >> 2] = 0;
    c[e + 20 >> 2] = d;
    return Kb(a, e, 12, 8) | 0;
  }

  function Yb(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    d = jb(a, 32) | 0;
    c[d >> 2] = hb(a) | 0;
    c[d + 4 >> 2] = Ec(b) | 0;
    c[d + 8 >> 2] = Nb(0) | 0;
    c[d + 12 >> 2] = nb(a, 4096) | 0;
    c[d + 16 >> 2] = nb(a, 4096) | 0;
    c[d + 20 >> 2] = 0;
    c[d + 24 >> 2] = 1;
    c[d + 28 >> 2] = 0;
    return zc(a, d, 13, 7) | 0;
  }

  function Zb(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;
    f = jb(a, 32) | 0;
    c[f >> 2] = hb(a) | 0;
    c[f + 4 >> 2] = Ec(0) | 0;
    c[f + 8 >> 2] = Nb(b) | 0;
    c[f + 12 >> 2] = nb(a, 4096) | 0;
    c[f + 16 >> 2] = nb(a, 4096) | 0;
    c[f + 28 >> 2] = 0;
    c[f + 20 >> 2] = d;
    c[f + 24 >> 2] = e;
    return Kb(a, f, 14, 9) | 0;
  }

  function _b(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    d = jb(a, 32) | 0;
    c[d >> 2] = hb(a) | 0;
    c[d + 4 >> 2] = Ec(b) | 0;
    c[d + 8 >> 2] = Nb(0) | 0;
    c[d + 12 >> 2] = nb(a, 4096) | 0;
    c[d + 16 >> 2] = nb(a, 4096) | 0;
    c[d + 20 >> 2] = 0;
    c[d + 24 >> 2] = 1;
    c[d + 28 >> 2] = 0;
    return zc(a, d, 15, 7) | 0;
  }

  function $b(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0;
    d = i;
    i = i + 16 | 0;
    e = d;
    c[e >> 2] = a;
    a = ac(e, b) | 0;
    i = d;
    return a | 0;
  }

  function ac(b, e) {
    b = b | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0;
    f = c[b >> 2] | 0;

    if (!e) {
      if (!f) {
        g = -1;
        return g | 0;
      }

      if (!(a[f >> 0] | 0)) {
        g = -1;
        return g | 0;
      }

      h = f + 1 | 0;

      if (a[h >> 0] | 0) {
        i = f + 2 | 0;

        if (a[i >> 0] | 0) {
          j = f + 3 | 0;

          if (a[j >> 0] | 0) {
            k = f + 4 | 0;

            if (a[k >> 0] | 0) {
              l = f + 5 | 0;

              if (a[l >> 0] | 0) {
                m = f + 6 | 0;

                if (a[m >> 0] | 0) {
                  n = f + 7 | 0;

                  if (a[n >> 0] | 0) {
                    o = f + 8 | 0;
                    if (!(a[o >> 0] | 0)) p = o;else {
                      o = f + 9 | 0;
                      p = (a[o >> 0] | 0) == 0 ? o : f + 10 | 0;
                    }
                  } else p = n;
                } else p = m;
              } else p = l;
            } else p = k;
          } else p = j;
        } else p = i;
      } else p = h;
    } else if ((f | 0) == (e | 0)) {
      g = -1;
      return g | 0;
    } else p = e;

    e = f;

    a: while (1) {
      f = e + 1 | 0;
      h = a[e >> 0] | 0;

      if (h << 24 >> 24 != 92) {
        q = f;
        r = h;
        s = 8;
        break;
      }

      if ((f | 0) == (p | 0)) {
        g = -1;
        s = 48;
        break;
      }

      h = e;
      e = e + 2 | 0;
      i = d[f >> 0] | 0;

      switch (i | 0) {
        case 34:
          {
            t = e;
            s = 14;
            break a;
            break;
          }

        case 39:
          {
            u = e;
            s = 15;
            break a;
            break;
          }

        case 46:
          {
            v = e;
            w = h;
            s = 16;
            break a;
            break;
          }

        case 55:
        case 54:
        case 53:
        case 52:
        case 51:
        case 50:
        case 49:
        case 48:
          {
            x = e;
            y = i;
            z = h;
            s = 13;
            break a;
            break;
          }

        case 58:
          {
            A = e;
            B = h;
            s = 21;
            break a;
            break;
          }

        case 63:
          {
            C = e;
            s = 23;
            break a;
            break;
          }

        case 92:
          {
            D = e;
            s = 24;
            break a;
            break;
          }

        case 97:
          {
            E = e;
            s = 25;
            break a;
            break;
          }

        case 98:
          {
            F = e;
            s = 26;
            break a;
            break;
          }

        case 102:
          {
            G = e;
            s = 27;
            break a;
            break;
          }

        case 110:
          {
            H = e;
            s = 28;
            break a;
            break;
          }

        case 114:
          {
            I = e;
            s = 29;
            break a;
            break;
          }

        case 116:
          {
            J = e;
            s = 30;
            break a;
            break;
          }

        case 118:
          {
            K = e;
            s = 31;
            break a;
            break;
          }

        case 120:
          {
            L = e;
            s = 12;
            break a;
            break;
          }

        case 13:
        case 10:
          break;

        default:
          {
            g = -1;
            s = 48;
            break a;
          }
      }

      if ((e | 0) == (p | 0)) {
        g = -1;
        s = 48;
        break;
      }
    }

    switch (s | 0) {
      case 8:
        {
          c[b >> 2] = q;
          g = r & 255;
          return g | 0;
        }

      case 12:
        {
          if ((L | 0) == (p | 0)) {
            g = -1;
            return g | 0;
          } else {
            M = 0;
            N = L;
          }

          b: while (1) {
            L = a[N >> 0] | 0;
            r = L & 255;
            if ((L + -48 & 255) < 10) O = r & 15 | M << 4;else {
              switch (L << 24 >> 24) {
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 97:
                case 98:
                case 99:
                case 100:
                case 101:
                case 102:
                  break;

                default:
                  {
                    P = M;
                    Q = N;
                    break b;
                  }
              }

              O = (r & 15) + (M << 4 | 9) | 0;
            }
            N = N + 1 | 0;

            if ((N | 0) == (p | 0)) {
              g = -1;
              s = 48;
              break;
            } else M = O;
          }

          if ((s | 0) == 48) return g | 0;
          c[b >> 2] = Q;
          g = P;
          return g | 0;
        }

      case 13:
        {
          P = y & 7;

          if ((x | 0) == (p | 0)) {
            g = -1;
            return g | 0;
          }

          y = a[x >> 0] | 0;

          if ((y & -8) << 24 >> 24 == 48) {
            Q = z + 3 | 0;
            s = y & 7 | P << 3;

            if ((Q | 0) == (p | 0)) {
              g = -1;
              return g | 0;
            }

            y = a[Q >> 0] | 0;

            if ((y & -8) << 24 >> 24 == 48) {
              c[b >> 2] = z + 4;
              g = y & 7 | s << 3;
              return g | 0;
            } else {
              R = s;
              S = Q;
            }
          } else {
            R = P;
            S = x;
          }

          c[b >> 2] = S;
          g = R;
          return g | 0;
        }

      case 14:
        {
          c[b >> 2] = t;
          g = 34;
          return g | 0;
        }

      case 15:
        {
          c[b >> 2] = u;
          g = 39;
          return g | 0;
        }

      case 16:
        {
          u = w + 4 | 0;

          if (u >>> 0 > p >>> 0) {
            g = -1;
            return g | 0;
          }

          t = a[v >> 0] | 0;
          v = (t & 255) << 4 & 240;
          R = a[w + 3 >> 0] | 0;
          w = R & 15;
          c[b >> 2] = u;
          g = ((t & 255) < 65 ? v : v + 144 | 0) + ((R & 255) < 65 ? w : w + 9 | 0) | 0;
          return g | 0;
        }

      case 21:
        {
          w = B + 6 | 0;

          if (w >>> 0 > p >>> 0) {
            g = -1;
            return g | 0;
          }

          p = a[A >> 0] | 0;
          A = p & 15;
          R = a[B + 3 >> 0] | 0;
          v = R & 15;
          t = a[B + 4 >> 0] | 0;
          u = t & 15;
          S = a[B + 5 >> 0] | 0;
          B = S & 15;
          c[b >> 2] = w;
          g = ((((R & 255) < 65 ? v : v + 9 | 0) + (((p & 255) < 65 ? A : A + 9 | 0) << 4) << 4) + ((t & 255) < 65 ? u : u + 9 | 0) << 4) + ((S & 255) < 65 ? B : B + 9 | 0) | 0;
          return g | 0;
        }

      case 23:
        {
          c[b >> 2] = C;
          g = 63;
          return g | 0;
        }

      case 24:
        {
          c[b >> 2] = D;
          g = 92;
          return g | 0;
        }

      case 25:
        {
          c[b >> 2] = E;
          g = 7;
          return g | 0;
        }

      case 26:
        {
          c[b >> 2] = F;
          g = 8;
          return g | 0;
        }

      case 27:
        {
          c[b >> 2] = G;
          g = 12;
          return g | 0;
        }

      case 28:
        {
          c[b >> 2] = H;
          g = 10;
          return g | 0;
        }

      case 29:
        {
          c[b >> 2] = I;
          g = 13;
          return g | 0;
        }

      case 30:
        {
          c[b >> 2] = J;
          g = 9;
          return g | 0;
        }

      case 31:
        {
          c[b >> 2] = K;
          g = 11;
          return g | 0;
        }

      case 48:
        return g | 0;
    }

    return 0;
  }

  function bc(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    return qc(a, 1, 2, b, c, 0) | 0;
  }

  function cc(a) {
    a = a | 0;
    var b = 0,
        d = 0;
    b = a + 12 | 0;
    if (qb(c[b >> 2] | 0) | 0) qc(a, 1, 2, 0, 0, 1) | 0;
    d = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[b >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(d, a);
    ib(d);
    return;
  }

  function dc(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0;
    e = nc(a, 1, 3, d) | 0;

    if ((e | 0) == -1) {
      f = -1;
      return f | 0;
    }

    g = e >>> 0 < d >>> 0 ? e : d;

    if (!g) {
      f = 0;
      return f | 0;
    }

    d = a + 16 | 0;
    af(b | 0, tb(c[d >> 2] | 0) | 0, g | 0) | 0;
    xb(c[d >> 2] | 0, 0, g);
    f = g;
    return f | 0;
  }

  function ec(a) {
    a = a | 0;
    var b = 0;
    if (!a) return;
    b = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[a + 12 >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(b, a);
    ib(b);
    return;
  }

  function fc(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    return qc(a, 2, 4, b, c, 0) | 0;
  }

  function gc(a) {
    a = a | 0;
    var b = 0,
        d = 0;
    b = a + 12 | 0;
    if (qb(c[b >> 2] | 0) | 0) qc(a, 2, 4, 0, 0, 1) | 0;
    d = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[b >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(d, a);
    ib(d);
    return;
  }

  function hc(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0;
    e = nc(a, 2, 5, d) | 0;

    if ((e | 0) == -1) {
      f = -1;
      return f | 0;
    }

    g = e >>> 0 < d >>> 0 ? e : d;

    if (!g) {
      f = 0;
      return f | 0;
    }

    d = a + 16 | 0;
    af(b | 0, tb(c[d >> 2] | 0) | 0, g | 0) | 0;
    xb(c[d >> 2] | 0, 0, g);
    f = g;
    return f | 0;
  }

  function ic(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    return qc(a, 3, 6, b, c, 0) | 0;
  }

  function jc(a) {
    a = a | 0;
    var b = 0,
        d = 0;
    b = a + 12 | 0;
    if (qb(c[b >> 2] | 0) | 0) qc(a, 3, 6, 0, 0, 1) | 0;
    d = c[a >> 2] | 0;
    Fc(c[a + 4 >> 2] | 0);
    Ob(c[a + 8 >> 2] | 0);
    pb(c[b >> 2] | 0);
    pb(c[a + 16 >> 2] | 0);
    lb(d, a);
    ib(d);
    return;
  }

  function kc(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0;
    e = nc(a, 3, 7, d) | 0;

    if ((e | 0) == -1) {
      f = -1;
      return f | 0;
    }

    g = e >>> 0 < d >>> 0 ? e : d;

    if (!g) {
      f = 0;
      return f | 0;
    }

    d = a + 16 | 0;
    af(b | 0, tb(c[d >> 2] | 0) | 0, g | 0) | 0;
    xb(c[d >> 2] | 0, 0, g);
    f = g;
    return f | 0;
  }

  function lc(b, d, e, f, g) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0;
    h = i;
    i = i + 16 | 0;
    j = h + 4 | 0;
    k = h;
    c[k >> 2] = b;
    l = c[d >> 2] | 0;
    m = b + l | 0;
    n = c[f >> 2] | 0;
    o = e + n | 0;

    a: do if ((n | 0) > 3 ? (p = (g | 0) == 0, (l | 0) > 0) : 0) {
      q = b;
      r = e + 3 | 0;
      s = e;

      while (1) {
        b: do if (q >>> 0 < m >>> 0) {
          t = q;
          u = 0;

          while (1) {
            if ((u | 0) == 122 | (u + -33 | 0) >>> 0 < 85) {
              v = u;
              w = 9;
              break b;
            }

            c[j >> 2] = t;
            x = ac(j, m) | 0;
            ac(k, m) | 0;

            if ((x | 0) < 0) {
              y = x;
              w = 8;
              break b;
            }

            t = c[k >> 2] | 0;

            if (t >>> 0 >= m >>> 0) {
              v = x;
              w = 9;
              break;
            } else u = x;
          }
        } else {
          v = 0;
          w = 9;
        } while (0);

        if ((w | 0) == 9) {
          w = 0;

          if ((v | 0) == 122) {
            a[s >> 0] = 0;
            a[s + 1 >> 0] = 0;
            a[s + 2 >> 0] = 0;
            a[r >> 0] = 0;
            z = s + 4 | 0;
          } else {
            y = v;
            w = 8;
          }
        }

        if ((w | 0) == 8) {
          w = 0;
          u = 0;

          while (1) {
            t = c[k >> 2] | 0;

            if (t >>> 0 >= m >>> 0) {
              A = u;
              break;
            }

            if ((u | 0) == 122 | (u + -33 | 0) >>> 0 < 85) {
              A = u;
              break;
            }

            c[j >> 2] = t;
            t = ac(j, m) | 0;
            ac(k, m) | 0;

            if ((t | 0) < 0) {
              A = t;
              break;
            } else u = t;
          }

          u = 0;

          while (1) {
            t = c[k >> 2] | 0;

            if (t >>> 0 >= m >>> 0) {
              B = u;
              break;
            }

            if ((u | 0) == 122 | (u + -33 | 0) >>> 0 < 85) {
              B = u;
              break;
            }

            c[j >> 2] = t;
            t = ac(j, m) | 0;
            ac(k, m) | 0;

            if ((t | 0) < 0) {
              B = t;
              break;
            } else u = t;
          }

          u = 0;

          while (1) {
            t = c[k >> 2] | 0;

            if (t >>> 0 >= m >>> 0) {
              C = u;
              break;
            }

            if ((u | 0) == 122 | (u + -33 | 0) >>> 0 < 85) {
              C = u;
              break;
            }

            c[j >> 2] = t;
            t = ac(j, m) | 0;
            ac(k, m) | 0;

            if ((t | 0) < 0) {
              C = t;
              break;
            } else u = t;
          }

          u = 0;

          while (1) {
            t = c[k >> 2] | 0;

            if (t >>> 0 >= m >>> 0) {
              D = u;
              break;
            }

            if ((u | 0) == 122 | (u + -33 | 0) >>> 0 < 85) {
              D = u;
              break;
            }

            c[j >> 2] = t;
            t = ac(j, m) | 0;
            ac(k, m) | 0;

            if ((t | 0) < 0) {
              D = t;
              break;
            } else u = t;
          }

          if ((y + -33 | 0) >>> 0 >= 85) {
            E = q;
            F = s;
            break;
          }

          if (!((A | 0) == 122 | (A + -33 | 0) >>> 0 < 85)) {
            E = q;
            F = s;
            break;
          }

          if (p) {
            u = B + -33 | 0;

            if (!((B | 0) == 122 | u >>> 0 < 85)) {
              E = q;
              F = s;
              break;
            }

            if (!((C | 0) == 122 | (C + -33 | 0) >>> 0 < 85)) {
              E = q;
              F = s;
              break;
            }

            t = D + -33 | 0;

            if ((D | 0) == 122 | t >>> 0 < 85) {
              G = t;
              H = u;
            } else {
              E = q;
              F = s;
              break;
            }
          } else {
            G = D + -33 | 0;
            H = B + -33 | 0;
          }

          u = _(y, 52200625) | 0;
          t = u + -1742886750 + (A * 614125 | 0) + ((B | 0) > 32 ? (B * 7225 | 0) + -238425 | 0 : 606900) + ((C | 0) > 32 ? (C * 85 | 0) + -2805 | 0 : 7140) + ((D | 0) > 32 ? G : 84) | 0;
          u = s + 1 | 0;
          a[s >> 0] = t >>> 24;

          if ((B | 0) == 122 | H >>> 0 < 85) {
            x = s + 2 | 0;
            a[u >> 0] = t >>> 16;

            if ((C | 0) == 122 | (C + -33 | 0) >>> 0 < 85) {
              a[x >> 0] = t >>> 8;

              if ((D | 0) == 122 | G >>> 0 < 85) {
                a[r >> 0] = t;
                z = s + 4 | 0;
              } else z = r;
            } else z = x;
          } else z = u;
        }

        r = z + 3 | 0;
        u = c[k >> 2] | 0;

        if (!(r >>> 0 < o >>> 0 & u >>> 0 < m >>> 0)) {
          I = u;
          J = z;
          break a;
        } else {
          q = u;
          s = z;
        }
      }

      c[k >> 2] = E;
      I = E;
      J = F;
    } else {
      I = b;
      J = e;
    } while (0);

    c[d >> 2] = I - b;
    c[f >> 2] = J - e;

    if (!(c[d >> 2] | 0)) {
      i = h;
      return;
    }

    if (!((g | 0) != 0 & (J | 0) == (e | 0))) {
      i = h;
      return;
    }

    c[f >> 2] = -1;
    i = h;
    return;
  }

  function mc(a) {
    a = a | 0;
    return (~~(+(a << 2 >>> 0) / 5.0) >>> 0) + 16 | 0;
  }

  function nc(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
    f = i;
    i = i + 16 | 0;
    g = f + 4 | 0;
    h = f;
    j = a + 16 | 0;

    if ((qb(c[j >> 2] | 0) | 0) >>> 0 > e >>> 0) {
      k = e;
      i = f;
      return k | 0;
    }

    l = a + 12 | 0;
    m = a + 4 | 0;

    while (1) {
      a = qb(c[l >> 2] | 0) | 0;

      if ((Jc(c[m >> 2] | 0, c[l >> 2] | 0, 4096) | 0) == -1) {
        k = -1;
        n = 9;
        break;
      }

      o = qb(c[l >> 2] | 0) | 0;
      p = tb(c[l >> 2] | 0) | 0;
      q = c[j >> 2] | 0;
      r = (o | 0) == (a | 0);
      c[g >> 2] = o;
      a = qb(q) | 0;
      s = ma(d | 0, o | 0) | 0;
      c[h >> 2] = s;
      rb(q, s + a | 0);
      ga(b | 0, p | 0, g | 0, (ub(q) | 0) + a | 0, h | 0, r & 1 | 0);
      p = c[h >> 2] | 0;

      if ((p | 0) == -1) {
        n = 5;
        break;
      }

      rb(q, p + a | 0);
      a = c[g >> 2] | 0;

      if ((a | 0) == -1) {
        k = -1;
        n = 9;
        break;
      }

      xb(c[l >> 2] | 0, 0, a);

      if (r & (a | 0) == 0 | (qb(c[j >> 2] | 0) | 0) >>> 0 >= e >>> 0) {
        n = 8;
        break;
      }
    }

    if ((n | 0) == 5) {
      k = -1;
      i = f;
      return k | 0;
    } else if ((n | 0) == 8) {
      k = qb(c[j >> 2] | 0) | 0;
      i = f;
      return k | 0;
    } else if ((n | 0) == 9) {
      i = f;
      return k | 0;
    }

    return 0;
  }

  function oc(b, e, f, g, h, j, k, l) {
    b = b | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    j = j | 0;
    k = k | 0;
    l = l | 0;
    var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0;
    m = i;
    i = i + 16 | 0;
    n = m;
    o = c[h >> 2] | 0;
    p = c[g >> 2] | 0;

    if (p >>> 0 <= 4) {
      q = 0;
      r = 0;
      s = o;
      c[e >> 2] = r;
      c[g >> 2] = q;
      c[h >> 2] = s;
      i = m;
      return;
    }

    t = n + 4 | 0;
    u = n + 3 | 0;
    v = n + 2 | 0;
    w = n + 1 | 0;
    x = (k | 0) == 0;
    k = (l | 0) != 0;
    l = p;
    p = 0;
    y = 0;
    z = o;

    while (1) {
      o = y + 3 | 0;
      A = c[e >> 2] | 0;
      B = o >>> 0 < A >>> 0;

      if (B) {
        C = a[b + y >> 0] | 0;
        if (!(C << 24 >> 24)) {
          if (((a[b + (y + 1) >> 0] | 0) == 0 ? (a[b + (y + 2) >> 0] | 0) == 0 : 0) ? (a[b + o >> 0] | 0) == 0 : 0) {
            a[f + p >> 0] = 122;
            D = p + 1 | 0;
            E = y + 4 | 0;
          } else {
            F = 0;
            G = 11;
          }
        } else {
          F = C;
          G = 11;
        }
      } else {
        if (!(k & y >>> 0 < A >>> 0)) {
          q = p;
          r = y;
          s = z;
          G = 35;
          break;
        }

        F = a[b + y >> 0] | 0;
        G = 11;
      }

      if ((G | 0) == 11) {
        G = 0;
        C = y + 1 | 0;
        H = (F & 255) << 24;

        if (C >>> 0 < A >>> 0) {
          I = y + 2 | 0;
          J = d[b + C >> 0] << 16 | H;

          if (I >>> 0 < A >>> 0) {
            A = d[b + I >> 0] << 8 | J;

            if (B) {
              K = 5;
              L = y + 4 | 0;
              M = d[b + o >> 0] | A;
            } else {
              K = 4;
              L = o;
              M = A;
            }
          } else {
            K = 3;
            L = I;
            M = J;
          }
        } else {
          K = 2;
          L = C;
          M = H;
        }

        a[t >> 0] = ((M >>> 0) % 85 | 0) + 33;
        a[u >> 0] = ((((M >>> 0) / 85 | 0) >>> 0) % 85 | 0) + 33;
        a[v >> 0] = ((((M >>> 0) / 7225 | 0) >>> 0) % 85 | 0) + 33;
        a[w >> 0] = ((((M >>> 0) / 614125 | 0) >>> 0) % 85 | 0) + 33;
        a[n >> 0] = ((M >>> 0) / 52200625 | 0) + 33;
        H = p >>> 0 < l >>> 0;

        a: do if (x) {
          if (H) {
            C = 0;
            J = p;

            while (1) {
              a[f + J >> 0] = a[n + C >> 0] | 0;
              I = J + 1 | 0;
              A = C + 1 | 0;

              if ((A | 0) >= (K | 0)) {
                N = A;
                O = I;
                break a;
              }

              if (I >>> 0 < (c[g >> 2] | 0) >>> 0) {
                C = A;
                J = I;
              } else {
                N = A;
                O = I;
                break;
              }
            }
          } else {
            N = 0;
            O = p;
          }
        } else if (H) {
          J = l;
          C = 0;
          I = p;

          while (1) {
            A = a[n + C >> 0] | 0;

            switch (A << 24 >> 24) {
              case 34:
              case 92:
                {
                  o = I + 1 | 0;

                  if (o >>> 0 >= J >>> 0) {
                    N = C;
                    O = I;
                    break a;
                  }

                  a[f + I >> 0] = 92;
                  a[f + o >> 0] = A;
                  P = o;
                  break;
                }

              default:
                {
                  a[f + I >> 0] = A;
                  P = I;
                }
            }

            A = P + 1 | 0;
            o = C + 1 | 0;

            if ((o | 0) >= (K | 0)) {
              N = o;
              O = A;
              break a;
            }

            J = c[g >> 2] | 0;

            if (A >>> 0 >= J >>> 0) {
              N = o;
              O = A;
              break a;
            } else {
              C = o;
              I = A;
            }
          }
        } else {
          N = 0;
          O = p;
        } while (0);

        if ((N | 0) == (K | 0)) {
          D = O;
          E = L;
        } else {
          q = p;
          r = y;
          s = z;
          G = 35;
          break;
        }
      }

      H = z + 1 | 0;

      if (H >>> 0 > 11) {
        I = D + 1 | 0;

        if (I >>> 0 >= (c[g >> 2] | 0) >>> 0) {
          q = D;
          r = E;
          s = H;
          G = 35;
          break;
        }

        C = f + D | 0;

        switch (j | 0) {
          case 3:
            {
              a[C >> 0] = 13;
              a[f + I >> 0] = 10;
              Q = 2;
              break;
            }

          case 1:
            {
              a[C >> 0] = 10;
              Q = 1;
              break;
            }

          case 2:
            {
              a[C >> 0] = 13;
              Q = 1;
              break;
            }

          default:
            Q = 0;
        }

        R = Q + D | 0;
        S = 0;
      } else {
        R = D;
        S = H;
      }

      l = c[g >> 2] | 0;

      if ((R + 4 | 0) >>> 0 >= l >>> 0) {
        q = R;
        r = E;
        s = S;
        G = 35;
        break;
      } else {
        p = R;
        y = E;
        z = S;
      }
    }

    if ((G | 0) == 35) {
      c[e >> 2] = r;
      c[g >> 2] = q;
      c[h >> 2] = s;
      i = m;
      return;
    }
  }

  function pc(a) {
    a = a | 0;
    return (~~(+((a * 5 | 0) >>> 0) * .25 + +(a >>> 0) * 2.0 / 48.0) >>> 0) + 16 | 0;
  }

  function qc(a, b, d, e, f, g) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
    h = i;
    i = i + 16 | 0;
    j = h + 4 | 0;
    k = h;
    l = a + 12 | 0;

    if (!(qb(c[l >> 2] | 0) | 0)) {
      m = a + 16 | 0;
      n = c[m >> 2] | 0;
      o = c[a + 20 >> 2] | 0;
      p = c[a + 24 >> 2] | 0;
      c[j >> 2] = f;
      q = qb(n) | 0;
      r = ma(d | 0, f | 0) | 0;
      c[k >> 2] = r;
      rb(n, r + q | 0);
      qa(b | 0, e | 0, j | 0, (ub(n) | 0) + q | 0, k | 0, a + 28 | 0, o | 0, p | 0, g | 0);
      rb(n, (c[k >> 2] | 0) + q | 0);
      q = c[j >> 2] | 0;
      vb(c[l >> 2] | 0, e + q | 0, f - q | 0);
      s = m;
    } else {
      wb(c[l >> 2] | 0, e, f);
      e = tb(c[l >> 2] | 0) | 0;
      m = qb(c[l >> 2] | 0) | 0;
      q = a + 16 | 0;
      n = c[q >> 2] | 0;
      p = c[a + 20 >> 2] | 0;
      o = c[a + 24 >> 2] | 0;
      c[j >> 2] = m;
      r = qb(n) | 0;
      t = ma(d | 0, m | 0) | 0;
      c[k >> 2] = t;
      rb(n, t + r | 0);
      qa(b | 0, e | 0, j | 0, (ub(n) | 0) + r | 0, k | 0, a + 28 | 0, p | 0, o | 0, g | 0);
      rb(n, (c[k >> 2] | 0) + r | 0);
      xb(c[l >> 2] | 0, 0, c[j >> 2] | 0);
      s = q;
    }

    q = qb(c[s >> 2] | 0) | 0;
    j = c[a + 8 >> 2] | 0;
    a = Pb(j, ub(c[s >> 2] | 0) | 0, q) | 0;
    j = c[s >> 2] | 0;

    if ((a | 0) == (q | 0)) {
      rb(j, 0);
      u = f;
      i = h;
      return u | 0;
    } else {
      rb(j, q);
      xb(c[s >> 2] | 0, 0, a);
      u = a;
      i = h;
      return u | 0;
    }

    return 0;
  }

  function rc(b, d, e, f, g) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0;
    h = i;
    i = i + 16 | 0;
    j = h + 4 | 0;
    k = h;
    c[k >> 2] = b;
    l = c[d >> 2] | 0;
    m = b + l | 0;
    n = c[f >> 2] | 0;
    o = e + n | 0;

    a: do if ((n | 0) > 0 ? (l | 0) > 1 : 0) {
      p = b;
      q = e;

      b: while (1) {
        c: do if (p >>> 0 < m >>> 0) {
          r = p;
          s = 0;

          while (1) {
            switch (s | 0) {
              case 65:
              case 66:
              case 67:
              case 68:
              case 69:
              case 70:
              case 97:
              case 98:
              case 99:
              case 100:
              case 101:
              case 102:
                {
                  t = s;
                  break c;
                  break;
                }

              default:
                {}
            }

            c[j >> 2] = r;
            u = ac(j, m) | 0;
            ac(k, m) | 0;

            if ((u | 0) < 0) {
              t = u;
              break c;
            }

            r = c[k >> 2] | 0;

            if (r >>> 0 >= m >>> 0 | (u + -48 | 0) >>> 0 < 10) {
              t = u;
              break c;
            } else s = u;
          }
        } else t = 0; while (0);

        s = 0;

        d: while (1) {
          r = c[k >> 2] | 0;

          if (r >>> 0 >= m >>> 0 | (s + -48 | 0) >>> 0 < 10) {
            v = s;
            w = 11;
            break;
          }

          switch (s | 0) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              {
                x = s;
                break d;
                break;
              }

            default:
              {}
          }

          c[j >> 2] = r;
          s = ac(j, m) | 0;
          ac(k, m) | 0;

          if ((s | 0) < 0) {
            y = p;
            z = q;
            break b;
          }
        }

        if ((w | 0) == 11) {
          w = 0;

          if ((v | 0) < 1) {
            y = p;
            z = q;
            break;
          } else x = v;
        }

        s = t & 255;
        r = t << 24 >> 24;

        do if ((s + -48 & 255) >= 10) {
          if ((s + -65 & 255) < 6) {
            A = r + -55 | 0;
            break;
          } else {
            A = (s + -97 & 255) < 6 ? r + -87 | 0 : 255;
            break;
          }
        } else A = r + -48 | 0; while (0);

        r = A << 4;
        s = x & 255;
        u = x << 24 >> 24;

        do if ((s + -48 & 255) >= 10) {
          if ((s + -65 & 255) < 6) {
            B = u + -55 | 0;
            break;
          } else {
            B = (s + -97 & 255) < 6 ? u + -87 | 0 : 255;
            break;
          }
        } else B = u + -48 | 0; while (0);

        u = q + 1 | 0;
        a[q >> 0] = B | r;
        s = c[k >> 2] | 0;

        if (u >>> 0 < o >>> 0 & (s + 1 | 0) >>> 0 < m >>> 0) {
          p = s;
          q = u;
        } else {
          C = s;
          D = u;
          break a;
        }
      }

      c[k >> 2] = y;
      C = y;
      D = z;
    } else {
      C = b;
      D = e;
    } while (0);

    c[d >> 2] = C - b;
    c[f >> 2] = D - e;

    if (!(c[d >> 2] | 0)) {
      i = h;
      return;
    }

    if (!((g | 0) != 0 & (D | 0) == (e | 0))) {
      i = h;
      return;
    }

    c[f >> 2] = -1;
    i = h;
    return;
  }

  function sc(a) {
    a = a | 0;
    return ~~(+(a >>> 0) * .5 + 16.0) >>> 0 | 0;
  }

  function tc(b, e, f, g, h, i, j, k) {
    b = b | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    i = i | 0;
    j = j | 0;
    k = k | 0;
    var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0;
    k = c[h >> 2] | 0;

    a: do if ((c[g >> 2] | 0) >>> 0 > 1) {
      if ((i | 0) == 3) {
        j = 1;
        l = 0;
        m = 0;
        n = k;

        while (1) {
          if (m >>> 0 >= (c[e >> 2] | 0) >>> 0) {
            o = l;
            p = m;
            q = n;
            break a;
          }

          r = b + m | 0;
          s = a[r >> 0] | 0;
          t = (s & 255) >>> 4 & 255;
          a[f + l >> 0] = (s & 255) < 160 ? t | 48 : t + 55 | 0;
          t = (d[r >> 0] | 0) & 15;
          r = l + 2 | 0;
          a[f + j >> 0] = (t & 255) < 10 ? t | 48 : t + 55 | 0;
          t = m + 1 | 0;
          s = n + 1 | 0;

          if (s >>> 0 > 44) {
            u = l + 3 | 0;

            if (u >>> 0 >= (c[g >> 2] | 0) >>> 0) {
              o = r;
              p = t;
              q = s;
              break a;
            }

            a[f + r >> 0] = 13;
            a[f + u >> 0] = 10;
            v = l + 4 | 0;
            w = 0;
          } else {
            v = r;
            w = s;
          }

          j = v + 1 | 0;

          if (j >>> 0 >= (c[g >> 2] | 0) >>> 0) {
            o = v;
            p = t;
            q = w;
            break a;
          } else {
            l = v;
            m = t;
            n = w;
          }
        }
      } else {
        x = 1;
        y = 0;
        z = 0;
        A = k;
      }

      while (1) {
        if (z >>> 0 >= (c[e >> 2] | 0) >>> 0) {
          o = y;
          p = z;
          q = A;
          break a;
        }

        n = b + z | 0;
        m = a[n >> 0] | 0;
        l = (m & 255) >>> 4 & 255;
        a[f + y >> 0] = (m & 255) < 160 ? l | 48 : l + 55 | 0;
        l = (d[n >> 0] | 0) & 15;
        n = y + 2 | 0;
        a[f + x >> 0] = (l & 255) < 10 ? l | 48 : l + 55 | 0;
        l = z + 1 | 0;
        m = A + 1 | 0;

        if (m >>> 0 > 44) {
          if ((y + 3 | 0) >>> 0 >= (c[g >> 2] | 0) >>> 0) {
            o = n;
            p = l;
            q = m;
            break a;
          }

          j = f + n | 0;

          switch (i | 0) {
            case 2:
              {
                a[j >> 0] = 13;
                B = 1;
                break;
              }

            case 1:
              {
                a[j >> 0] = 10;
                B = 1;
                break;
              }

            default:
              B = 0;
          }

          C = B + n | 0;
          D = 0;
        } else {
          C = n;
          D = m;
        }

        x = C + 1 | 0;

        if (x >>> 0 >= (c[g >> 2] | 0) >>> 0) {
          o = C;
          p = l;
          q = D;
          break;
        } else {
          y = C;
          z = l;
          A = D;
        }
      }
    } else {
      o = 0;
      p = 0;
      q = k;
    } while (0);

    c[e >> 2] = p;
    c[g >> 2] = o;
    c[h >> 2] = q;
    return;
  }

  function uc(a) {
    a = a | 0;
    return ~~(+(a << 1 >>> 0) + +(a >>> 0) * 2.0 / 45.0 + 16.0) >>> 0 | 0;
  }

  function vc(b, d, e, f, g) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 0,
        na = 0,
        oa = 0,
        pa = 0,
        qa = 0,
        ra = 0,
        sa = 0;
    h = i;
    i = i + 16 | 0;
    j = h + 4 | 0;
    k = h;
    l = c[d >> 2] | 0;
    c[k >> 2] = b;
    m = b + l | 0;
    n = c[f >> 2] | 0;
    o = e + n | 0;

    a: do if ((l | 0) > 0) {
      p = b;
      q = 0;

      while (1) {
        c[j >> 2] = p;
        r = ac(j, m) | 0;

        if (((r & -33) + -65 | 0) >>> 0 < 26) {
          s = p;
          t = q;
          break a;
        }

        if ((r & -5 | 0) == 43 | (r + -48 | 0) >>> 0 < 10) {
          s = p;
          t = q;
          break a;
        }

        ac(k, m) | 0;
        r = c[k >> 2] | 0;
        u = q - p + r | 0;

        if (r >>> 0 < m >>> 0) {
          p = r;
          q = u;
        } else {
          s = r;
          t = u;
          break;
        }
      }
    } else {
      s = b;
      t = 0;
    } while (0);

    b: do if ((n | 0) > 2 ? (s + 3 | 0) >>> 0 < m >>> 0 : 0) {
      q = e + 2 | 0;
      p = s;
      u = e;
      r = t;

      while (1) {
        c: do if (p >>> 0 < m >>> 0) {
          v = p;
          w = r;

          while (1) {
            c[j >> 2] = v;
            x = ac(j, m) | 0;
            y = c[k >> 2] | 0;
            ac(k, m) | 0;
            z = c[k >> 2] | 0;

            if ((x | 0) < 0 | ((x & -33) + -65 | 0) >>> 0 < 26) {
              A = z;
              B = x;
              C = w;
              break c;
            }

            if ((x & -5 | 0) == 43 | (x + -48 | 0) >>> 0 < 10) {
              A = z;
              B = x;
              C = w;
              break c;
            }

            D = w - y + z | 0;

            if (z >>> 0 < m >>> 0) {
              v = z;
              w = D;
            } else {
              A = z;
              B = x;
              C = D;
              break;
            }
          }
        } else {
          A = p;
          B = 0;
          C = r;
        } while (0);

        d: do if (A >>> 0 < m >>> 0) {
          w = A;
          v = C;

          while (1) {
            c[j >> 2] = w;
            D = ac(j, m) | 0;
            x = c[k >> 2] | 0;
            ac(k, m) | 0;
            z = c[k >> 2] | 0;

            if ((D | 0) < 0 | ((D & -33) + -65 | 0) >>> 0 < 26) {
              E = z;
              F = D;
              G = v;
              break d;
            }

            if ((D & -5 | 0) == 43 | (D + -48 | 0) >>> 0 < 10) {
              E = z;
              F = D;
              G = v;
              break d;
            }

            y = v - x + z | 0;

            if (z >>> 0 < m >>> 0) {
              w = z;
              v = y;
            } else {
              E = z;
              F = D;
              G = y;
              break;
            }
          }
        } else {
          E = A;
          F = 0;
          G = C;
        } while (0);

        e: do if (E >>> 0 < m >>> 0) {
          v = E;
          w = G;

          f: while (1) {
            c[j >> 2] = v;
            y = ac(j, m) | 0;
            D = c[k >> 2] | 0;
            ac(k, m) | 0;
            z = c[k >> 2] | 0;
            x = z;
            H = D;

            if ((y + -48 | 0) >>> 0 < 10 | ((y | 0) < 0 | ((y & -33) + -65 | 0) >>> 0 < 26)) {
              I = z;
              J = y;
              K = w;
              break;
            }

            switch (y | 0) {
              case 43:
              case 47:
                {
                  L = z;
                  M = y;
                  N = w;
                  break e;
                  break;
                }

              case 61:
                {
                  I = z;
                  J = 61;
                  K = w;
                  break f;
                  break;
                }

              default:
                {}
            }

            D = w - H + x | 0;

            if (z >>> 0 < m >>> 0) {
              v = z;
              w = D;
            } else {
              I = z;
              J = y;
              K = D;
              break;
            }
          }

          L = I;
          M = J;
          N = K;
        } else {
          L = E;
          M = 0;
          N = G;
        } while (0);

        if (L >>> 0 >= m >>> 0) {
          O = p;
          P = u;
          Q = N;
          break;
        }

        g: do if ((M | 0) < 0) {
          c[j >> 2] = L;
          w = ac(j, m) | 0;
          ac(k, m) | 0;
          R = w;
          S = N;
          T = 27;
        } else {
          w = L;
          v = N;

          while (1) {
            c[j >> 2] = w;
            D = ac(j, m) | 0;
            y = c[k >> 2] | 0;
            ac(k, m) | 0;
            w = c[k >> 2] | 0;
            z = w;
            x = y;

            if ((D + -48 | 0) >>> 0 < 10 | ((D & -33) + -65 | 0) >>> 0 < 26) {
              R = D;
              S = v;
              T = 27;
              break g;
            }

            switch (D | 0) {
              case 43:
              case 47:
              case 61:
                {
                  U = D;
                  V = v;
                  break g;
                  break;
                }

              default:
                {}
            }

            y = v - x + z | 0;

            if (w >>> 0 >= m >>> 0) {
              R = D;
              S = y;
              T = 27;
              break g;
            } else v = y;
          }
        } while (0);

        if ((T | 0) == 27) {
          T = 0;

          if ((R | 0) < 1) {
            O = p;
            P = u;
            Q = S;
            break;
          } else {
            U = R;
            V = S;
          }
        }

        v = B & 255;
        w = B << 24 >> 24;

        do if ((v + -65 & 255) >= 26) {
          if ((v + -97 & 255) < 26) {
            W = w + -71 | 0;
            break;
          }

          if ((v + -48 & 255) < 10) {
            W = w + 4 | 0;
            break;
          } else {
            W = v << 24 >> 24 == 43 ? 62 : 63;
            break;
          }
        } else W = w + -65 | 0; while (0);

        w = W << 2;
        v = F & 255;
        y = F << 24 >> 24;
        D = (v + -65 & 255) < 26;

        do if (!D) {
          if ((v + -97 & 255) < 26) {
            X = y + -71 | 0;
            break;
          }

          if ((v + -48 & 255) < 10) {
            X = y + 4 | 0;
            break;
          } else {
            X = v << 24 >> 24 == 43 ? 62 : 63;
            break;
          }
        } else X = y + -65 | 0; while (0);

        z = u + 1 | 0;
        a[u >> 0] = X >>> 4 & 15 | w;

        if ((M | 0) == 61) {
          Y = z;
          Z = V;
          break b;
        }

        do if (!D) {
          if ((v + -97 & 255) < 26) {
            _ = y + -71 | 0;
            break;
          }

          if ((v + -48 & 255) < 10) {
            _ = y + 4 | 0;
            break;
          } else {
            _ = v << 24 >> 24 == 43 ? 62 : 63;
            break;
          }
        } else _ = y + -65 | 0; while (0);

        y = _ << 4;
        v = M & 255;
        D = M << 24 >> 24;
        w = (v + -65 & 255) < 26;

        do if (!w) {
          if ((v + -97 & 255) < 26) {
            $ = D + -71 | 0;
            break;
          }

          if ((v + -48 & 255) < 10) {
            $ = D + 4 | 0;
            break;
          } else {
            $ = v << 24 >> 24 == 43 ? 62 : 63;
            break;
          }
        } else $ = D + -65 | 0; while (0);

        a[z >> 0] = $ >>> 2 & 63 | y;

        if ((U | 0) == 61) {
          Y = q;
          Z = V;
          break b;
        }

        do if (!w) {
          if ((v + -97 & 255) < 26) {
            aa = D + -71 | 0;
            break;
          }

          if ((v + -48 & 255) < 10) {
            aa = D + 4 | 0;
            break;
          } else {
            aa = v << 24 >> 24 == 43 ? 62 : 63;
            break;
          }
        } else aa = D + -65 | 0; while (0);

        D = aa << 6;
        v = U & 255;
        w = U << 24 >> 24;

        do if ((v + -65 & 255) >= 26) {
          if ((v + -97 & 255) < 26) {
            ba = w + -71 | 0;
            break;
          }

          if ((v + -48 & 255) < 10) {
            ba = w + 4 | 0;
            break;
          } else {
            ba = v << 24 >> 24 == 43 ? 62 : 63;
            break;
          }
        } else ba = w + -65 | 0; while (0);

        w = u + 3 | 0;
        a[q >> 0] = ba | D;
        q = u + 5 | 0;

        if (q >>> 0 >= o >>> 0) {
          Y = w;
          Z = V;
          break b;
        }

        p = c[k >> 2] | 0;

        if ((p + 3 | 0) >>> 0 >= m >>> 0) {
          Y = w;
          Z = V;
          break b;
        } else {
          u = w;
          r = V;
        }
      }

      c[k >> 2] = O;
      ca = O;
      da = P;
      ea = Q;
      fa = ca;
      ga = b;
      ha = fa - ga | 0;
      c[d >> 2] = ha;
      ia = da;
      ja = e;
      ka = ia - ja | 0;
      la = (g | 0) != 0;
      ma = (l | 0) != 0;
      na = la & ma;
      oa = (da | 0) == (e | 0);
      pa = na & oa;
      qa = ea >>> 0 < l >>> 0;
      ra = pa & qa;
      sa = ra ? -1 : ka;
      c[f >> 2] = sa;
      i = h;
      return;
    } else {
      Y = e;
      Z = t;
    } while (0);

    ca = c[k >> 2] | 0;
    da = Y;
    ea = Z;
    fa = ca;
    ga = b;
    ha = fa - ga | 0;
    c[d >> 2] = ha;
    ia = da;
    ja = e;
    ka = ia - ja | 0;
    la = (g | 0) != 0;
    ma = (l | 0) != 0;
    na = la & ma;
    oa = (da | 0) == (e | 0);
    pa = na & oa;
    qa = ea >>> 0 < l >>> 0;
    ra = pa & qa;
    sa = ra ? -1 : ka;
    c[f >> 2] = sa;
    i = h;
    return;
  }

  function wc(a) {
    a = a | 0;
    return ~~((+(a >>> 0) * 3.0 + 2.0) * .25 + 16.0) >>> 0 | 0;
  }

  function xc(b, e, f, g, h, i, j, k) {
    b = b | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    i = i | 0;
    j = j | 0;
    k = k | 0;
    var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0;
    j = c[h >> 2] | 0;

    if ((c[g >> 2] | 0) >>> 0 <= 3) {
      l = 0;
      m = 0;
      n = j;
      c[e >> 2] = m;
      c[g >> 2] = l;
      c[h >> 2] = n;
      return;
    }

    o = (k | 0) != 0;
    k = 3;
    p = 0;
    q = 0;
    r = j;

    while (1) {
      j = q + 2 | 0;
      s = c[e >> 2] | 0;

      if (!(j >>> 0 < s >>> 0 | o & q >>> 0 < s >>> 0)) {
        l = p;
        m = q;
        n = r;
        t = 42;
        break;
      }

      s = b + q | 0;
      u = a[s >> 0] | 0;
      v = (u & 255) >>> 2;
      w = v & 255;

      do if ((u & 255) >= 104) {
        if ((u & 255) < 208) {
          x = w + 71 | 0;
          break;
        } else {
          x = (u & 255) < 248 ? w + -4 | 0 : v << 24 >> 24 != 63 ? 43 : 47;
          break;
        }
      } else x = w + 65 | 0; while (0);

      w = p + 1 | 0;
      a[f + p >> 0] = x;
      v = q + 1 | 0;
      u = (d[s >> 0] | 0) << 4;

      do if (v >>> 0 < (c[e >> 2] | 0) >>> 0) {
        y = b + v | 0;
        z = (d[y >> 0] | 0) >>> 4 | u & 48;
        A = z & 255;

        do if ((A & 255) >= 26) {
          if ((A & 255) < 52) {
            B = z + 71 | 0;
            break;
          } else {
            B = (A & 255) < 62 ? z + -4 | 0 : A << 24 >> 24 != 63 ? 43 : 47;
            break;
          }
        } else B = z + 65 | 0; while (0);

        z = p + 2 | 0;
        a[f + w >> 0] = B;
        A = (d[y >> 0] | 0) << 2;

        if (j >>> 0 >= (c[e >> 2] | 0) >>> 0) {
          C = A & 60;
          D = C & 255;

          do if ((D & 255) >= 26) {
            if ((D & 255) < 52) {
              E = C + 71 | 0;
              break;
            } else {
              E = C + -4 | 0;
              break;
            }
          } else E = C | 65; while (0);

          a[f + z >> 0] = E;
          a[f + k >> 0] = 61;
          F = j;
          break;
        }

        C = b + j | 0;
        D = (d[C >> 0] | 0) >>> 6 | A & 60;
        y = D & 255;

        do if ((y & 255) >= 26) {
          if ((y & 255) < 52) {
            G = D + 71 | 0;
            break;
          } else {
            G = (y & 255) < 62 ? D + -4 | 0 : y << 24 >> 24 != 63 ? 43 : 47;
            break;
          }
        } else G = D + 65 | 0; while (0);

        a[f + z >> 0] = G;
        D = (d[C >> 0] | 0) & 63;
        y = D & 255;

        do if ((y & 255) >= 26) {
          if ((y & 255) < 52) {
            H = D + 71 | 0;
            break;
          } else {
            H = (y & 255) < 62 ? D + -4 | 0 : y << 24 >> 24 != 63 ? 43 : 47;
            break;
          }
        } else H = D + 65 | 0; while (0);

        a[f + k >> 0] = H;
        F = q + 3 | 0;
      } else {
        D = u & 48;
        a[f + w >> 0] = D | ((D & 255) < 26 ? 65 : 71);
        a[f + (p + 2) >> 0] = 61;
        a[f + k >> 0] = 61;
        F = v;
      } while (0);

      v = p + 4 | 0;
      w = r + 1 | 0;

      if (w >>> 0 > 14) {
        u = p + 5 | 0;

        if (u >>> 0 >= (c[g >> 2] | 0) >>> 0) {
          l = v;
          m = F;
          n = w;
          t = 42;
          break;
        }

        j = f + v | 0;

        switch (i | 0) {
          case 3:
            {
              a[j >> 0] = 13;
              a[f + u >> 0] = 10;
              I = 2;
              break;
            }

          case 1:
            {
              a[j >> 0] = 10;
              I = 1;
              break;
            }

          case 2:
            {
              a[j >> 0] = 13;
              I = 1;
              break;
            }

          default:
            I = 0;
        }

        J = I + v | 0;
        K = 0;
      } else {
        J = v;
        K = w;
      }

      k = J + 3 | 0;

      if (k >>> 0 >= (c[g >> 2] | 0) >>> 0) {
        l = J;
        m = F;
        n = K;
        t = 42;
        break;
      } else {
        p = J;
        q = F;
        r = K;
      }
    }

    if ((t | 0) == 42) {
      c[e >> 2] = m;
      c[g >> 2] = l;
      c[h >> 2] = n;
      return;
    }
  }

  function yc(a) {
    a = a | 0;
    var b = 0.0;
    b = +(a >>> 0);
    return (~~((b * 4.0 + 2.0) / 3.0 + b * 2.0 / 45.0) >>> 0) + 16 | 0;
  }

  function zc(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;
    f = jb(a, 28) | 0;
    c[f >> 2] = 1;
    c[f + 4 >> 2] = hb(a) | 0;
    c[f + 8 >> 2] = b;
    c[f + 12 >> 2] = 0;
    c[f + 16 >> 2] = d;
    c[f + 20 >> 2] = 0;
    c[f + 24 >> 2] = e;
    return f | 0;
  }

  function Ac(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;
    f = jb(a, 28) | 0;
    c[f >> 2] = 1;
    c[f + 4 >> 2] = hb(a) | 0;
    c[f + 8 >> 2] = b;
    c[f + 12 >> 2] = 0;
    c[f + 16 >> 2] = 0;
    c[f + 20 >> 2] = d;
    c[f + 24 >> 2] = e;
    return f | 0;
  }

  function Bc(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    d = ob(b) | 0;
    b = jb(a, 28) | 0;
    c[b >> 2] = 1;
    c[b + 4 >> 2] = hb(a) | 0;
    c[b + 8 >> 2] = d;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 0;
    c[b + 20 >> 2] = 4;
    c[b + 24 >> 2] = 10;
    return b | 0;
  }

  function Cc(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0;
    e = mb(a, b, d) | 0;
    d = ob(e) | 0;
    b = jb(a, 28) | 0;
    c[b >> 2] = 1;
    c[b + 4 >> 2] = hb(a) | 0;
    c[b + 8 >> 2] = d;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 0;
    c[b + 20 >> 2] = 4;
    c[b + 24 >> 2] = 10;
    pb(e);
    return b | 0;
  }

  function Dc(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0;
    d = le(b, 13480) | 0;

    if (!d) {
      e = 0;
      return e | 0;
    }

    b = jb(a, 28) | 0;
    c[b >> 2] = 1;
    c[b + 4 >> 2] = hb(a) | 0;
    c[b + 8 >> 2] = d;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 16;
    c[b + 20 >> 2] = 0;
    c[b + 24 >> 2] = 11;
    e = b;
    return e | 0;
  }

  function Ec(a) {
    a = a | 0;
    if (!a) return a | 0;
    c[a >> 2] = (c[a >> 2] | 0) + 1;
    return a | 0;
  }

  function Fc(a) {
    a = a | 0;
    var b = 0;
    if (!a) return;
    b = (c[a >> 2] | 0) + -1 | 0;
    c[a >> 2] = b;
    if (b) return;
    b = c[a + 24 >> 2] | 0;
    if (b) ia(b | 0, c[a + 8 >> 2] | 0);
    b = c[a + 4 >> 2] | 0;
    lb(b, a);
    ib(b);
    return;
  }

  function Gc(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0;
    e = i;
    i = i + 16 | 0;
    f = e;

    if (!a) {
      g = 0;
      i = e;
      return g | 0;
    }

    h = c[a + 16 >> 2] | 0;

    if (h) {
      j = ea(h | 0, c[a + 8 >> 2] | 0, b | 0, d | 0) | 0;

      if ((j | 0) == -1) {
        g = -1;
        i = e;
        return g | 0;
      }

      h = a + 12 | 0;
      c[h >> 2] = (c[h >> 2] | 0) + j;
      g = j;
      i = e;
      return g | 0;
    }

    j = c[a + 20 >> 2] | 0;

    if (!j) {
      g = 0;
      i = e;
      return g | 0;
    }

    c[f >> 2] = 0;
    h = sa(j | 0, c[a + 8 >> 2] | 0, f | 0) | 0;

    if ((h | 0) == -1) {
      g = -1;
      i = e;
      return g | 0;
    }

    j = a + 12 | 0;
    a = c[j >> 2] | 0;

    if (h >>> 0 <= a >>> 0) {
      g = 0;
      i = e;
      return g | 0;
    }

    k = (a + d | 0) >>> 0 > h >>> 0 ? h - a | 0 : d;
    af(b | 0, (c[f >> 2] | 0) + a | 0, k | 0) | 0;
    c[j >> 2] = (c[j >> 2] | 0) + k;
    g = k;
    i = e;
    return g | 0;
  }

  function Hc(d, e, f) {
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0;
    g = i;
    i = i + 16 | 0;
    h = g;
    j = g + 4 | 0;

    if ((d | 0) == 0 | (f | 0) == 0) {
      k = 0;
      i = g;
      return k | 0;
    }

    l = d + 16 | 0;
    m = d + 20 | 0;
    n = d + 8 | 0;
    o = d + 12 | 0;
    d = j + 1 | 0;
    p = j + 2 | 0;
    q = 0;

    while (1) {
      r = c[l >> 2] | 0;

      if (!r) {
        s = c[m >> 2] | 0;

        if (!s) {
          t = q;
          u = 10;
          break;
        }

        c[h >> 2] = 0;
        v = sa(s | 0, c[n >> 2] | 0, h | 0) | 0;

        if ((v | 0) == -1) {
          t = q;
          u = 10;
          break;
        }

        s = c[o >> 2] | 0;

        if (v >>> 0 <= s >>> 0) {
          t = q;
          u = 10;
          break;
        }

        w = (s + 1 | 0) >>> 0 > v >>> 0 ? v - s | 0 : 1;
        af(j | 0, (c[h >> 2] | 0) + s | 0, w | 0) | 0;
        x = w;
        y = s + w | 0;
      } else {
        w = ea(r | 0, c[n >> 2] | 0, j | 0, 1) | 0;

        if ((w | 0) == -1) {
          t = q;
          u = 10;
          break;
        }

        x = w;
        y = (c[o >> 2] | 0) + w | 0;
      }

      c[o >> 2] = y;

      if ((x | 0) != 1) {
        k = q;
        u = 36;
        break;
      }

      w = a[j >> 0] | 0;

      if (w << 24 >> 24 == 92) {
        r = c[l >> 2] | 0;

        if (!r) {
          s = c[m >> 2] | 0;

          if (!s) {
            z = q;
            u = 20;
            break;
          }

          c[h >> 2] = 0;
          v = sa(s | 0, c[n >> 2] | 0, h | 0) | 0;

          if ((v | 0) == -1) {
            z = q;
            u = 20;
            break;
          }

          s = c[o >> 2] | 0;

          if (v >>> 0 <= s >>> 0) {
            z = q;
            u = 20;
            break;
          }

          A = (s + 1 | 0) >>> 0 > v >>> 0 ? v - s | 0 : 1;
          af(d | 0, (c[h >> 2] | 0) + s | 0, A | 0) | 0;
          B = A;
          C = s + A | 0;
        } else {
          A = ea(r | 0, c[n >> 2] | 0, d | 0, 1) | 0;

          if ((A | 0) == -1) {
            z = q;
            u = 20;
            break;
          }

          B = A;
          C = (c[o >> 2] | 0) + A | 0;
        }

        c[o >> 2] = C;

        if ((B | 0) != 1) {
          k = q;
          u = 36;
          break;
        }

        A = a[d >> 0] | 0;

        switch (A << 24 >> 24) {
          case 48:
          case 46:
            {
              D = 4;
              u = 24;
              break;
            }

          default:
            if (A << 24 >> 24 == 58) {
              D = 6;
              u = 24;
            } else E = 2;

        }

        if ((u | 0) == 24) {
          u = 0;
          A = D + -2 | 0;
          r = c[l >> 2] | 0;

          if (!r) {
            s = c[m >> 2] | 0;

            if (s) {
              c[h >> 2] = 0;
              v = sa(s | 0, c[n >> 2] | 0, h | 0) | 0;

              if ((v | 0) == -1) {
                F = q;
                u = 31;
                break;
              }

              s = c[o >> 2] | 0;

              if (v >>> 0 > s >>> 0) {
                G = (s + A | 0) >>> 0 > v >>> 0 ? v - s | 0 : A;
                af(p | 0, (c[h >> 2] | 0) + s | 0, G | 0) | 0;
                c[o >> 2] = s + G;
                H = G;
              } else H = 0;
            } else H = 0;
          } else {
            G = ea(r | 0, c[n >> 2] | 0, p | 0, A | 0) | 0;

            if ((G | 0) == -1) {
              F = q;
              u = 31;
              break;
            }

            c[o >> 2] = (c[o >> 2] | 0) + G;
            H = G;
          }

          if ((H | 0) == (A | 0)) E = D;else {
            k = q;
            u = 36;
            break;
          }
        }

        b[e + (q << 1) >> 1] = $b(j, j + E | 0) | 0;
      } else b[e + (q << 1) >> 1] = w & 255;

      w = q + 1 | 0;
      if (w >>> 0 < f >>> 0) q = w;else {
        k = w;
        u = 36;
        break;
      }
    }

    if ((u | 0) == 10) {
      k = t;
      i = g;
      return k | 0;
    } else if ((u | 0) == 20) {
      k = z;
      i = g;
      return k | 0;
    } else if ((u | 0) == 31) {
      k = F;
      i = g;
      return k | 0;
    } else if ((u | 0) == 36) {
      i = g;
      return k | 0;
    }

    return 0;
  }

  function Ic(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0;

    if ((a | 0) != 0 ? (d = c[a + 20 >> 2] | 0, (d | 0) != 0) : 0) {
      e = sa(d | 0, c[a + 8 >> 2] | 0, b | 0) | 0;
      return e | 0;
    }

    c[b >> 2] = 0;
    e = 0;
    return e | 0;
  }

  function Jc(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
    e = i;
    i = i + 16 | 0;
    f = e;
    g = qb(b) | 0;

    if (g >>> 0 > d >>> 0) {
      h = d;
      i = e;
      return h | 0;
    }

    j = sb(b) | 0;
    k = j >>> 0 < d >>> 0 ? d : j;
    rb(b, k);
    j = a + 16 | 0;
    l = a + 20 | 0;
    m = a + 8 | 0;
    n = a + 12 | 0;

    a: do if (!a) o = g;else {
      p = g;

      while (1) {
        q = (ub(b) | 0) + p | 0;
        r = k - p | 0;
        s = c[j >> 2] | 0;

        if (!s) {
          t = c[l >> 2] | 0;

          if (t) {
            c[f >> 2] = 0;
            u = sa(t | 0, c[m >> 2] | 0, f | 0) | 0;
            if ((u | 0) == -1) break;
            t = c[n >> 2] | 0;

            if (u >>> 0 > t >>> 0) {
              v = (t + r | 0) >>> 0 > u >>> 0 ? u - t | 0 : r;
              af(q | 0, (c[f >> 2] | 0) + t | 0, v | 0) | 0;
              c[n >> 2] = (c[n >> 2] | 0) + v;

              if ((v | 0) == -1) {
                h = -1;
                w = 15;
                break;
              } else x = v;
            } else {
              y = 0;
              w = 10;
            }
          } else {
            y = 0;
            w = 10;
          }
        } else {
          v = ea(s | 0, c[m >> 2] | 0, q | 0, r | 0) | 0;
          if ((v | 0) == -1) break;
          c[n >> 2] = (c[n >> 2] | 0) + v;
          y = v;
          w = 10;
        }

        if ((w | 0) == 10) {
          w = 0;
          x = y;
        }

        v = x + p | 0;
        if ((x | 0) != 0 & v >>> 0 < d >>> 0) p = v;else {
          o = v;
          break a;
        }
      }

      if ((w | 0) == 15) {
        i = e;
        return h | 0;
      }

      h = -1;
      i = e;
      return h | 0;
    } while (0);

    rb(b, o);
    h = o;
    i = e;
    return h | 0;
  }

  function Kc(a, b) {
    a = a | 0;
    b = b | 0;
    if (b) c[b >> 2] = tb(a) | 0;
    return qb(a) | 0;
  }

  function Lc(a) {
    a = a | 0;
    pb(a);
    return;
  }

  function Mc(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    var d = 0;

    if (!a) {
      d = 0;
      return d | 0;
    }

    d = te(b, 1, c, a) | 0;
    return d | 0;
  }

  function Nc(a) {
    a = a | 0;
    if (!a) return;
    Ce(a) | 0;
    return;
  }

  function Oc(a) {
    a = a | 0;
    var b = 0;
    if (!a) b = 0;else b = c[a >> 2] | 0;
    return b | 0;
  }

  function Pc(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 4 >> 2] | 0;
    return b | 0;
  }

  function Qc(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 8 >> 2] | 0;
    return b | 0;
  }

  function Rc(a) {
    a = a | 0;
    var b = 0.0;

    if (!a) {
      b = 0.0;
      return +b;
    }

    b = +h[a + 8 >> 3];
    return +b;
  }

  function Sc(a) {
    a = a | 0;
    var b = 0;

    if (!a) {
      b = 0;
      return b | 0;
    }

    b = c[a + 8 >> 2] | 0;
    return b | 0;
  }

  function Tc(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0;

    if (!a) {
      d = 0;
      return d | 0;
    }

    e = c[a + 12 >> 2] | 0;

    if (!e) {
      d = 0;
      return d | 0;
    }

    d = ea(e | 0, c[a + 4 >> 2] | 0, c[a + 8 >> 2] | 0, b | 0) | 0;
    return d | 0;
  }

  function Uc(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0;
    if (!a) return;
    d = c[a + 16 >> 2] | 0;
    if (!d) return;
    oa(d | 0, c[a + 4 >> 2] | 0, c[a + 8 >> 2] | 0, b | 0);
    return;
  }

  function Vc(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;
    f = jb(a, 20) | 0;
    c[f >> 2] = 1;
    c[f + 4 >> 2] = hb(a) | 0;
    c[f + 8 >> 2] = b;
    c[f + 12 >> 2] = d;
    c[f + 16 >> 2] = e;
    return f | 0;
  }

  function Wc(a) {
    a = a | 0;
    var b = 0;
    if (!a) return;
    b = (c[a >> 2] | 0) + -1 | 0;
    c[a >> 2] = b;
    if (b) return;
    b = c[a + 16 >> 2] | 0;
    if (b) ia(b | 0, c[a + 8 >> 2] | 0);
    b = c[a + 4 >> 2] | 0;
    lb(b, a);
    ib(b);
    return;
  }

  function Xc(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0;

    if (!a) {
      f = 0;
      return f | 0;
    }

    g = c[a + 12 >> 2] | 0;

    if (!g) {
      f = 0;
      return f | 0;
    }

    f = ua(g | 0, c[a + 4 >> 2] | 0, c[a + 8 >> 2] | 0, b | 0, d | 0, e | 0) | 0;
    return f | 0;
  }

  function Yc(d, e, f, g, h) {
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0;
    j = i;
    i = i + 48 | 0;
    k = j;
    l = j + 36 | 0;
    m = j + 35 | 0;
    n = j + 34 | 0;
    o = j + 32 | 0;
    p = c[e >> 2] | 0;
    a[l >> 0] = p;

    a: do switch (p | 0) {
      case 102:
        {
          Pb(g, l, 1) | 0;
          q = e + 4 | 0;
          $c(g, c[q >> 2] | 0, h);

          if ((c[q >> 2] | 0) >= 0) {
            r = 0;

            while (1) {
              if (!(Tc(f, k) | 0)) break;
              s = Yc(d, k, f, g, h) | 0;
              Uc(f, k);

              if (!s) {
                t = 0;
                u = 61;
                break;
              }

              if ((r | 0) < (c[q >> 2] | 0)) r = r + 1 | 0;else break a;
            }

            if ((u | 0) == 61) {
              i = j;
              return t | 0;
            }

            t = 0;
            i = j;
            return t | 0;
          }

          break;
        }

      case 99:
        {
          a[m >> 0] = c[e + 8 >> 2];
          Pb(g, l, 1) | 0;
          Pb(g, m, 1) | 0;
          break;
        }

      case 67:
        {
          a[n >> 0] = c[e + 8 >> 2];
          Pb(g, l, 1) | 0;
          Pb(g, n, 1) | 0;
          break;
        }

      case 106:
        {
          b[o >> 1] = c[e + 8 >> 2];
          Pb(g, l, 1) | 0;
          Pb(g, o, 2) | 0;
          break;
        }

      case 105:
        {
          Pb(g, l, 1) | 0;
          Pb(g, e + 8 | 0, 4) | 0;
          break;
        }

      case 76:
        {
          Pb(g, l, 1) | 0;
          Pb(g, e + 8 | 0, 8) | 0;
          break;
        }

      case 114:
        {
          Pb(g, l, 1) | 0;
          Pb(g, e + 8 | 0, 8) | 0;
          break;
        }

      case 66:
      case 115:
      case 83:
      case 82:
      case 73:
        {
          Pb(g, l, 1) | 0;
          r = e + 4 | 0;
          $c(g, c[r >> 2] | 0, h);
          Pb(g, c[e + 8 >> 2] | 0, c[r >> 2] | 0) | 0;
          break;
        }

      case 194:
      case 193:
        {
          Pb(g, l, 1) | 0;
          r = e + 8 | 0;

          do switch (c[r >> 2] | 0) {
            case 0:
              {
                v = 1;
                break;
              }

            case 1:
              {
                v = 2;
                break;
              }

            case 2:
              {
                v = 4;
                break;
              }

            case 3:
              {
                v = 8;
                break;
              }

            case 16:
              {
                q = (c[e >> 2] | 0) == 194;
                if (q) v = q & 1;else {
                  t = 0;
                  i = j;
                  return t | 0;
                }
                break;
              }

            case 17:
              {
                if ((c[e >> 2] | 0) == 194) v = 2;else {
                  t = 0;
                  i = j;
                  return t | 0;
                }
                break;
              }

            case 18:
              {
                if ((c[e >> 2] | 0) == 194) v = 4;else {
                  t = 0;
                  i = j;
                  return t | 0;
                }
                break;
              }

            case 19:
              {
                if ((c[e >> 2] | 0) == 194) v = 8;else {
                  t = 0;
                  i = j;
                  return t | 0;
                }
                break;
              }

            case 34:
              {
                v = 4;
                break;
              }

            case 35:
              {
                v = 8;
                break;
              }

            case 51:
              {
                v = 8;
                break;
              }

            case 52:
              {
                v = 16;
                break;
              }

            default:
              {
                t = 0;
                i = j;
                return t | 0;
              }
          } while (0);

          Pb(g, r, 1) | 0;
          q = r + 4 | 0;
          $c(g, c[q >> 2] | 0, h);

          if ((c[q >> 2] | 0) > 0) {
            s = e + 16 | 0;
            w = 0;

            do {
              $c(g, c[(c[s >> 2] | 0) + (w << 2) >> 2] | 0, h);
              w = w + 1 | 0;
            } while ((w | 0) < (c[q >> 2] | 0));
          }

          q = c[e + 4 >> 2] | 0;

          if ((q | 0) <= (2147483647 / (v >>> 0) | 0 | 0)) {
            w = _(q, v) | 0;
            Pb(g, c[e + 20 >> 2] | 0, w) | 0;
          }

          break;
        }

      case 45:
      case 58:
        {
          if ((h | 0) < 8) {
            t = 0;
            i = j;
            return t | 0;
          }

          Pb(g, l, 1) | 0;

          if (!(Tc(f, k) | 0)) {
            t = 0;
            i = j;
            return t | 0;
          }

          w = Yc(d, k, f, g, h) | 0;
          Uc(f, k);

          if (!w) {
            t = 0;
            i = j;
            return t | 0;
          }

          if (!(Tc(f, k) | 0)) {
            t = 0;
            i = j;
            return t | 0;
          } else {
            w = Yc(d, k, f, g, h) | 0;
            Uc(f, k);
            if (!w) t = 0;else break a;
            i = j;
            return t | 0;
          }

          break;
        }

      case 65:
        {
          if ((h | 0) < 8) {
            t = 0;
            i = j;
            return t | 0;
          }

          Pb(g, l, 1) | 0;
          w = e + 4 | 0;
          $c(g, c[w >> 2] | 0, h);

          if ((c[w >> 2] | 0) > 0) {
            q = 0;

            while (1) {
              if (!(Tc(f, k) | 0)) break;
              s = Yc(d, k, f, g, h) | 0;
              Uc(f, k);
              q = q + 1 | 0;

              if (!s) {
                t = 0;
                u = 61;
                break;
              }

              if ((q | 0) >= (c[w >> 2] | 0)) break a;
            }

            if ((u | 0) == 61) {
              i = j;
              return t | 0;
            }

            t = 0;
            i = j;
            return t | 0;
          }

          break;
        }

      case 116:
        {
          if ((h | 0) < 6) {
            if (!(ad(d, e, f, g, h) | 0)) {
              t = 0;
              i = j;
              return t | 0;
            }
          } else u = 48;

          break;
        }

      case 101:
      case 108:
      case 110:
      case 104:
      case 98:
        {
          u = 48;
          break;
        }

      default:
        {}
    } while (0);

    if ((u | 0) == 48) {
      if ((h | 0) > 7) {
        t = 0;
        i = j;
        return t | 0;
      }

      Pb(g, l, 1) | 0;

      switch (p | 0) {
        case 98:
          {
            x = 1;
            break;
          }

        case 104:
          {
            x = 2;
            break;
          }

        case 110:
          {
            x = 4;
            break;
          }

        case 116:
          {
            x = 8;
            break;
          }

        case 108:
          {
            x = 4;
            break;
          }

        default:
          x = 8;
      }

      p = e + 8 + 4 | 0;
      $c(g, c[p >> 2] | 0, h);

      if ((c[p >> 2] | 0) > 0) {
        l = e + 16 | 0;
        u = 0;

        do {
          $c(g, c[(c[l >> 2] | 0) + (u << 2) >> 2] | 0, h);
          u = u + 1 | 0;
        } while ((u | 0) < (c[p >> 2] | 0));
      }

      p = c[e + 4 >> 2] | 0;

      if ((p | 0) <= (2147483647 / (x >>> 0) | 0 | 0)) {
        u = _(p, x) | 0;
        Pb(g, c[e + 20 >> 2] | 0, u) | 0;
      }
    }

    t = (c[e >> 2] | 0) != 0 & 1;
    i = j;
    return t | 0;
  }

  function Zc(a, b, d, e, f) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
    g = i;
    i = i + 80 | 0;
    h = g + 32 | 0;
    j = g;
    k = g + 64 | 0;
    l = g + 68 | 0;

    if ((f | 0) > 6) {
      m = (f & 128 | 0) != 0;

      if (m) {
        n = zb(a, d) | 0;
        o = n;
        p = n;
      } else {
        o = d;
        p = 0;
      }

      n = f & 127;
      c[h >> 2] = n;
      qe(l, 13482, h) | 0;
      Pb(d, l, Fe(l) | 0) | 0;
      if (m) Pb(d, 13485, 1) | 0;
      Pb(d, 13486, 1) | 0;
      if (!(Tc(b, h) | 0)) q = 0;else {
        m = Yc(a, h, b, o, n) | 0;
        Uc(b, h);
        q = m;
      }
      Ob(p);
      r = q;
      i = g;
      return r | 0;
    }

    switch (f | 0) {
      case 5:
        {
          Pb(d, 13502, 2) | 0;
          if (!(Tc(b, j) | 0)) s = 0;else {
            q = Yc(a, j, b, d, 5) | 0;
            Uc(b, j);
            s = q;
          }
          r = s;
          i = g;
          return r | 0;
        }

      case 4:
        {
          Pb(d, 13499, 2) | 0;
          c[k >> 2] = 1383031329;

          if ((Pb(d, k, 4) | 0) == 4 ? (Tc(b, j) | 0) != 0 : 0) {
            s = Yc(a, j, b, d, 4) | 0;
            Uc(b, j);
            t = s;
          } else t = 0;

          r = t;
          i = g;
          return r | 0;
        }

      case 2:
        {
          t = Zb(a, d, e, 1) | 0;
          s = zb(a, t) | 0;
          Pb(d, 13493, 2) | 0;
          c[k >> 2] = 1383031329;

          if ((Pb(s, k, 4) | 0) == 4 ? (Tc(b, j) | 0) != 0 : 0) {
            q = Yc(a, j, b, s, 2) | 0;
            Uc(b, j);
            u = q;
          } else u = 0;

          Ob(s);
          Ob(t);
          r = u;
          i = g;
          return r | 0;
        }

      case 3:
        {
          u = zb(a, d) | 0;
          Pb(d, 13496, 2) | 0;
          c[k >> 2] = 1383031329;

          if ((Pb(u, k, 4) | 0) == 4 ? (Tc(b, j) | 0) != 0 : 0) {
            t = Yc(a, j, b, u, 3) | 0;
            Uc(b, j);
            v = t;
          } else v = 0;

          Ob(u);
          r = v;
          i = g;
          return r | 0;
        }

      default:
        {
          v = Vb(a, d, e) | 0;
          e = zb(a, v) | 0;
          if ((f | 0) == 6) Pb(d, 13487, 2) | 0;else Pb(d, 13490, 2) | 0;
          c[k >> 2] = 1383031329;

          if ((Pb(e, k, 4) | 0) == 4 ? (Tc(b, j) | 0) != 0 : 0) {
            k = Yc(a, j, b, e, f) | 0;
            Uc(b, j);
            w = k;
          } else w = 0;

          Ob(e);
          Ob(v);
          r = w;
          i = g;
          return r | 0;
        }
    }

    return 0;
  }

  function _c(a, c, d) {
    a = a | 0;
    c = c | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
    e = i;
    i = i + 16 | 0;
    f = e;
    b[f >> 1] = 0;
    g = 0;
    h = 0;

    a: while (1) {
      j = h;

      while (1) {
        if ((Hc(c, f, 1) | 0) != 1) {
          k = j;
          break a;
        }

        l = b[f >> 1] | 0;

        if (l << 16 >> 16 == 58) {
          k = j;
          break a;
        }

        if ((l + -48 & 65535) < 10) {
          m = l;
          n = j;
          break;
        }

        if (!j) j = 0;else {
          k = j;
          break a;
        }
      }

      if ((g | 0) > 9) {
        o = 0;
        p = 22;
        break;
      }

      g = g + 1 | 0;
      h = (n * 10 | 0) + -48 + (m & 65535) | 0;
    }

    if ((p | 0) == 22) {
      i = e;
      return o | 0;
    }

    if ((k | 0) < 1) {
      o = 0;
      i = e;
      return o | 0;
    } else q = 0;

    while (1) {
      p = b[f >> 1] | 0;
      m = p << 16 >> 16 == 67 ? 1 : q;

      if (p << 16 >> 16 == 58) {
        r = m;
        break;
      }

      if ((Hc(c, f, 1) | 0) == 1) q = m;else {
        r = m;
        break;
      }
    }

    if ((k | 0) > 6) {
      if (!(r << 16 >> 16)) {
        s = c;
        t = 0;
      } else {
        r = yb(a, c) | 0;
        s = r;
        t = r;
      }

      r = bd(a, s, d, 1, k) | 0;
      Fc(t);
      o = r;
      i = e;
      return o | 0;
    }

    switch (k | 0) {
      case 6:
      case 1:
        {
          r = Wb(a, c) | 0;
          t = yb(a, r) | 0;
          s = bd(a, t, d, 0, k) | 0;
          Fc(t);
          Fc(r);
          o = s;
          i = e;
          return o | 0;
        }

      case 2:
        {
          s = _b(a, c) | 0;
          r = yb(a, s) | 0;
          t = bd(a, r, d, 0, 2) | 0;
          Fc(r);
          Fc(s);
          o = t;
          i = e;
          return o | 0;
        }

      case 3:
        {
          t = yb(a, c) | 0;
          s = bd(a, t, d, 0, 3) | 0;
          Fc(t);
          o = s;
          i = e;
          return o | 0;
        }

      case 4:
        {
          o = bd(a, c, d, 0, 4) | 0;
          i = e;
          return o | 0;
        }

      case 5:
        {
          o = bd(a, c, d, 1, 5) | 0;
          i = e;
          return o | 0;
        }

      default:
        {
          o = 0;
          i = e;
          return o | 0;
        }
    }

    return 0;
  }

  function $c(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0;
    f = i;
    i = i + 16 | 0;
    g = f + 4 | 0;
    h = f;

    if ((e | 0) < 7) {
      c[h >> 2] = d;
      Pb(b, h, 4) | 0;
      i = f;
      return;
    }

    if (!d) {
      a[g >> 0] = 0;
      Pb(b, g, 1) | 0;
      i = f;
      return;
    }

    if ((d | 0) == 2147483647 & (e | 0) == 7) {
      i = f;
      return;
    } else j = d;

    while (1) {
      if (j >>> 0 <= 127) {
        k = j;
        break;
      }

      d = j;
      j = j >>> 7;
      a[g >> 0] = (j | 0) == 0 ? d & 127 : d | 128;

      if (!(Pb(b, g, 1) | 0)) {
        l = 10;
        break;
      }
    }

    if ((l | 0) == 10) {
      i = f;
      return;
    }

    if (!k) {
      i = f;
      return;
    } else {
      a[g >> 0] = k;
      Pb(b, g, 1) | 0;
      i = f;
      return;
    }
  }

  function ad(e, f, j, k, l) {
    e = e | 0;
    f = f | 0;
    j = j | 0;
    k = k | 0;
    l = l | 0;
    var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0;
    m = i;
    i = i + 112 | 0;
    n = m + 32 | 0;
    o = m + 40 | 0;
    p = m;
    q = m + 48 | 0;

    switch (c[f >> 2] | 0) {
      case 101:
      case 108:
      case 116:
      case 110:
      case 104:
      case 98:
        break;

      default:
        {
          r = 0;
          i = m;
          return r | 0;
        }
    }

    a[o >> 0] = 102;
    s = f + 16 | 0;
    t = c[c[s >> 2] >> 2] | 0;
    Pb(k, o, 1) | 0;
    $c(k, t, l);
    c[p >> 2] = 115;
    o = p + 4 | 0;
    c[o >> 2] = 4;
    u = p + 8 | 0;
    c[u >> 2] = 13505;

    if (!(Yc(e, p, j, k, l) | 0)) {
      r = 0;
      i = m;
      return r | 0;
    }

    v = f + 8 + 4 | 0;
    w = c[v >> 2] | 0;
    x = c[f >> 2] | 0;

    if ((w | 0) != 1) {
      c[p >> 2] = x;
      y = w + -1 | 0;
      c[u + 4 >> 2] = y;
      w = jb(e, y << 2) | 0;
      y = p + 16 | 0;
      c[y >> 2] = w;
      c[o >> 2] = 1;

      if ((c[v >> 2] | 0) > 1) {
        z = c[s >> 2] | 0;
        s = 1;

        do {
          A = z + (s << 2) | 0;
          c[w + (s + -1 << 2) >> 2] = c[A >> 2];
          B = _(c[o >> 2] | 0, c[A >> 2] | 0) | 0;
          c[o >> 2] = B;
          s = s + 1 | 0;
        } while ((s | 0) < (c[v >> 2] | 0));

        C = B;
      } else C = 1;

      switch (c[f >> 2] | 0) {
        case 98:
          {
            D = C;
            break;
          }

        case 104:
          {
            D = C << 1;
            break;
          }

        case 110:
          {
            D = C << 2;
            break;
          }

        case 116:
          {
            D = C << 3;
            break;
          }

        case 108:
          {
            D = C << 2;
            break;
          }

        case 101:
          {
            D = C << 3;
            break;
          }

        default:
          D = 1;
      }

      do if ((t | 0) > 0) {
        C = f + 20 | 0;
        v = p + 20 | 0;
        s = 0;

        while (1) {
          c[v >> 2] = (c[C >> 2] | 0) + (_(s, D) | 0);
          s = s + 1 | 0;
          if (!(ad(e, p, j, k, l) | 0)) break;

          if ((s | 0) >= (t | 0)) {
            E = 49;
            break;
          }
        }

        if ((E | 0) == 49) {
          F = c[y >> 2] | 0;
          break;
        }

        lb(e, c[y >> 2] | 0);
        r = 0;
        i = m;
        return r | 0;
      } else F = w; while (0);

      lb(e, F);
      r = 1;
      i = m;
      return r | 0;
    }

    switch (x | 0) {
      case 98:
        {
          if ((t | 0) <= 0) {
            r = 1;
            i = m;
            return r | 0;
          }

          x = f + 20 | 0;
          F = 0;

          while (1) {
            c[p >> 2] = 105;
            c[u >> 2] = d[(c[x >> 2] | 0) + F >> 0];
            F = F + 1 | 0;

            if (!(Yc(e, p, j, k, l) | 0)) {
              r = 0;
              E = 51;
              break;
            }

            if ((F | 0) >= (t | 0)) {
              r = 1;
              E = 51;
              break;
            }
          }

          if ((E | 0) == 51) {
            i = m;
            return r | 0;
          }

          break;
        }

      case 104:
        {
          if ((t | 0) <= 0) {
            r = 1;
            i = m;
            return r | 0;
          }

          F = f + 20 | 0;
          x = 0;

          while (1) {
            c[p >> 2] = 105;
            c[u >> 2] = b[(c[F >> 2] | 0) + (x << 1) >> 1];
            x = x + 1 | 0;

            if (!(Yc(e, p, j, k, l) | 0)) {
              r = 0;
              E = 51;
              break;
            }

            if ((x | 0) >= (t | 0)) {
              r = 1;
              E = 51;
              break;
            }
          }

          if ((E | 0) == 51) {
            i = m;
            return r | 0;
          }

          break;
        }

      case 110:
        {
          if ((t | 0) <= 0) {
            r = 1;
            i = m;
            return r | 0;
          }

          x = f + 20 | 0;
          F = 0;

          while (1) {
            c[p >> 2] = 105;
            c[u >> 2] = c[(c[x >> 2] | 0) + (F << 2) >> 2];
            F = F + 1 | 0;

            if (!(Yc(e, p, j, k, l) | 0)) {
              r = 0;
              E = 51;
              break;
            }

            if ((F | 0) >= (t | 0)) {
              r = 1;
              E = 51;
              break;
            }
          }

          if ((E | 0) == 51) {
            i = m;
            return r | 0;
          }

          break;
        }

      case 116:
        {
          if ((l | 0) < 7) {
            F = f + 20 | 0;

            if ((t | 0) <= 0) {
              r = 1;
              i = m;
              return r | 0;
            }

            x = 0;

            while (1) {
              w = (c[F >> 2] | 0) + (x << 3) | 0;
              y = c[w + 4 >> 2] | 0;
              D = n;
              c[D >> 2] = c[w >> 2];
              c[D + 4 >> 2] = y;
              y = re(q, 63, 13510, n) | 0;
              a[q + y >> 0] = 0;
              c[p >> 2] = 73;
              c[o >> 2] = y;
              c[u >> 2] = q;
              x = x + 1 | 0;

              if (!(Yc(e, p, j, k, l) | 0)) {
                r = 0;
                E = 51;
                break;
              }

              if ((x | 0) >= (t | 0)) {
                r = 1;
                E = 51;
                break;
              }
            }

            if ((E | 0) == 51) {
              i = m;
              return r | 0;
            }
          } else {
            if ((t | 0) <= 0) {
              r = 1;
              i = m;
              return r | 0;
            }

            x = f + 20 | 0;
            q = 0;

            while (1) {
              c[p >> 2] = 76;
              o = (c[x >> 2] | 0) + (q << 3) | 0;
              n = c[o + 4 >> 2] | 0;
              F = u;
              c[F >> 2] = c[o >> 2];
              c[F + 4 >> 2] = n;
              q = q + 1 | 0;

              if (!(Yc(e, p, j, k, l) | 0)) {
                r = 0;
                E = 51;
                break;
              }

              if ((q | 0) >= (t | 0)) {
                r = 1;
                E = 51;
                break;
              }
            }

            if ((E | 0) == 51) {
              i = m;
              return r | 0;
            }
          }

          break;
        }

      case 108:
        {
          if ((t | 0) <= 0) {
            r = 1;
            i = m;
            return r | 0;
          }

          q = f + 20 | 0;
          x = 0;

          while (1) {
            c[p >> 2] = 114;
            h[u >> 3] = +g[(c[q >> 2] | 0) + (x << 2) >> 2];
            x = x + 1 | 0;

            if (!(Yc(e, p, j, k, l) | 0)) {
              r = 0;
              E = 51;
              break;
            }

            if ((x | 0) >= (t | 0)) {
              r = 1;
              E = 51;
              break;
            }
          }

          if ((E | 0) == 51) {
            i = m;
            return r | 0;
          }

          break;
        }

      case 101:
        {
          if ((t | 0) <= 0) {
            r = 1;
            i = m;
            return r | 0;
          }

          x = f + 20 | 0;
          f = 0;

          while (1) {
            c[p >> 2] = 114;
            h[u >> 3] = +h[(c[x >> 2] | 0) + (f << 3) >> 3];
            f = f + 1 | 0;

            if (!(Yc(e, p, j, k, l) | 0)) {
              r = 0;
              E = 51;
              break;
            }

            if ((f | 0) >= (t | 0)) {
              r = 1;
              E = 51;
              break;
            }
          }

          if ((E | 0) == 51) {
            i = m;
            return r | 0;
          }

          break;
        }

      default:
        {
          r = 1;
          i = m;
          return r | 0;
        }
    }

    return 0;
  }

  function bd(e, f, g, h, j) {
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    j = j | 0;
    var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0;
    k = i;
    i = i + 48 | 0;
    l = k;
    m = k + 44 | 0;
    n = k + 43 | 0;
    o = k + 42 | 0;
    p = k + 40 | 0;
    q = k + 36 | 0;
    r = k + 32 | 0;

    if (!h) {
      if ((Gc(f, q, 4) | 0) != 4) {
        s = 0;
        i = k;
        return s | 0;
      }

      t = c[q >> 2] | 0;

      if ((t | 0) != 1383031329) {
        u = q + 3 | 0;
        a[q >> 0] = a[u >> 0] | 0;
        a[u >> 0] = t;
        t = q + 1 | 0;
        u = a[t >> 0] | 0;
        v = q + 2 | 0;
        a[t >> 0] = a[v >> 0] | 0;
        a[v >> 0] = u;
        if ((c[q >> 2] | 0) == 1383031329) w = 2;else {
          s = 0;
          i = k;
          return s | 0;
        }
      } else w = 1;
    } else w = h;

    if ((Gc(f, m, 1) | 0) != 1) {
      s = 0;
      i = k;
      return s | 0;
    }

    h = d[m >> 0] | 0;
    c[l >> 2] = h;

    a: do switch (h | 0) {
      case 102:
        {
          q = l + 4 | 0;

          if (!(cd(f, q, w, j) | 0)) {
            s = 0;
            i = k;
            return s | 0;
          }

          if (!(Xc(g, l, 1, j) | 0)) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((c[q >> 2] | 0) < 0) {
            s = 1;
            i = k;
            return s | 0;
          } else x = 0;

          while (1) {
            if (!(bd(e, f, g, w, j) | 0)) {
              s = 0;
              y = 55;
              break;
            }

            if ((x | 0) < (c[q >> 2] | 0)) x = x + 1 | 0;else {
              s = 1;
              y = 55;
              break;
            }
          }

          if ((y | 0) == 55) {
            i = k;
            return s | 0;
          }

          break;
        }

      case 99:
        {
          if ((j | 0) != 7) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((Gc(f, o, 1) | 0) == 1) {
            c[l + 8 >> 2] = d[o >> 0];
            y = 51;
            break a;
          } else {
            s = 0;
            i = k;
            return s | 0;
          }

          break;
        }

      case 67:
        {
          if ((j | 0) < 7) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((Gc(f, n, 1) | 0) == 1) {
            c[l + 8 >> 2] = a[n >> 0];
            y = 51;
            break a;
          } else {
            s = 0;
            i = k;
            return s | 0;
          }

          break;
        }

      case 106:
        {
          if ((j | 0) < 7) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((Gc(f, p, 2) | 0) != 2) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((w | 0) == 2) {
            q = b[p >> 1] | 0;
            a[p >> 0] = (q & 65535) >>> 8;
            a[p + 1 >> 0] = q;
          }

          c[l + 8 >> 2] = b[p >> 1];
          y = 51;
          break;
        }

      case 105:
        {
          q = l + 8 | 0;

          if ((Gc(f, q, 4) | 0) != 4) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((w | 0) == 2) {
            u = c[q >> 2] | 0;
            a[q >> 0] = u >>> 24;
            a[q + 3 >> 0] = u;
            a[q + 1 >> 0] = u >>> 16;
            a[q + 2 >> 0] = (u & 65535) >>> 8;
            y = 51;
          } else y = 51;

          break;
        }

      case 76:
        {
          if ((j | 0) < 7) {
            s = 0;
            i = k;
            return s | 0;
          }

          u = l + 8 | 0;

          if ((Gc(f, u, 8) | 0) != 8) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((w | 0) == 2) {
            q = c[u >> 2] | 0;
            v = u + 7 | 0;
            a[u >> 0] = a[v >> 0] | 0;
            a[v >> 0] = q;
            v = u + 6 | 0;
            a[u + 1 >> 0] = a[v >> 0] | 0;
            a[v >> 0] = (q & 65535) >>> 8;
            v = u + 5 | 0;
            a[u + 2 >> 0] = a[v >> 0] | 0;
            a[v >> 0] = q >>> 16;
            v = u + 4 | 0;
            a[u + 3 >> 0] = a[v >> 0] | 0;
            a[v >> 0] = q >>> 24;
            y = 51;
          } else y = 51;

          break;
        }

      case 114:
        {
          q = l + 8 | 0;

          if ((Gc(f, q, 8) | 0) != 8) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((w | 0) == 2) {
            v = c[q >> 2] | 0;
            u = q + 7 | 0;
            a[q >> 0] = a[u >> 0] | 0;
            a[u >> 0] = v;
            u = q + 6 | 0;
            a[q + 1 >> 0] = a[u >> 0] | 0;
            a[u >> 0] = (v & 65535) >>> 8;
            u = q + 5 | 0;
            a[q + 2 >> 0] = a[u >> 0] | 0;
            a[u >> 0] = v >>> 16;
            u = q + 4 | 0;
            a[q + 3 >> 0] = a[u >> 0] | 0;
            a[u >> 0] = v >>> 24;
            y = 51;
          } else y = 51;

          break;
        }

      case 66:
      case 115:
      case 83:
      case 82:
      case 73:
        {
          v = l + 8 | 0;
          c[v >> 2] = 0;

          if (!(cd(f, r, w, j) | 0)) {
            s = 0;
            i = k;
            return s | 0;
          }

          u = c[r >> 2] | 0;
          c[l + 4 >> 2] = u;
          q = jb(e, u + 1 | 0) | 0;
          c[v >> 2] = q;
          t = (Gc(f, q, u) | 0) == (u | 0);
          q = c[v >> 2] | 0;

          if (t) {
            a[q + u >> 0] = 0;
            y = 51;
            break a;
          }

          lb(e, q);
          s = 0;
          i = k;
          return s | 0;
        }

      case 194:
      case 193:
        {
          if ((j | 0) >= 8) {
            if (!(dd(l, e, f, w, j) | 0)) {
              z = 0;
              break a;
            } else {
              y = 51;
              break a;
            }
          } else {
            s = 0;
            i = k;
            return s | 0;
          }
          break;
        }

      case 65:
        {
          if ((j | 0) < 8) {
            s = 0;
            i = k;
            return s | 0;
          }

          q = l + 4 | 0;

          if (!(cd(f, q, w, j) | 0)) {
            s = 0;
            i = k;
            return s | 0;
          }

          if (!(Xc(g, l, 1, j) | 0)) {
            s = 0;
            i = k;
            return s | 0;
          }

          if ((c[q >> 2] | 0) > 0) A = 0;else {
            s = 1;
            i = k;
            return s | 0;
          }

          b: while (1) {
            if ((Gc(f, m, 1) | 0) != 1) {
              s = 0;
              y = 55;
              break;
            }

            u = a[m >> 0] | 0;

            switch (u << 24 >> 24) {
              case 58:
              case 45:
                break;

              default:
                {
                  s = 0;
                  y = 55;
                  break b;
                }
            }

            c[l >> 2] = u & 255;

            if (!(Xc(g, l, 1, j) | 0)) {
              s = 0;
              y = 55;
              break;
            }

            if (!(bd(e, f, g, w, j) | 0)) {
              s = 0;
              y = 55;
              break;
            }

            A = A + 1 | 0;

            if (!(bd(e, f, g, w, j) | 0)) {
              s = 0;
              y = 55;
              break;
            }

            if ((A | 0) >= (c[q >> 2] | 0)) {
              s = 1;
              y = 55;
              break;
            }
          }

          if ((y | 0) == 55) {
            i = k;
            return s | 0;
          }

          break;
        }

      case 101:
      case 108:
      case 116:
      case 110:
      case 104:
      case 98:
        {
          if ((j | 0) <= 7) {
            if (!(dd(l, e, f, w, j) | 0)) {
              z = 0;
              break a;
            } else {
              y = 51;
              break a;
            }
          } else {
            s = 0;
            i = k;
            return s | 0;
          }
          break;
        }

      default:
        {
          s = 0;
          i = k;
          return s | 0;
        }
    } while (0);

    if ((y | 0) == 51) z = Xc(g, l, 0, j) | 0;

    switch (c[l >> 2] | 0) {
      case 66:
      case 115:
      case 83:
      case 82:
      case 73:
        {
          lb(e, c[l + 8 >> 2] | 0);
          s = z;
          i = k;
          return s | 0;
        }

      case 194:
      case 193:
      case 101:
      case 108:
      case 116:
      case 110:
      case 104:
      case 98:
        {
          lb(e, c[l + 16 >> 2] | 0);
          lb(e, c[l + 20 >> 2] | 0);
          s = z;
          i = k;
          return s | 0;
        }

      default:
        {
          s = z;
          i = k;
          return s | 0;
        }
    }

    return 0;
  }

  function cd(b, e, f, g) {
    b = b | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
    h = i;
    i = i + 16 | 0;
    j = h + 4 | 0;
    k = h;

    a: do if ((g | 0) > 6) {
      c[e >> 2] = 0;
      l = 0;
      m = 0;

      while (1) {
        n = m + 1 | 0;
        o = (Gc(b, j, 1) | 0) == 1;
        if (m >>> 0 >= 4) break;

        if (!o) {
          p = 0;
          q = 14;
          break;
        }

        r = a[j >> 0] | 0;
        s = (r & 127) << l | c[e >> 2];
        c[e >> 2] = s;

        if (r << 24 >> 24 > -1) {
          t = s;
          u = n;
          break a;
        } else {
          l = l + 7 | 0;
          m = n;
        }
      }

      if ((q | 0) == 14) {
        i = h;
        return p | 0;
      }

      if (!o) {
        p = 0;
        i = h;
        return p | 0;
      }

      m = (d[j >> 0] | 0) & 7;
      a[j >> 0] = m;

      if (!m) {
        p = 0;
        i = h;
        return p | 0;
      } else {
        s = c[e >> 2] | m << l;
        c[e >> 2] = s;
        t = s;
        u = n;
        break;
      }
    } else {
      if ((Gc(b, k, 4) | 0) != 4) {
        p = 0;
        i = h;
        return p | 0;
      }

      if ((f | 0) == 2) {
        s = c[k >> 2] | 0;
        a[k >> 0] = s >>> 24;
        a[k + 3 >> 0] = s;
        a[k + 1 >> 0] = s >>> 16;
        a[k + 2 >> 0] = (s & 65535) >>> 8;
      }

      s = c[k >> 2] | 0;
      c[e >> 2] = s;
      t = s;
      u = 4;
    } while (0);

    p = (u | 0) != 0 & (t | 0) > -1 & 1;
    i = h;
    return p | 0;
  }

  function dd(b, e, f, g, h) {
    b = b | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
    j = i;
    i = i + 16 | 0;
    k = j;
    l = j + 4 | 0;
    m = b + 8 | 0;
    n = b + 16 | 0;
    c[n >> 2] = 0;
    o = b + 20 | 0;
    c[o >> 2] = 0;

    a: do switch (c[b >> 2] | 0) {
      case 194:
      case 193:
        {
          if (!(Gc(f, l, 1) | 0)) {
            p = 0;
            i = j;
            return p | 0;
          }

          q = d[l >> 0] | 0;
          c[m >> 2] = q;

          do switch (q | 0) {
            case 0:
              {
                r = 1;
                break a;
                break;
              }

            case 1:
              {
                r = 2;
                break a;
                break;
              }

            case 2:
              {
                r = 4;
                break a;
                break;
              }

            case 3:
              {
                r = 8;
                break a;
                break;
              }

            case 16:
              {
                s = (c[b >> 2] | 0) == 194;

                if (s) {
                  r = s & 1;
                  break a;
                } else p = 0;

                i = j;
                return p | 0;
              }

            case 17:
              {
                if ((c[b >> 2] | 0) == 194) {
                  r = 2;
                  break a;
                } else p = 0;

                i = j;
                return p | 0;
              }

            case 18:
              {
                if ((c[b >> 2] | 0) == 194) {
                  r = 4;
                  break a;
                } else p = 0;

                i = j;
                return p | 0;
              }

            case 19:
              {
                if ((c[b >> 2] | 0) == 194) {
                  r = 8;
                  break a;
                } else p = 0;

                i = j;
                return p | 0;
              }

            case 34:
              {
                r = 4;
                break a;
                break;
              }

            case 35:
              {
                r = 8;
                break a;
                break;
              }

            case 51:
              {
                r = 8;
                break a;
                break;
              }

            case 52:
              {
                r = 16;
                break a;
                break;
              }

            default:
              {
                p = 0;
                i = j;
                return p | 0;
              }
          } while (0);

          break;
        }

      case 104:
        {
          r = 2;
          break;
        }

      case 108:
      case 110:
        {
          r = 4;
          break;
        }

      case 116:
      case 101:
        {
          r = 8;
          break;
        }

      case 45:
      case 58:
      case 66:
      case 115:
      case 83:
      case 82:
      case 114:
      case 73:
      case 76:
      case 105:
      case 106:
      case 67:
      case 99:
      case 102:
      case 0:
      case 65:
        {
          p = 0;
          i = j;
          return p | 0;
        }

      default:
        r = 1;
    } while (0);

    l = m + 4 | 0;

    b: do if (!(cd(f, l, g, h) | 0)) t = 1;else {
      c[n >> 2] = jb(e, c[l >> 2] << 2) | 0;
      m = b + 4 | 0;
      c[m >> 2] = 1;

      c: do if ((c[l >> 2] | 0) > 0) {
        q = 1;
        s = 0;

        while (1) {
          u = (cd(f, k, g, h) | 0) == 0;
          v = c[k >> 2] | 0;
          if (u | (v | 0) == 0) break c;
          if ((q | 0) > (2147483647 / (v | 0) | 0 | 0)) break c;
          c[(c[n >> 2] | 0) + (s << 2) >> 2] = v;
          u = _(v, q) | 0;
          s = s + 1 | 0;

          if ((s | 0) >= (c[l >> 2] | 0)) {
            w = u;
            x = 23;
            break;
          } else q = u;
        }
      } else {
        w = 1;
        x = 23;
      } while (0);

      do if (((x | 0) == 23 ? (c[m >> 2] = w, (w | 0) <= (2147483647 / (r >>> 0) | 0 | 0)) : 0) ? (q = _(w, r) | 0, s = jb(e, q) | 0, c[o >> 2] = s, (s | 0) != 0) : 0) {
        if ((Gc(f, s, q) | 0) != (q | 0)) {
          lb(e, c[o >> 2] | 0);
          c[o >> 2] = 0;
          break;
        }

        if ((g | 0) != 2) {
          t = w;
          break b;
        }

        switch (r | 0) {
          case 2:
            {
              if ((c[m >> 2] | 0) <= 0) {
                t = w;
                break b;
              }

              q = 0;

              while (1) {
                s = (c[o >> 2] | 0) + (q << 1) | 0;
                u = a[s >> 0] | 0;
                v = s + 1 | 0;
                a[s >> 0] = a[v >> 0] | 0;
                a[v >> 0] = u;
                q = q + 1 | 0;

                if ((q | 0) >= (c[m >> 2] | 0)) {
                  t = w;
                  break b;
                }
              }

              break;
            }

          case 4:
            {
              if ((c[m >> 2] | 0) <= 0) {
                t = w;
                break b;
              }

              q = 0;

              while (1) {
                u = (c[o >> 2] | 0) + (q << 2) | 0;
                v = a[u >> 0] | 0;
                s = u + 3 | 0;
                a[u >> 0] = a[s >> 0] | 0;
                a[s >> 0] = v;
                v = u + 1 | 0;
                s = a[v >> 0] | 0;
                y = u + 2 | 0;
                a[v >> 0] = a[y >> 0] | 0;
                a[y >> 0] = s;
                q = q + 1 | 0;

                if ((q | 0) >= (c[m >> 2] | 0)) {
                  t = w;
                  break b;
                }
              }

              break;
            }

          case 8:
            {
              if ((c[m >> 2] | 0) <= 0) {
                t = w;
                break b;
              }

              q = 0;

              while (1) {
                s = (c[o >> 2] | 0) + (q << 3) | 0;
                y = a[s >> 0] | 0;
                v = s + 7 | 0;
                a[s >> 0] = a[v >> 0] | 0;
                a[v >> 0] = y;
                y = s + 1 | 0;
                v = a[y >> 0] | 0;
                u = s + 6 | 0;
                a[y >> 0] = a[u >> 0] | 0;
                a[u >> 0] = v;
                v = s + 2 | 0;
                u = a[v >> 0] | 0;
                y = s + 5 | 0;
                a[v >> 0] = a[y >> 0] | 0;
                a[y >> 0] = u;
                u = s + 3 | 0;
                y = a[u >> 0] | 0;
                v = s + 4 | 0;
                a[u >> 0] = a[v >> 0] | 0;
                a[v >> 0] = y;
                q = q + 1 | 0;

                if ((q | 0) >= (c[m >> 2] | 0)) {
                  t = w;
                  break b;
                }
              }

              break;
            }

          default:
            {
              t = w;
              break b;
            }
        }
      } while (0);

      lb(e, c[n >> 2] | 0);
      c[n >> 2] = 0;
      p = 0;
      i = j;
      return p | 0;
    } while (0);

    p = (t | 0) != 0 & 1;
    i = j;
    return p | 0;
  }

  function ed(a, b, e) {
    a = a | 0;
    b = b | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0;
    f = i;
    i = i + 32 | 0;
    g = f + 20 | 0;
    h = f + 16 | 0;
    j = f + 12 | 0;
    k = f + 8 | 0;
    l = f + 4 | 0;
    m = f;
    c[h >> 2] = a;
    c[j >> 2] = b;
    c[k >> 2] = e;
    c[l >> 2] = (c[h >> 2] | 0) >>> 16 & 65535;
    c[h >> 2] = c[h >> 2] & 65535;
    e = c[j >> 2] | 0;

    if ((c[k >> 2] | 0) == 1) {
      c[h >> 2] = (c[h >> 2] | 0) + (d[e >> 0] | 0);
      if ((c[h >> 2] | 0) >>> 0 >= 65521) c[h >> 2] = (c[h >> 2] | 0) - 65521;
      c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
      if ((c[l >> 2] | 0) >>> 0 >= 65521) c[l >> 2] = (c[l >> 2] | 0) - 65521;
      c[g >> 2] = c[h >> 2] | c[l >> 2] << 16;
      n = c[g >> 2] | 0;
      i = f;
      return n | 0;
    }

    if (!e) {
      c[g >> 2] = 1;
      n = c[g >> 2] | 0;
      i = f;
      return n | 0;
    }

    if ((c[k >> 2] | 0) >>> 0 < 16) {
      while (1) {
        e = c[k >> 2] | 0;
        c[k >> 2] = e + -1;
        if (!e) break;
        e = c[j >> 2] | 0;
        c[j >> 2] = e + 1;
        c[h >> 2] = (c[h >> 2] | 0) + (d[e >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
      }

      if ((c[h >> 2] | 0) >>> 0 >= 65521) c[h >> 2] = (c[h >> 2] | 0) - 65521;
      c[l >> 2] = ((c[l >> 2] | 0) >>> 0) % 65521 | 0;
      c[g >> 2] = c[h >> 2] | c[l >> 2] << 16;
      n = c[g >> 2] | 0;
      i = f;
      return n | 0;
    }

    while (1) {
      o = c[k >> 2] | 0;
      if ((c[k >> 2] | 0) >>> 0 < 5552) break;
      c[k >> 2] = o - 5552;
      c[m >> 2] = 347;

      do {
        c[h >> 2] = (c[h >> 2] | 0) + (d[c[j >> 2] >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 1 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 2 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 3 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 4 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 5 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 6 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 7 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 8 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 9 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 10 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 11 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 12 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 13 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 14 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 15 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[j >> 2] = (c[j >> 2] | 0) + 16;
        e = (c[m >> 2] | 0) + -1 | 0;
        c[m >> 2] = e;
      } while ((e | 0) != 0);

      c[h >> 2] = ((c[h >> 2] | 0) >>> 0) % 65521 | 0;
      c[l >> 2] = ((c[l >> 2] | 0) >>> 0) % 65521 | 0;
    }

    if (o) {
      while (1) {
        if ((c[k >> 2] | 0) >>> 0 < 16) break;
        c[k >> 2] = (c[k >> 2] | 0) - 16;
        c[h >> 2] = (c[h >> 2] | 0) + (d[c[j >> 2] >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 1 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 2 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 3 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 4 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 5 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 6 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 7 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 8 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 9 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 10 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 11 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 12 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 13 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 14 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[h >> 2] = (c[h >> 2] | 0) + (d[(c[j >> 2] | 0) + 15 >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
        c[j >> 2] = (c[j >> 2] | 0) + 16;
      }

      while (1) {
        o = c[k >> 2] | 0;
        c[k >> 2] = o + -1;
        if (!o) break;
        o = c[j >> 2] | 0;
        c[j >> 2] = o + 1;
        c[h >> 2] = (c[h >> 2] | 0) + (d[o >> 0] | 0);
        c[l >> 2] = (c[l >> 2] | 0) + (c[h >> 2] | 0);
      }

      c[h >> 2] = ((c[h >> 2] | 0) >>> 0) % 65521 | 0;
      c[l >> 2] = ((c[l >> 2] | 0) >>> 0) % 65521 | 0;
    }

    c[g >> 2] = c[h >> 2] | c[l >> 2] << 16;
    n = c[g >> 2] | 0;
    i = f;
    return n | 0;
  }

  function fd(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0;
    f = i;
    i = i + 32 | 0;
    g = f + 16 | 0;
    h = f + 12 | 0;
    j = f + 8 | 0;
    k = f + 4 | 0;
    l = f;
    c[h >> 2] = b;
    c[j >> 2] = d;
    c[k >> 2] = e;

    do if (c[j >> 2] | 0) {
      c[l >> 2] = 1;
      e = c[h >> 2] | 0;
      d = c[j >> 2] | 0;
      b = c[k >> 2] | 0;

      if (a[l >> 0] | 0) {
        c[g >> 2] = zd(e, d, b) | 0;
        break;
      } else {
        c[g >> 2] = Ad(e, d, b) | 0;
        break;
      }
    } else c[g >> 2] = 0; while (0);

    i = f;
    return c[g >> 2] | 0;
  }

  function gd(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0;
    f = i;
    i = i + 16 | 0;
    g = f + 12 | 0;
    h = f + 8 | 0;
    j = f + 4 | 0;
    k = f;
    c[g >> 2] = a;
    c[h >> 2] = b;
    c[j >> 2] = d;
    c[k >> 2] = e;
    e = hd(c[g >> 2] | 0, c[h >> 2] | 0, 8, 15, 8, 0, c[j >> 2] | 0, c[k >> 2] | 0) | 0;
    i = f;
    return e | 0;
  }

  function hd(b, d, e, f, g, h, j, k) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    j = j | 0;
    k = k | 0;
    var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
    l = i;
    i = i + 48 | 0;
    m = l + 44 | 0;
    n = l + 40 | 0;
    o = l + 36 | 0;
    p = l + 32 | 0;
    q = l + 28 | 0;
    r = l + 24 | 0;
    s = l + 20 | 0;
    t = l + 16 | 0;
    u = l + 12 | 0;
    v = l + 8 | 0;
    w = l + 4 | 0;
    x = l;
    c[n >> 2] = b;
    c[o >> 2] = d;
    c[p >> 2] = e;
    c[q >> 2] = f;
    c[r >> 2] = g;
    c[s >> 2] = h;
    c[t >> 2] = j;
    c[u >> 2] = k;
    c[w >> 2] = 1;

    if ((c[t >> 2] | 0) != 0 ? !((c[u >> 2] | 0) != 56 ? 1 : (a[c[t >> 2] >> 0] | 0) != (a[14283] | 0)) : 0) {
      if (!(c[n >> 2] | 0)) {
        c[m >> 2] = -2;
        y = c[m >> 2] | 0;
        i = l;
        return y | 0;
      }

      c[(c[n >> 2] | 0) + 24 >> 2] = 0;

      if (!(c[(c[n >> 2] | 0) + 32 >> 2] | 0)) {
        c[(c[n >> 2] | 0) + 32 >> 2] = 17;
        c[(c[n >> 2] | 0) + 40 >> 2] = 0;
      }

      if (!(c[(c[n >> 2] | 0) + 36 >> 2] | 0)) c[(c[n >> 2] | 0) + 36 >> 2] = 2;
      if ((c[o >> 2] | 0) == -1) c[o >> 2] = 6;

      if ((c[q >> 2] | 0) >= 0) {
        if ((c[q >> 2] | 0) > 15) {
          c[w >> 2] = 2;
          c[q >> 2] = (c[q >> 2] | 0) - 16;
        }
      } else {
        c[w >> 2] = 0;
        c[q >> 2] = 0 - (c[q >> 2] | 0);
      }

      if ((c[r >> 2] | 0) < 1 | (c[r >> 2] | 0) > 9 | (c[p >> 2] | 0) != 8 | (c[q >> 2] | 0) < 8 | (c[q >> 2] | 0) > 15 | (c[o >> 2] | 0) < 0 | (c[o >> 2] | 0) > 9 | (c[s >> 2] | 0) < 0 | (c[s >> 2] | 0) > 4) {
        c[m >> 2] = -2;
        y = c[m >> 2] | 0;
        i = l;
        return y | 0;
      }

      if ((c[q >> 2] | 0) == 8) c[q >> 2] = 9;
      c[v >> 2] = ea(c[(c[n >> 2] | 0) + 32 >> 2] | 0, c[(c[n >> 2] | 0) + 40 >> 2] | 0, 1, 5828) | 0;

      if (!(c[v >> 2] | 0)) {
        c[m >> 2] = -4;
        y = c[m >> 2] | 0;
        i = l;
        return y | 0;
      }

      c[(c[n >> 2] | 0) + 28 >> 2] = c[v >> 2];
      c[c[v >> 2] >> 2] = c[n >> 2];
      c[(c[v >> 2] | 0) + 24 >> 2] = c[w >> 2];
      c[(c[v >> 2] | 0) + 28 >> 2] = 0;
      c[(c[v >> 2] | 0) + 48 >> 2] = c[q >> 2];
      c[(c[v >> 2] | 0) + 44 >> 2] = 1 << c[(c[v >> 2] | 0) + 48 >> 2];
      c[(c[v >> 2] | 0) + 52 >> 2] = (c[(c[v >> 2] | 0) + 44 >> 2] | 0) - 1;
      c[(c[v >> 2] | 0) + 80 >> 2] = (c[r >> 2] | 0) + 7;
      c[(c[v >> 2] | 0) + 76 >> 2] = 1 << c[(c[v >> 2] | 0) + 80 >> 2];
      c[(c[v >> 2] | 0) + 84 >> 2] = (c[(c[v >> 2] | 0) + 76 >> 2] | 0) - 1;
      c[(c[v >> 2] | 0) + 88 >> 2] = (((c[(c[v >> 2] | 0) + 80 >> 2] | 0) + 3 - 1 | 0) >>> 0) / 3 | 0;
      q = ea(c[(c[n >> 2] | 0) + 32 >> 2] | 0, c[(c[n >> 2] | 0) + 40 >> 2] | 0, c[(c[v >> 2] | 0) + 44 >> 2] | 0, 2) | 0;
      c[(c[v >> 2] | 0) + 56 >> 2] = q;
      q = ea(c[(c[n >> 2] | 0) + 32 >> 2] | 0, c[(c[n >> 2] | 0) + 40 >> 2] | 0, c[(c[v >> 2] | 0) + 44 >> 2] | 0, 2) | 0;
      c[(c[v >> 2] | 0) + 64 >> 2] = q;
      q = ea(c[(c[n >> 2] | 0) + 32 >> 2] | 0, c[(c[n >> 2] | 0) + 40 >> 2] | 0, c[(c[v >> 2] | 0) + 76 >> 2] | 0, 2) | 0;
      c[(c[v >> 2] | 0) + 68 >> 2] = q;
      c[(c[v >> 2] | 0) + 5824 >> 2] = 0;
      c[(c[v >> 2] | 0) + 5788 >> 2] = 1 << (c[r >> 2] | 0) + 6;
      c[x >> 2] = ea(c[(c[n >> 2] | 0) + 32 >> 2] | 0, c[(c[n >> 2] | 0) + 40 >> 2] | 0, c[(c[v >> 2] | 0) + 5788 >> 2] | 0, 4) | 0;
      c[(c[v >> 2] | 0) + 8 >> 2] = c[x >> 2];
      c[(c[v >> 2] | 0) + 12 >> 2] = c[(c[v >> 2] | 0) + 5788 >> 2] << 2;

      if ((((c[(c[v >> 2] | 0) + 56 >> 2] | 0) != 0 ? (c[(c[v >> 2] | 0) + 64 >> 2] | 0) != 0 : 0) ? (c[(c[v >> 2] | 0) + 68 >> 2] | 0) != 0 : 0) ? (c[(c[v >> 2] | 0) + 8 >> 2] | 0) != 0 : 0) {
        c[(c[v >> 2] | 0) + 5796 >> 2] = (c[x >> 2] | 0) + ((((c[(c[v >> 2] | 0) + 5788 >> 2] | 0) >>> 0) / 2 | 0) << 1);
        c[(c[v >> 2] | 0) + 5784 >> 2] = (c[(c[v >> 2] | 0) + 8 >> 2] | 0) + ((c[(c[v >> 2] | 0) + 5788 >> 2] | 0) * 3 | 0);
        c[(c[v >> 2] | 0) + 132 >> 2] = c[o >> 2];
        c[(c[v >> 2] | 0) + 136 >> 2] = c[s >> 2];
        a[(c[v >> 2] | 0) + 36 >> 0] = c[p >> 2];
        c[m >> 2] = jd(c[n >> 2] | 0) | 0;
        y = c[m >> 2] | 0;
        i = l;
        return y | 0;
      }

      c[(c[v >> 2] | 0) + 4 >> 2] = 666;
      c[(c[n >> 2] | 0) + 24 >> 2] = c[8];
      id(c[n >> 2] | 0) | 0;
      c[m >> 2] = -4;
      y = c[m >> 2] | 0;
      i = l;
      return y | 0;
    }

    c[m >> 2] = -6;
    y = c[m >> 2] | 0;
    i = l;
    return y | 0;
  }

  function id(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0;
    b = i;
    i = i + 16 | 0;
    d = b + 8 | 0;
    e = b + 4 | 0;
    f = b;
    c[e >> 2] = a;

    if ((c[e >> 2] | 0) != 0 ? (c[(c[e >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) {
      c[f >> 2] = c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 4 >> 2];

      if ((c[f >> 2] | 0) != 42 & (c[f >> 2] | 0) != 69 & (c[f >> 2] | 0) != 73 & (c[f >> 2] | 0) != 91 & (c[f >> 2] | 0) != 103 & (c[f >> 2] | 0) != 113 & (c[f >> 2] | 0) != 666) {
        c[d >> 2] = -2;
        g = c[d >> 2] | 0;
        i = b;
        return g | 0;
      }

      if (c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 8 >> 2] | 0) ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 8 >> 2] | 0);
      if (c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 68 >> 2] | 0) ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 68 >> 2] | 0);
      if (c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 64 >> 2] | 0) ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 64 >> 2] | 0);
      if (c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 56 >> 2] | 0) ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[(c[e >> 2] | 0) + 28 >> 2] | 0) + 56 >> 2] | 0);
      ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[e >> 2] | 0) + 28 >> 2] | 0);
      c[(c[e >> 2] | 0) + 28 >> 2] = 0;
      c[d >> 2] = (c[f >> 2] | 0) == 113 ? -3 : 0;
      g = c[d >> 2] | 0;
      i = b;
      return g | 0;
    }

    c[d >> 2] = -2;
    g = c[d >> 2] | 0;
    i = b;
    return g | 0;
  }

  function jd(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
    b = i;
    i = i + 16 | 0;
    d = b + 8 | 0;
    e = b + 4 | 0;
    f = b;
    c[e >> 2] = a;

    if ((((c[e >> 2] | 0) != 0 ? (c[(c[e >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) ? (c[(c[e >> 2] | 0) + 32 >> 2] | 0) != 0 : 0) ? (c[(c[e >> 2] | 0) + 36 >> 2] | 0) != 0 : 0) {
      c[(c[e >> 2] | 0) + 20 >> 2] = 0;
      c[(c[e >> 2] | 0) + 8 >> 2] = 0;
      c[(c[e >> 2] | 0) + 24 >> 2] = 0;
      c[(c[e >> 2] | 0) + 44 >> 2] = 2;
      c[f >> 2] = c[(c[e >> 2] | 0) + 28 >> 2];
      c[(c[f >> 2] | 0) + 20 >> 2] = 0;
      c[(c[f >> 2] | 0) + 16 >> 2] = c[(c[f >> 2] | 0) + 8 >> 2];
      if ((c[(c[f >> 2] | 0) + 24 >> 2] | 0) < 0) c[(c[f >> 2] | 0) + 24 >> 2] = 0 - (c[(c[f >> 2] | 0) + 24 >> 2] | 0);
      c[(c[f >> 2] | 0) + 4 >> 2] = (c[(c[f >> 2] | 0) + 24 >> 2] | 0) != 0 ? 42 : 113;
      if ((c[(c[f >> 2] | 0) + 24 >> 2] | 0) == 2) g = fd(0, 0, 0) | 0;else g = ed(0, 0, 0) | 0;
      c[(c[e >> 2] | 0) + 48 >> 2] = g;
      c[(c[f >> 2] | 0) + 40 >> 2] = 0;
      td(c[f >> 2] | 0);
      Bd(c[f >> 2] | 0);
      c[d >> 2] = 0;
      h = c[d >> 2] | 0;
      i = b;
      return h | 0;
    }

    c[d >> 2] = -2;
    h = c[d >> 2] | 0;
    i = b;
    return h | 0;
  }

  function kd(e, f) {
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0;
    g = i;
    i = i + 64 | 0;
    h = g + 48 | 0;
    j = g + 44 | 0;
    k = g + 40 | 0;
    l = g + 36 | 0;
    m = g + 32 | 0;
    n = g + 28 | 0;
    o = g + 24 | 0;
    p = g + 20 | 0;
    q = g + 16 | 0;
    r = g + 12 | 0;
    s = g + 8 | 0;
    t = g + 4 | 0;
    u = g;
    c[j >> 2] = e;
    c[k >> 2] = f;

    if ((c[j >> 2] | 0) != 0 ? !(((c[k >> 2] | 0) > 5 ? 1 : (c[(c[j >> 2] | 0) + 28 >> 2] | 0) == 0) | (c[k >> 2] | 0) < 0) : 0) {
      c[m >> 2] = c[(c[j >> 2] | 0) + 28 >> 2];

      do if (c[(c[j >> 2] | 0) + 12 >> 2] | 0) {
        if ((c[c[j >> 2] >> 2] | 0) == 0 ? (c[(c[j >> 2] | 0) + 4 >> 2] | 0) != 0 : 0) break;

        if (!((c[k >> 2] | 0) != 4 ? (c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 666 : 0)) {
          if (!(c[(c[j >> 2] | 0) + 16 >> 2] | 0)) {
            c[(c[j >> 2] | 0) + 24 >> 2] = c[9];
            c[h >> 2] = -5;
            v = c[h >> 2] | 0;
            i = g;
            return v | 0;
          }

          c[c[m >> 2] >> 2] = c[j >> 2];
          c[l >> 2] = c[(c[m >> 2] | 0) + 40 >> 2];
          c[(c[m >> 2] | 0) + 40 >> 2] = c[k >> 2];

          do if ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 42) {
            if ((c[(c[m >> 2] | 0) + 24 >> 2] | 0) != 2) {
              c[n >> 2] = 8 + ((c[(c[m >> 2] | 0) + 48 >> 2] | 0) - 8 << 4) << 8;

              do if ((c[(c[m >> 2] | 0) + 136 >> 2] | 0) < 2 ? (c[(c[m >> 2] | 0) + 132 >> 2] | 0) >= 2 : 0) {
                if ((c[(c[m >> 2] | 0) + 132 >> 2] | 0) < 6) {
                  c[o >> 2] = 1;
                  break;
                }

                if ((c[(c[m >> 2] | 0) + 132 >> 2] | 0) == 6) {
                  c[o >> 2] = 2;
                  break;
                } else {
                  c[o >> 2] = 3;
                  break;
                }
              } else w = 30; while (0);

              if ((w | 0) == 30) c[o >> 2] = 0;
              c[n >> 2] = c[n >> 2] | c[o >> 2] << 6;
              if (c[(c[m >> 2] | 0) + 108 >> 2] | 0) c[n >> 2] = c[n >> 2] | 32;
              c[n >> 2] = (c[n >> 2] | 0) + (31 - (((c[n >> 2] | 0) >>> 0) % 31 | 0));
              c[(c[m >> 2] | 0) + 4 >> 2] = 113;
              Cd(c[m >> 2] | 0, c[n >> 2] | 0);

              if (c[(c[m >> 2] | 0) + 108 >> 2] | 0) {
                Cd(c[m >> 2] | 0, (c[(c[j >> 2] | 0) + 48 >> 2] | 0) >>> 16);
                Cd(c[m >> 2] | 0, c[(c[j >> 2] | 0) + 48 >> 2] & 65535);
              }

              f = ed(0, 0, 0) | 0;
              c[(c[j >> 2] | 0) + 48 >> 2] = f;
              break;
            }

            f = fd(0, 0, 0) | 0;
            c[(c[j >> 2] | 0) + 48 >> 2] = f;
            f = (c[m >> 2] | 0) + 20 | 0;
            e = c[f >> 2] | 0;
            c[f >> 2] = e + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = 31;
            e = (c[m >> 2] | 0) + 20 | 0;
            f = c[e >> 2] | 0;
            c[e >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = -117;
            f = (c[m >> 2] | 0) + 20 | 0;
            e = c[f >> 2] | 0;
            c[f >> 2] = e + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = 8;
            e = c[m >> 2] | 0;

            if (!(c[(c[m >> 2] | 0) + 28 >> 2] | 0)) {
              f = e + 20 | 0;
              x = c[f >> 2] | 0;
              c[f >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = 0;
              x = (c[m >> 2] | 0) + 20 | 0;
              f = c[x >> 2] | 0;
              c[x >> 2] = f + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = 0;
              f = (c[m >> 2] | 0) + 20 | 0;
              x = c[f >> 2] | 0;
              c[f >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = 0;
              x = (c[m >> 2] | 0) + 20 | 0;
              f = c[x >> 2] | 0;
              c[x >> 2] = f + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = 0;
              f = (c[m >> 2] | 0) + 20 | 0;
              x = c[f >> 2] | 0;
              c[f >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = 0;
              if ((c[(c[m >> 2] | 0) + 132 >> 2] | 0) == 9) y = 2;else {
                if ((c[(c[m >> 2] | 0) + 136 >> 2] | 0) >= 2) z = 1;else z = (c[(c[m >> 2] | 0) + 132 >> 2] | 0) < 2;
                y = z ? 4 : 0;
              }
              x = (c[m >> 2] | 0) + 20 | 0;
              f = c[x >> 2] | 0;
              c[x >> 2] = f + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = y;
              f = (c[m >> 2] | 0) + 20 | 0;
              x = c[f >> 2] | 0;
              c[f >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = 3;
              c[(c[m >> 2] | 0) + 4 >> 2] = 113;
              break;
            }

            x = ((c[c[e + 28 >> 2] >> 2] | 0) != 0 ? 1 : 0) + ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? 2 : 0) + ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 16 >> 2] | 0) == 0 ? 0 : 4) + ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 28 >> 2] | 0) == 0 ? 0 : 8) + ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 36 >> 2] | 0) == 0 ? 0 : 16) & 255;
            e = (c[m >> 2] | 0) + 20 | 0;
            f = c[e >> 2] | 0;
            c[e >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = x;
            x = c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 4 >> 2] & 255;
            f = (c[m >> 2] | 0) + 20 | 0;
            e = c[f >> 2] | 0;
            c[f >> 2] = e + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = x;
            x = (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 4 >> 2] | 0) >>> 8 & 255;
            e = (c[m >> 2] | 0) + 20 | 0;
            f = c[e >> 2] | 0;
            c[e >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = x;
            x = (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 4 >> 2] | 0) >>> 16 & 255;
            f = (c[m >> 2] | 0) + 20 | 0;
            e = c[f >> 2] | 0;
            c[f >> 2] = e + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = x;
            x = (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 4 >> 2] | 0) >>> 24 & 255;
            e = (c[m >> 2] | 0) + 20 | 0;
            f = c[e >> 2] | 0;
            c[e >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = x;
            if ((c[(c[m >> 2] | 0) + 132 >> 2] | 0) == 9) A = 2;else {
              if ((c[(c[m >> 2] | 0) + 136 >> 2] | 0) >= 2) B = 1;else B = (c[(c[m >> 2] | 0) + 132 >> 2] | 0) < 2;
              A = B ? 4 : 0;
            }
            x = (c[m >> 2] | 0) + 20 | 0;
            f = c[x >> 2] | 0;
            c[x >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = A;
            f = c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 12 >> 2] & 255;
            x = (c[m >> 2] | 0) + 20 | 0;
            e = c[x >> 2] | 0;
            c[x >> 2] = e + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = f;

            if (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 16 >> 2] | 0) {
              f = c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 20 >> 2] & 255;
              e = (c[m >> 2] | 0) + 20 | 0;
              x = c[e >> 2] | 0;
              c[e >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = f;
              f = (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 20 >> 2] | 0) >>> 8 & 255;
              x = (c[m >> 2] | 0) + 20 | 0;
              e = c[x >> 2] | 0;
              c[x >> 2] = e + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = f;
            }

            if (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) {
              f = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, c[(c[m >> 2] | 0) + 8 >> 2] | 0, c[(c[m >> 2] | 0) + 20 >> 2] | 0) | 0;
              c[(c[j >> 2] | 0) + 48 >> 2] = f;
            }

            c[(c[m >> 2] | 0) + 32 >> 2] = 0;
            c[(c[m >> 2] | 0) + 4 >> 2] = 69;
          } while (0);

          do if ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 69) {
            f = c[m >> 2] | 0;

            if (!(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 16 >> 2] | 0)) {
              c[f + 4 >> 2] = 73;
              break;
            }

            c[p >> 2] = c[f + 20 >> 2];

            while (1) {
              if ((c[(c[m >> 2] | 0) + 32 >> 2] | 0) >>> 0 >= (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 20 >> 2] & 65535) >>> 0) break;

              if ((c[(c[m >> 2] | 0) + 20 >> 2] | 0) == (c[(c[m >> 2] | 0) + 12 >> 2] | 0)) {
                if ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 20 >> 2] | 0) >>> 0 > (c[p >> 2] | 0) >>> 0 : 0) {
                  f = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, (c[(c[m >> 2] | 0) + 8 >> 2] | 0) + (c[p >> 2] | 0) | 0, (c[(c[m >> 2] | 0) + 20 >> 2] | 0) - (c[p >> 2] | 0) | 0) | 0;
                  c[(c[j >> 2] | 0) + 48 >> 2] = f;
                }

                Dd(c[j >> 2] | 0);
                c[p >> 2] = c[(c[m >> 2] | 0) + 20 >> 2];
                if ((c[(c[m >> 2] | 0) + 20 >> 2] | 0) == (c[(c[m >> 2] | 0) + 12 >> 2] | 0)) break;
              }

              f = a[(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 16 >> 2] | 0) + (c[(c[m >> 2] | 0) + 32 >> 2] | 0) >> 0] | 0;
              e = (c[m >> 2] | 0) + 20 | 0;
              x = c[e >> 2] | 0;
              c[e >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = f;
              f = (c[m >> 2] | 0) + 32 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + 1;
            }

            if ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 20 >> 2] | 0) >>> 0 > (c[p >> 2] | 0) >>> 0 : 0) {
              f = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, (c[(c[m >> 2] | 0) + 8 >> 2] | 0) + (c[p >> 2] | 0) | 0, (c[(c[m >> 2] | 0) + 20 >> 2] | 0) - (c[p >> 2] | 0) | 0) | 0;
              c[(c[j >> 2] | 0) + 48 >> 2] = f;
            }

            if ((c[(c[m >> 2] | 0) + 32 >> 2] | 0) == (c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 20 >> 2] | 0)) {
              c[(c[m >> 2] | 0) + 32 >> 2] = 0;
              c[(c[m >> 2] | 0) + 4 >> 2] = 73;
            }
          } while (0);

          do if ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 73) {
            f = c[m >> 2] | 0;

            if (!(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 28 >> 2] | 0)) {
              c[f + 4 >> 2] = 91;
              break;
            }

            c[q >> 2] = c[f + 20 >> 2];

            do {
              if ((c[(c[m >> 2] | 0) + 20 >> 2] | 0) == (c[(c[m >> 2] | 0) + 12 >> 2] | 0)) {
                if ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 20 >> 2] | 0) >>> 0 > (c[q >> 2] | 0) >>> 0 : 0) {
                  f = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, (c[(c[m >> 2] | 0) + 8 >> 2] | 0) + (c[q >> 2] | 0) | 0, (c[(c[m >> 2] | 0) + 20 >> 2] | 0) - (c[q >> 2] | 0) | 0) | 0;
                  c[(c[j >> 2] | 0) + 48 >> 2] = f;
                }

                Dd(c[j >> 2] | 0);
                c[q >> 2] = c[(c[m >> 2] | 0) + 20 >> 2];

                if ((c[(c[m >> 2] | 0) + 20 >> 2] | 0) == (c[(c[m >> 2] | 0) + 12 >> 2] | 0)) {
                  w = 65;
                  break;
                }
              }

              f = (c[m >> 2] | 0) + 32 | 0;
              x = c[f >> 2] | 0;
              c[f >> 2] = x + 1;
              c[r >> 2] = d[(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 28 >> 2] | 0) + x >> 0];
              x = c[r >> 2] & 255;
              f = (c[m >> 2] | 0) + 20 | 0;
              e = c[f >> 2] | 0;
              c[f >> 2] = e + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = x;
            } while ((c[r >> 2] | 0) != 0);

            if ((w | 0) == 65) c[r >> 2] = 1;

            if ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 20 >> 2] | 0) >>> 0 > (c[q >> 2] | 0) >>> 0 : 0) {
              x = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, (c[(c[m >> 2] | 0) + 8 >> 2] | 0) + (c[q >> 2] | 0) | 0, (c[(c[m >> 2] | 0) + 20 >> 2] | 0) - (c[q >> 2] | 0) | 0) | 0;
              c[(c[j >> 2] | 0) + 48 >> 2] = x;
            }

            if (!(c[r >> 2] | 0)) {
              c[(c[m >> 2] | 0) + 32 >> 2] = 0;
              c[(c[m >> 2] | 0) + 4 >> 2] = 91;
            }
          } while (0);

          do if ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 91) {
            x = c[m >> 2] | 0;

            if (!(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 36 >> 2] | 0)) {
              c[x + 4 >> 2] = 103;
              break;
            }

            c[s >> 2] = c[x + 20 >> 2];

            do {
              if ((c[(c[m >> 2] | 0) + 20 >> 2] | 0) == (c[(c[m >> 2] | 0) + 12 >> 2] | 0)) {
                if ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 20 >> 2] | 0) >>> 0 > (c[s >> 2] | 0) >>> 0 : 0) {
                  x = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, (c[(c[m >> 2] | 0) + 8 >> 2] | 0) + (c[s >> 2] | 0) | 0, (c[(c[m >> 2] | 0) + 20 >> 2] | 0) - (c[s >> 2] | 0) | 0) | 0;
                  c[(c[j >> 2] | 0) + 48 >> 2] = x;
                }

                Dd(c[j >> 2] | 0);
                c[s >> 2] = c[(c[m >> 2] | 0) + 20 >> 2];

                if ((c[(c[m >> 2] | 0) + 20 >> 2] | 0) == (c[(c[m >> 2] | 0) + 12 >> 2] | 0)) {
                  w = 81;
                  break;
                }
              }

              x = (c[m >> 2] | 0) + 32 | 0;
              e = c[x >> 2] | 0;
              c[x >> 2] = e + 1;
              c[t >> 2] = d[(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 36 >> 2] | 0) + e >> 0];
              e = c[t >> 2] & 255;
              x = (c[m >> 2] | 0) + 20 | 0;
              f = c[x >> 2] | 0;
              c[x >> 2] = f + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = e;
            } while ((c[t >> 2] | 0) != 0);

            if ((w | 0) == 81) c[t >> 2] = 1;

            if ((c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 20 >> 2] | 0) >>> 0 > (c[s >> 2] | 0) >>> 0 : 0) {
              e = fd(c[(c[j >> 2] | 0) + 48 >> 2] | 0, (c[(c[m >> 2] | 0) + 8 >> 2] | 0) + (c[s >> 2] | 0) | 0, (c[(c[m >> 2] | 0) + 20 >> 2] | 0) - (c[s >> 2] | 0) | 0) | 0;
              c[(c[j >> 2] | 0) + 48 >> 2] = e;
            }

            if (!(c[t >> 2] | 0)) c[(c[m >> 2] | 0) + 4 >> 2] = 103;
          } while (0);

          do if ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 103) {
            e = c[m >> 2] | 0;

            if (!(c[(c[(c[m >> 2] | 0) + 28 >> 2] | 0) + 44 >> 2] | 0)) {
              c[e + 4 >> 2] = 113;
              break;
            }

            if (((c[e + 20 >> 2] | 0) + 2 | 0) >>> 0 > (c[(c[m >> 2] | 0) + 12 >> 2] | 0) >>> 0) Dd(c[j >> 2] | 0);

            if (((c[(c[m >> 2] | 0) + 20 >> 2] | 0) + 2 | 0) >>> 0 <= (c[(c[m >> 2] | 0) + 12 >> 2] | 0) >>> 0) {
              e = c[(c[j >> 2] | 0) + 48 >> 2] & 255;
              f = (c[m >> 2] | 0) + 20 | 0;
              x = c[f >> 2] | 0;
              c[f >> 2] = x + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = e;
              e = (c[(c[j >> 2] | 0) + 48 >> 2] | 0) >>> 8 & 255;
              x = (c[m >> 2] | 0) + 20 | 0;
              f = c[x >> 2] | 0;
              c[x >> 2] = f + 1;
              a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = e;
              e = fd(0, 0, 0) | 0;
              c[(c[j >> 2] | 0) + 48 >> 2] = e;
              c[(c[m >> 2] | 0) + 4 >> 2] = 113;
            }
          } while (0);

          e = c[j >> 2] | 0;

          if (c[(c[m >> 2] | 0) + 20 >> 2] | 0) {
            Dd(e);

            if (!(c[(c[j >> 2] | 0) + 16 >> 2] | 0)) {
              c[(c[m >> 2] | 0) + 40 >> 2] = -1;
              c[h >> 2] = 0;
              v = c[h >> 2] | 0;
              i = g;
              return v | 0;
            }
          } else if ((c[e + 4 >> 2] | 0) == 0 ? (c[k >> 2] | 0) != 4 ? (c[k >> 2] | 0) <= (c[l >> 2] | 0) : 0 : 0) {
            c[(c[j >> 2] | 0) + 24 >> 2] = c[9];
            c[h >> 2] = -5;
            v = c[h >> 2] | 0;
            i = g;
            return v | 0;
          }

          if ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) == 666 ? (c[(c[j >> 2] | 0) + 4 >> 2] | 0) != 0 : 0) {
            c[(c[j >> 2] | 0) + 24 >> 2] = c[9];
            c[h >> 2] = -5;
            v = c[h >> 2] | 0;
            i = g;
            return v | 0;
          }

          if ((c[(c[j >> 2] | 0) + 4 >> 2] | 0) == 0 ? (c[(c[m >> 2] | 0) + 116 >> 2] | 0) == 0 : 0) {
            if ((c[k >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 4 >> 2] | 0) != 666 : 0) w = 109;
          } else w = 109;

          do if ((w | 0) == 109) {
            e = c[m >> 2] | 0;

            do if ((c[(c[m >> 2] | 0) + 136 >> 2] | 0) != 2) {
              f = c[m >> 2] | 0;

              if ((c[e + 136 >> 2] | 0) == 3) {
                C = Fd(f, c[k >> 2] | 0) | 0;
                break;
              } else {
                C = sa(c[8240 + ((c[f + 132 >> 2] | 0) * 12 | 0) + 8 >> 2] | 0, c[m >> 2] | 0, c[k >> 2] | 0) | 0;
                break;
              }
            } else C = Ed(e, c[k >> 2] | 0) | 0; while (0);

            c[u >> 2] = C;
            if ((c[u >> 2] | 0) == 2 | (c[u >> 2] | 0) == 3) c[(c[m >> 2] | 0) + 4 >> 2] = 666;

            if ((c[u >> 2] | 0) == 0 | (c[u >> 2] | 0) == 2) {
              if (!(c[(c[j >> 2] | 0) + 16 >> 2] | 0)) c[(c[m >> 2] | 0) + 40 >> 2] = -1;
              c[h >> 2] = 0;
              v = c[h >> 2] | 0;
              i = g;
              return v | 0;
            }

            if ((c[u >> 2] | 0) != 1) break;

            do if ((c[k >> 2] | 0) == 1) vd(c[m >> 2] | 0);else {
              if ((c[k >> 2] | 0) == 5) break;
              ud(c[m >> 2] | 0, 0, 0, 0);
              if ((c[k >> 2] | 0) != 3) break;
              b[(c[(c[m >> 2] | 0) + 68 >> 2] | 0) + ((c[(c[m >> 2] | 0) + 76 >> 2] | 0) - 1 << 1) >> 1] = 0;
              Ze(c[(c[m >> 2] | 0) + 68 >> 2] | 0, 0, (c[(c[m >> 2] | 0) + 76 >> 2] | 0) - 1 << 1 | 0) | 0;
              if (c[(c[m >> 2] | 0) + 116 >> 2] | 0) break;
              c[(c[m >> 2] | 0) + 108 >> 2] = 0;
              c[(c[m >> 2] | 0) + 92 >> 2] = 0;
            } while (0);

            Dd(c[j >> 2] | 0);
            if (c[(c[j >> 2] | 0) + 16 >> 2] | 0) break;
            c[(c[m >> 2] | 0) + 40 >> 2] = -1;
            c[h >> 2] = 0;
            v = c[h >> 2] | 0;
            i = g;
            return v | 0;
          } while (0);

          if ((c[k >> 2] | 0) != 4) {
            c[h >> 2] = 0;
            v = c[h >> 2] | 0;
            i = g;
            return v | 0;
          }

          if ((c[(c[m >> 2] | 0) + 24 >> 2] | 0) <= 0) {
            c[h >> 2] = 1;
            v = c[h >> 2] | 0;
            i = g;
            return v | 0;
          }

          if ((c[(c[m >> 2] | 0) + 24 >> 2] | 0) == 2) {
            e = c[(c[j >> 2] | 0) + 48 >> 2] & 255;
            f = (c[m >> 2] | 0) + 20 | 0;
            x = c[f >> 2] | 0;
            c[f >> 2] = x + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = e;
            e = (c[(c[j >> 2] | 0) + 48 >> 2] | 0) >>> 8 & 255;
            x = (c[m >> 2] | 0) + 20 | 0;
            f = c[x >> 2] | 0;
            c[x >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = e;
            e = (c[(c[j >> 2] | 0) + 48 >> 2] | 0) >>> 16 & 255;
            f = (c[m >> 2] | 0) + 20 | 0;
            x = c[f >> 2] | 0;
            c[f >> 2] = x + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = e;
            e = (c[(c[j >> 2] | 0) + 48 >> 2] | 0) >>> 24 & 255;
            x = (c[m >> 2] | 0) + 20 | 0;
            f = c[x >> 2] | 0;
            c[x >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = e;
            e = c[(c[j >> 2] | 0) + 8 >> 2] & 255;
            f = (c[m >> 2] | 0) + 20 | 0;
            x = c[f >> 2] | 0;
            c[f >> 2] = x + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = e;
            e = (c[(c[j >> 2] | 0) + 8 >> 2] | 0) >>> 8 & 255;
            x = (c[m >> 2] | 0) + 20 | 0;
            f = c[x >> 2] | 0;
            c[x >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = e;
            e = (c[(c[j >> 2] | 0) + 8 >> 2] | 0) >>> 16 & 255;
            f = (c[m >> 2] | 0) + 20 | 0;
            x = c[f >> 2] | 0;
            c[f >> 2] = x + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + x >> 0] = e;
            e = (c[(c[j >> 2] | 0) + 8 >> 2] | 0) >>> 24 & 255;
            x = (c[m >> 2] | 0) + 20 | 0;
            f = c[x >> 2] | 0;
            c[x >> 2] = f + 1;
            a[(c[(c[m >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = e;
          } else {
            Cd(c[m >> 2] | 0, (c[(c[j >> 2] | 0) + 48 >> 2] | 0) >>> 16);
            Cd(c[m >> 2] | 0, c[(c[j >> 2] | 0) + 48 >> 2] & 65535);
          }

          Dd(c[j >> 2] | 0);
          if ((c[(c[m >> 2] | 0) + 24 >> 2] | 0) > 0) c[(c[m >> 2] | 0) + 24 >> 2] = 0 - (c[(c[m >> 2] | 0) + 24 >> 2] | 0);
          c[h >> 2] = (c[(c[m >> 2] | 0) + 20 >> 2] | 0) != 0 ? 0 : 1;
          v = c[h >> 2] | 0;
          i = g;
          return v | 0;
        }
      } while (0);

      c[(c[j >> 2] | 0) + 24 >> 2] = c[6];
      c[h >> 2] = -2;
      v = c[h >> 2] | 0;
      i = g;
      return v | 0;
    }

    c[h >> 2] = -2;
    v = c[h >> 2] | 0;
    i = g;
    return v | 0;
  }

  function ld(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0;
    b = i;
    i = i + 16 | 0;
    d = b + 8 | 0;
    e = b + 4 | 0;
    f = b;
    c[e >> 2] = a;

    if ((c[e >> 2] | 0) != 0 ? (c[(c[e >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) {
      c[f >> 2] = c[(c[e >> 2] | 0) + 28 >> 2];
      c[(c[f >> 2] | 0) + 28 >> 2] = 0;
      c[(c[e >> 2] | 0) + 20 >> 2] = 0;
      c[(c[e >> 2] | 0) + 8 >> 2] = 0;
      c[(c[e >> 2] | 0) + 24 >> 2] = 0;
      c[(c[e >> 2] | 0) + 48 >> 2] = 1;
      c[c[f >> 2] >> 2] = 0;
      c[(c[f >> 2] | 0) + 4 >> 2] = 0;
      c[(c[f >> 2] | 0) + 12 >> 2] = 0;
      c[(c[f >> 2] | 0) + 20 >> 2] = 32768;
      c[(c[f >> 2] | 0) + 32 >> 2] = 0;
      c[(c[f >> 2] | 0) + 40 >> 2] = 0;
      c[(c[f >> 2] | 0) + 44 >> 2] = 0;
      c[(c[f >> 2] | 0) + 48 >> 2] = 0;
      c[(c[f >> 2] | 0) + 56 >> 2] = 0;
      c[(c[f >> 2] | 0) + 60 >> 2] = 0;
      e = (c[f >> 2] | 0) + 1328 | 0;
      c[(c[f >> 2] | 0) + 108 >> 2] = e;
      c[(c[f >> 2] | 0) + 80 >> 2] = e;
      c[(c[f >> 2] | 0) + 76 >> 2] = e;
      c[(c[f >> 2] | 0) + 7104 >> 2] = 1;
      c[(c[f >> 2] | 0) + 7108 >> 2] = -1;
      c[d >> 2] = 0;
      g = c[d >> 2] | 0;
      i = b;
      return g | 0;
    }

    c[d >> 2] = -2;
    g = c[d >> 2] | 0;
    i = b;
    return g | 0;
  }

  function md(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0;
    d = i;
    i = i + 32 | 0;
    e = d + 16 | 0;
    f = d + 12 | 0;
    g = d + 8 | 0;
    h = d + 4 | 0;
    j = d;
    c[f >> 2] = a;
    c[g >> 2] = b;

    if ((c[f >> 2] | 0) != 0 ? (c[(c[f >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) {
      c[j >> 2] = c[(c[f >> 2] | 0) + 28 >> 2];

      if ((c[g >> 2] | 0) >= 0) {
        c[h >> 2] = (c[g >> 2] >> 4) + 1;
        if ((c[g >> 2] | 0) < 48) c[g >> 2] = c[g >> 2] & 15;
      } else {
        c[h >> 2] = 0;
        c[g >> 2] = 0 - (c[g >> 2] | 0);
      }

      if ((c[g >> 2] | 0) != 0 ? (c[g >> 2] | 0) < 8 | (c[g >> 2] | 0) > 15 : 0) {
        c[e >> 2] = -2;
        k = c[e >> 2] | 0;
        i = d;
        return k | 0;
      }

      if ((c[(c[j >> 2] | 0) + 52 >> 2] | 0) != 0 ? (c[(c[j >> 2] | 0) + 36 >> 2] | 0) != (c[g >> 2] | 0) : 0) {
        ka(c[(c[f >> 2] | 0) + 36 >> 2] | 0, c[(c[f >> 2] | 0) + 40 >> 2] | 0, c[(c[j >> 2] | 0) + 52 >> 2] | 0);
        c[(c[j >> 2] | 0) + 52 >> 2] = 0;
      }

      c[(c[j >> 2] | 0) + 8 >> 2] = c[h >> 2];
      c[(c[j >> 2] | 0) + 36 >> 2] = c[g >> 2];
      c[e >> 2] = ld(c[f >> 2] | 0) | 0;
      k = c[e >> 2] | 0;
      i = d;
      return k | 0;
    }

    c[e >> 2] = -2;
    k = c[e >> 2] | 0;
    i = d;
    return k | 0;
  }

  function nd(b, d, e, f) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
    g = i;
    i = i + 32 | 0;
    h = g + 24 | 0;
    j = g + 20 | 0;
    k = g + 16 | 0;
    l = g + 12 | 0;
    m = g + 8 | 0;
    n = g + 4 | 0;
    o = g;
    c[j >> 2] = b;
    c[k >> 2] = d;
    c[l >> 2] = e;
    c[m >> 2] = f;

    if ((c[l >> 2] | 0) != 0 ? !((c[m >> 2] | 0) != 56 ? 1 : (a[c[l >> 2] >> 0] | 0) != (a[14283] | 0)) : 0) {
      if (!(c[j >> 2] | 0)) {
        c[h >> 2] = -2;
        p = c[h >> 2] | 0;
        i = g;
        return p | 0;
      }

      c[(c[j >> 2] | 0) + 24 >> 2] = 0;

      if (!(c[(c[j >> 2] | 0) + 32 >> 2] | 0)) {
        c[(c[j >> 2] | 0) + 32 >> 2] = 17;
        c[(c[j >> 2] | 0) + 40 >> 2] = 0;
      }

      if (!(c[(c[j >> 2] | 0) + 36 >> 2] | 0)) c[(c[j >> 2] | 0) + 36 >> 2] = 2;
      c[o >> 2] = ea(c[(c[j >> 2] | 0) + 32 >> 2] | 0, c[(c[j >> 2] | 0) + 40 >> 2] | 0, 1, 7116) | 0;

      if (!(c[o >> 2] | 0)) {
        c[h >> 2] = -4;
        p = c[h >> 2] | 0;
        i = g;
        return p | 0;
      }

      c[(c[j >> 2] | 0) + 28 >> 2] = c[o >> 2];
      c[(c[o >> 2] | 0) + 52 >> 2] = 0;
      c[n >> 2] = md(c[j >> 2] | 0, c[k >> 2] | 0) | 0;

      if (c[n >> 2] | 0) {
        ka(c[(c[j >> 2] | 0) + 36 >> 2] | 0, c[(c[j >> 2] | 0) + 40 >> 2] | 0, c[o >> 2] | 0);
        c[(c[j >> 2] | 0) + 28 >> 2] = 0;
      }

      c[h >> 2] = c[n >> 2];
      p = c[h >> 2] | 0;
      i = g;
      return p | 0;
    }

    c[h >> 2] = -6;
    p = c[h >> 2] | 0;
    i = g;
    return p | 0;
  }

  function od(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0;
    e = i;
    i = i + 16 | 0;
    f = e + 8 | 0;
    g = e + 4 | 0;
    h = e;
    c[f >> 2] = a;
    c[g >> 2] = b;
    c[h >> 2] = d;
    d = nd(c[f >> 2] | 0, 15, c[g >> 2] | 0, c[h >> 2] | 0) | 0;
    i = e;
    return d | 0;
  }

  function pd(f, g) {
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0;
    h = i;
    i = i + 80 | 0;
    j = h + 60 | 0;
    k = h + 56 | 0;
    l = h + 52 | 0;
    m = h + 48 | 0;
    n = h + 44 | 0;
    o = h + 40 | 0;
    p = h + 36 | 0;
    q = h + 32 | 0;
    r = h + 28 | 0;
    s = h + 24 | 0;
    t = h + 20 | 0;
    u = h + 16 | 0;
    v = h + 12 | 0;
    w = h + 8 | 0;
    x = h + 68 | 0;
    y = h + 64 | 0;
    z = h + 4 | 0;
    A = h;
    B = h + 72 | 0;
    c[k >> 2] = f;
    c[l >> 2] = g;

    do if (((c[k >> 2] | 0) != 0 ? (c[(c[k >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) ? (c[(c[k >> 2] | 0) + 12 >> 2] | 0) != 0 : 0) {
      if ((c[c[k >> 2] >> 2] | 0) == 0 ? (c[(c[k >> 2] | 0) + 4 >> 2] | 0) != 0 : 0) break;
      c[m >> 2] = c[(c[k >> 2] | 0) + 28 >> 2];
      if ((c[c[m >> 2] >> 2] | 0) == 11) c[c[m >> 2] >> 2] = 12;
      c[o >> 2] = c[(c[k >> 2] | 0) + 12 >> 2];
      c[q >> 2] = c[(c[k >> 2] | 0) + 16 >> 2];
      c[n >> 2] = c[c[k >> 2] >> 2];
      c[p >> 2] = c[(c[k >> 2] | 0) + 4 >> 2];
      c[r >> 2] = c[(c[m >> 2] | 0) + 56 >> 2];
      c[s >> 2] = c[(c[m >> 2] | 0) + 60 >> 2];
      c[t >> 2] = c[p >> 2];
      c[u >> 2] = c[q >> 2];
      c[A >> 2] = 0;

      a: while (1) {
        b: do switch (c[c[m >> 2] >> 2] | 0) {
          case 28:
            {
              C = 304;
              break a;
              break;
            }

          case 29:
            {
              C = 305;
              break a;
              break;
            }

          case 30:
            {
              C = 306;
              break a;
              break;
            }

          case 0:
            {
              if (!(c[(c[m >> 2] | 0) + 8 >> 2] | 0)) {
                c[c[m >> 2] >> 2] = 12;
                continue a;
              }

              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= 16) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              if ((c[r >> 2] | 0) == 35615 ? (c[(c[m >> 2] | 0) + 8 >> 2] & 2 | 0) != 0 : 0) {
                g = fd(0, 0, 0) | 0;
                c[(c[m >> 2] | 0) + 24 >> 2] = g;
                a[B >> 0] = c[r >> 2];
                a[B + 1 >> 0] = (c[r >> 2] | 0) >>> 8;
                g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, B, 2) | 0;
                c[(c[m >> 2] | 0) + 24 >> 2] = g;
                c[r >> 2] = 0;
                c[s >> 2] = 0;
                c[c[m >> 2] >> 2] = 1;
                continue a;
              }

              c[(c[m >> 2] | 0) + 16 >> 2] = 0;
              if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 48 >> 2] = -1;

              if ((c[(c[m >> 2] | 0) + 8 >> 2] & 1 | 0) != 0 ? (((((c[r >> 2] & 255) << 8) + ((c[r >> 2] | 0) >>> 8) | 0) >>> 0) % 31 | 0 | 0) == 0 : 0) {
                if ((c[r >> 2] & 15 | 0) != 8) {
                  c[(c[k >> 2] | 0) + 24 >> 2] = 14312;
                  c[c[m >> 2] >> 2] = 29;
                  continue a;
                }

                c[r >> 2] = (c[r >> 2] | 0) >>> 4;
                c[s >> 2] = (c[s >> 2] | 0) - 4;
                c[z >> 2] = (c[r >> 2] & 15) + 8;
                g = c[z >> 2] | 0;
                f = (c[m >> 2] | 0) + 36 | 0;

                if (c[(c[m >> 2] | 0) + 36 >> 2] | 0) {
                  if (g >>> 0 > (c[f >> 2] | 0) >>> 0) {
                    c[(c[k >> 2] | 0) + 24 >> 2] = 14339;
                    c[c[m >> 2] >> 2] = 29;
                    continue a;
                  }
                } else c[f >> 2] = g;

                c[(c[m >> 2] | 0) + 20 >> 2] = 1 << c[z >> 2];
                g = ed(0, 0, 0) | 0;
                c[(c[m >> 2] | 0) + 24 >> 2] = g;
                c[(c[k >> 2] | 0) + 48 >> 2] = g;
                c[c[m >> 2] >> 2] = (c[r >> 2] & 512 | 0) != 0 ? 9 : 11;
                c[r >> 2] = 0;
                c[s >> 2] = 0;
                continue a;
              }

              c[(c[k >> 2] | 0) + 24 >> 2] = 14289;
              c[c[m >> 2] >> 2] = 29;
              continue a;
              break;
            }

          case 1:
            {
              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= 16) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              c[(c[m >> 2] | 0) + 16 >> 2] = c[r >> 2];

              if ((c[(c[m >> 2] | 0) + 16 >> 2] & 255 | 0) != 8) {
                c[(c[k >> 2] | 0) + 24 >> 2] = 14312;
                c[c[m >> 2] >> 2] = 29;
                continue a;
              }

              if (c[(c[m >> 2] | 0) + 16 >> 2] & 57344) {
                c[(c[k >> 2] | 0) + 24 >> 2] = 14359;
                c[c[m >> 2] >> 2] = 29;
                continue a;
              }

              if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[c[(c[m >> 2] | 0) + 32 >> 2] >> 2] = (c[r >> 2] | 0) >>> 8 & 1;

              if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
                a[B >> 0] = c[r >> 2];
                a[B + 1 >> 0] = (c[r >> 2] | 0) >>> 8;
                g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, B, 2) | 0;
                c[(c[m >> 2] | 0) + 24 >> 2] = g;
              }

              c[r >> 2] = 0;
              c[s >> 2] = 0;
              c[c[m >> 2] >> 2] = 2;
              C = 42;
              break;
            }

          case 2:
            {
              C = 42;
              break;
            }

          case 3:
            {
              C = 50;
              break;
            }

          case 4:
            {
              C = 58;
              break;
            }

          case 5:
            {
              C = 70;
              break;
            }

          case 6:
            {
              C = 85;
              break;
            }

          case 7:
            {
              C = 100;
              break;
            }

          case 8:
            {
              C = 115;
              break;
            }

          case 9:
            {
              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= 32) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              g = ((c[r >> 2] | 0) >>> 24 & 255) + ((c[r >> 2] | 0) >>> 8 & 65280) + ((c[r >> 2] & 65280) << 8) + ((c[r >> 2] & 255) << 24) | 0;
              c[(c[m >> 2] | 0) + 24 >> 2] = g;
              c[(c[k >> 2] | 0) + 48 >> 2] = g;
              c[r >> 2] = 0;
              c[s >> 2] = 0;
              c[c[m >> 2] >> 2] = 10;
              C = 129;
              break;
            }

          case 10:
            {
              C = 129;
              break;
            }

          case 11:
            {
              C = 132;
              break;
            }

          case 12:
            {
              C = 133;
              break;
            }

          case 13:
            {
              c[r >> 2] = (c[r >> 2] | 0) >>> (c[s >> 2] & 7);
              c[s >> 2] = (c[s >> 2] | 0) - (c[s >> 2] & 7);

              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= 32) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              if ((c[r >> 2] & 65535 | 0) == ((c[r >> 2] | 0) >>> 16 ^ 65535 | 0)) {
                c[(c[m >> 2] | 0) + 64 >> 2] = c[r >> 2] & 65535;
                c[r >> 2] = 0;
                c[s >> 2] = 0;
                c[c[m >> 2] >> 2] = 14;
                if ((c[l >> 2] | 0) == 6) break a;else {
                  C = 152;
                  break b;
                }
              } else {
                c[(c[k >> 2] | 0) + 24 >> 2] = 14423;
                c[c[m >> 2] >> 2] = 29;
                continue a;
              }

              break;
            }

          case 14:
            {
              C = 152;
              break;
            }

          case 15:
            {
              C = 153;
              break;
            }

          case 16:
            {
              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= 14) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              c[(c[m >> 2] | 0) + 96 >> 2] = (c[r >> 2] & 31) + 257;
              c[r >> 2] = (c[r >> 2] | 0) >>> 5;
              c[s >> 2] = (c[s >> 2] | 0) - 5;
              c[(c[m >> 2] | 0) + 100 >> 2] = (c[r >> 2] & 31) + 1;
              c[r >> 2] = (c[r >> 2] | 0) >>> 5;
              c[s >> 2] = (c[s >> 2] | 0) - 5;
              c[(c[m >> 2] | 0) + 92 >> 2] = (c[r >> 2] & 15) + 4;
              c[r >> 2] = (c[r >> 2] | 0) >>> 4;
              c[s >> 2] = (c[s >> 2] | 0) - 4;

              if ((c[(c[m >> 2] | 0) + 96 >> 2] | 0) >>> 0 <= 286 ? (c[(c[m >> 2] | 0) + 100 >> 2] | 0) >>> 0 <= 30 : 0) {
                c[(c[m >> 2] | 0) + 104 >> 2] = 0;
                c[c[m >> 2] >> 2] = 17;
                C = 168;
                break b;
              }

              c[(c[k >> 2] | 0) + 24 >> 2] = 14452;
              c[c[m >> 2] >> 2] = 29;
              continue a;
              break;
            }

          case 17:
            {
              C = 168;
              break;
            }

          case 18:
            {
              C = 178;
              break;
            }

          case 19:
            {
              C = 215;
              break;
            }

          case 20:
            {
              C = 216;
              break;
            }

          case 21:
            {
              C = 237;
              break;
            }

          case 22:
            {
              C = 243;
              break;
            }

          case 23:
            {
              C = 255;
              break;
            }

          case 24:
            break;

          case 25:
            {
              if (!(c[q >> 2] | 0)) break a;
              g = c[(c[m >> 2] | 0) + 64 >> 2] & 255;
              f = c[o >> 2] | 0;
              c[o >> 2] = f + 1;
              a[f >> 0] = g;
              c[q >> 2] = (c[q >> 2] | 0) + -1;
              c[c[m >> 2] >> 2] = 20;
              continue a;
              break;
            }

          case 26:
            {
              do if (c[(c[m >> 2] | 0) + 8 >> 2] | 0) {
                while (1) {
                  if ((c[s >> 2] | 0) >>> 0 >= 32) break;
                  if (!(c[p >> 2] | 0)) break a;
                  c[p >> 2] = (c[p >> 2] | 0) + -1;
                  g = c[n >> 2] | 0;
                  c[n >> 2] = g + 1;
                  c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                  c[s >> 2] = (c[s >> 2] | 0) + 8;
                }

                c[u >> 2] = (c[u >> 2] | 0) - (c[q >> 2] | 0);
                g = (c[k >> 2] | 0) + 20 | 0;
                c[g >> 2] = (c[g >> 2] | 0) + (c[u >> 2] | 0);
                g = (c[m >> 2] | 0) + 28 | 0;
                c[g >> 2] = (c[g >> 2] | 0) + (c[u >> 2] | 0);

                if (c[u >> 2] | 0) {
                  g = c[(c[m >> 2] | 0) + 24 >> 2] | 0;
                  f = (c[o >> 2] | 0) + (0 - (c[u >> 2] | 0)) | 0;
                  D = c[u >> 2] | 0;
                  if (c[(c[m >> 2] | 0) + 16 >> 2] | 0) E = fd(g, f, D) | 0;else E = ed(g, f, D) | 0;
                  c[(c[m >> 2] | 0) + 24 >> 2] = E;
                  c[(c[k >> 2] | 0) + 48 >> 2] = E;
                }

                c[u >> 2] = c[q >> 2];
                D = c[r >> 2] | 0;
                if (c[(c[m >> 2] | 0) + 16 >> 2] | 0) F = D;else F = (D >>> 24 & 255) + ((c[r >> 2] | 0) >>> 8 & 65280) + ((c[r >> 2] & 65280) << 8) + ((c[r >> 2] & 255) << 24) | 0;

                if ((F | 0) != (c[(c[m >> 2] | 0) + 24 >> 2] | 0)) {
                  c[(c[k >> 2] | 0) + 24 >> 2] = 14626;
                  c[c[m >> 2] >> 2] = 29;
                  continue a;
                } else {
                  c[r >> 2] = 0;
                  c[s >> 2] = 0;
                  break;
                }
              } while (0);

              c[c[m >> 2] >> 2] = 27;
              C = 295;
              break;
            }

          case 27:
            {
              C = 295;
              break;
            }

          default:
            {
              C = 307;
              break a;
            }
        } while (0);

        do if ((C | 0) == 42) {
          while (1) {
            C = 0;
            if ((c[s >> 2] | 0) >>> 0 >= 32) break;
            if (!(c[p >> 2] | 0)) break a;
            c[p >> 2] = (c[p >> 2] | 0) + -1;
            D = c[n >> 2] | 0;
            c[n >> 2] = D + 1;
            c[r >> 2] = (c[r >> 2] | 0) + ((d[D >> 0] | 0) << c[s >> 2]);
            c[s >> 2] = (c[s >> 2] | 0) + 8;
            C = 42;
          }

          if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 4 >> 2] = c[r >> 2];

          if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
            a[B >> 0] = c[r >> 2];
            a[B + 1 >> 0] = (c[r >> 2] | 0) >>> 8;
            a[B + 2 >> 0] = (c[r >> 2] | 0) >>> 16;
            a[B + 3 >> 0] = (c[r >> 2] | 0) >>> 24;
            D = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, B, 4) | 0;
            c[(c[m >> 2] | 0) + 24 >> 2] = D;
          }

          c[r >> 2] = 0;
          c[s >> 2] = 0;
          c[c[m >> 2] >> 2] = 3;
          C = 50;
        } else if ((C | 0) == 129) {
          C = 0;

          if (!(c[(c[m >> 2] | 0) + 12 >> 2] | 0)) {
            C = 130;
            break a;
          }

          D = ed(0, 0, 0) | 0;
          c[(c[m >> 2] | 0) + 24 >> 2] = D;
          c[(c[k >> 2] | 0) + 48 >> 2] = D;
          c[c[m >> 2] >> 2] = 11;
          C = 132;
        } else if ((C | 0) == 152) {
          C = 0;
          c[c[m >> 2] >> 2] = 15;
          C = 153;
        } else if ((C | 0) == 168) {
          while (1) {
            C = 0;
            if ((c[(c[m >> 2] | 0) + 104 >> 2] | 0) >>> 0 >= (c[(c[m >> 2] | 0) + 92 >> 2] | 0) >>> 0) break;

            while (1) {
              if ((c[s >> 2] | 0) >>> 0 >= 3) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              D = c[n >> 2] | 0;
              c[n >> 2] = D + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[D >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            D = c[r >> 2] & 7;
            f = (c[m >> 2] | 0) + 104 | 0;
            g = c[f >> 2] | 0;
            c[f >> 2] = g + 1;
            b[(c[m >> 2] | 0) + 112 + ((e[9740 + (g << 1) >> 1] | 0) << 1) >> 1] = D;
            c[r >> 2] = (c[r >> 2] | 0) >>> 3;
            c[s >> 2] = (c[s >> 2] | 0) - 3;
            C = 168;
          }

          while (1) {
            G = c[m >> 2] | 0;
            if ((c[(c[m >> 2] | 0) + 104 >> 2] | 0) >>> 0 >= 19) break;
            D = G + 104 | 0;
            g = c[D >> 2] | 0;
            c[D >> 2] = g + 1;
            b[(c[m >> 2] | 0) + 112 + ((e[9740 + (g << 1) >> 1] | 0) << 1) >> 1] = 0;
          }

          c[(c[m >> 2] | 0) + 108 >> 2] = G + 1328;
          c[(c[m >> 2] | 0) + 76 >> 2] = c[(c[m >> 2] | 0) + 108 >> 2];
          c[(c[m >> 2] | 0) + 84 >> 2] = 7;
          c[A >> 2] = rd(0, (c[m >> 2] | 0) + 112 | 0, 19, (c[m >> 2] | 0) + 108 | 0, (c[m >> 2] | 0) + 84 | 0, (c[m >> 2] | 0) + 752 | 0) | 0;

          if (c[A >> 2] | 0) {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14488;
            c[c[m >> 2] >> 2] = 29;
            continue a;
          } else {
            c[(c[m >> 2] | 0) + 104 >> 2] = 0;
            c[c[m >> 2] >> 2] = 18;
            C = 178;
            break;
          }
        } else if ((C | 0) == 295) {
          C = 0;

          if (!(c[(c[m >> 2] | 0) + 8 >> 2] | 0)) {
            C = 303;
            break a;
          }

          if (!(c[(c[m >> 2] | 0) + 16 >> 2] | 0)) {
            C = 303;
            break a;
          }

          while (1) {
            if ((c[s >> 2] | 0) >>> 0 >= 32) break;
            if (!(c[p >> 2] | 0)) break a;
            c[p >> 2] = (c[p >> 2] | 0) + -1;
            g = c[n >> 2] | 0;
            c[n >> 2] = g + 1;
            c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
            c[s >> 2] = (c[s >> 2] | 0) + 8;
          }

          if ((c[r >> 2] | 0) == (c[(c[m >> 2] | 0) + 28 >> 2] | 0)) {
            C = 302;
            break a;
          }

          c[(c[k >> 2] | 0) + 24 >> 2] = 14647;
          c[c[m >> 2] >> 2] = 29;
          continue a;
        } while (0);

        do if ((C | 0) == 50) {
          while (1) {
            C = 0;
            if ((c[s >> 2] | 0) >>> 0 >= 16) break;
            if (!(c[p >> 2] | 0)) break a;
            c[p >> 2] = (c[p >> 2] | 0) + -1;
            g = c[n >> 2] | 0;
            c[n >> 2] = g + 1;
            c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
            c[s >> 2] = (c[s >> 2] | 0) + 8;
            C = 50;
          }

          if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) {
            c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 8 >> 2] = c[r >> 2] & 255;
            c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 12 >> 2] = (c[r >> 2] | 0) >>> 8;
          }

          if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
            a[B >> 0] = c[r >> 2];
            a[B + 1 >> 0] = (c[r >> 2] | 0) >>> 8;
            g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, B, 2) | 0;
            c[(c[m >> 2] | 0) + 24 >> 2] = g;
          }

          c[r >> 2] = 0;
          c[s >> 2] = 0;
          c[c[m >> 2] >> 2] = 4;
          C = 58;
        } else if ((C | 0) == 132) {
          C = 0;
          if ((c[l >> 2] | 0) == 5 | (c[l >> 2] | 0) == 6) break a;else C = 133;
        } else if ((C | 0) == 153) {
          C = 0;
          c[v >> 2] = c[(c[m >> 2] | 0) + 64 >> 2];

          if (!(c[v >> 2] | 0)) {
            c[c[m >> 2] >> 2] = 11;
            continue a;
          }

          if ((c[v >> 2] | 0) >>> 0 > (c[p >> 2] | 0) >>> 0) c[v >> 2] = c[p >> 2];
          if ((c[v >> 2] | 0) >>> 0 > (c[q >> 2] | 0) >>> 0) c[v >> 2] = c[q >> 2];
          if (!(c[v >> 2] | 0)) break a;
          af(c[o >> 2] | 0, c[n >> 2] | 0, c[v >> 2] | 0) | 0;
          c[p >> 2] = (c[p >> 2] | 0) - (c[v >> 2] | 0);
          c[n >> 2] = (c[n >> 2] | 0) + (c[v >> 2] | 0);
          c[q >> 2] = (c[q >> 2] | 0) - (c[v >> 2] | 0);
          c[o >> 2] = (c[o >> 2] | 0) + (c[v >> 2] | 0);
          g = (c[m >> 2] | 0) + 64 | 0;
          c[g >> 2] = (c[g >> 2] | 0) - (c[v >> 2] | 0);
          continue a;
        } else if ((C | 0) == 178) {
          c: while (1) {
            C = 0;
            if ((c[(c[m >> 2] | 0) + 104 >> 2] | 0) >>> 0 >= ((c[(c[m >> 2] | 0) + 96 >> 2] | 0) + (c[(c[m >> 2] | 0) + 100 >> 2] | 0) | 0) >>> 0) break;

            while (1) {
              g = (c[(c[m >> 2] | 0) + 76 >> 2] | 0) + ((c[r >> 2] & (1 << c[(c[m >> 2] | 0) + 84 >> 2]) - 1) << 2) | 0;
              b[x >> 1] = b[g >> 1] | 0;
              b[x + 2 >> 1] = b[g + 2 >> 1] | 0;
              if ((d[x + 1 >> 0] | 0) >>> 0 <= (c[s >> 2] | 0) >>> 0) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            if ((e[x + 2 >> 1] | 0 | 0) < 16) {
              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= (d[x + 1 >> 0] | 0) >>> 0) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              c[r >> 2] = (c[r >> 2] | 0) >>> (d[x + 1 >> 0] | 0);
              c[s >> 2] = (c[s >> 2] | 0) - (d[x + 1 >> 0] | 0);
              g = b[x + 2 >> 1] | 0;
              D = (c[m >> 2] | 0) + 104 | 0;
              f = c[D >> 2] | 0;
              c[D >> 2] = f + 1;
              b[(c[m >> 2] | 0) + 112 + (f << 1) >> 1] = g;
              C = 178;
              continue;
            }

            do if ((e[x + 2 >> 1] | 0 | 0) != 16) {
              if ((e[x + 2 >> 1] | 0 | 0) == 17) {
                while (1) {
                  if ((c[s >> 2] | 0) >>> 0 >= ((d[x + 1 >> 0] | 0) + 3 | 0) >>> 0) break;
                  if (!(c[p >> 2] | 0)) break a;
                  c[p >> 2] = (c[p >> 2] | 0) + -1;
                  g = c[n >> 2] | 0;
                  c[n >> 2] = g + 1;
                  c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                  c[s >> 2] = (c[s >> 2] | 0) + 8;
                }

                c[r >> 2] = (c[r >> 2] | 0) >>> (d[x + 1 >> 0] | 0);
                c[s >> 2] = (c[s >> 2] | 0) - (d[x + 1 >> 0] | 0);
                c[z >> 2] = 0;
                c[v >> 2] = 3 + (c[r >> 2] & 7);
                c[r >> 2] = (c[r >> 2] | 0) >>> 3;
                c[s >> 2] = (c[s >> 2] | 0) - 3;
                break;
              } else {
                while (1) {
                  if ((c[s >> 2] | 0) >>> 0 >= ((d[x + 1 >> 0] | 0) + 7 | 0) >>> 0) break;
                  if (!(c[p >> 2] | 0)) break a;
                  c[p >> 2] = (c[p >> 2] | 0) + -1;
                  g = c[n >> 2] | 0;
                  c[n >> 2] = g + 1;
                  c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                  c[s >> 2] = (c[s >> 2] | 0) + 8;
                }

                c[r >> 2] = (c[r >> 2] | 0) >>> (d[x + 1 >> 0] | 0);
                c[s >> 2] = (c[s >> 2] | 0) - (d[x + 1 >> 0] | 0);
                c[z >> 2] = 0;
                c[v >> 2] = 11 + (c[r >> 2] & 127);
                c[r >> 2] = (c[r >> 2] | 0) >>> 7;
                c[s >> 2] = (c[s >> 2] | 0) - 7;
                break;
              }
            } else {
              while (1) {
                if ((c[s >> 2] | 0) >>> 0 >= ((d[x + 1 >> 0] | 0) + 2 | 0) >>> 0) break;
                if (!(c[p >> 2] | 0)) break a;
                c[p >> 2] = (c[p >> 2] | 0) + -1;
                g = c[n >> 2] | 0;
                c[n >> 2] = g + 1;
                c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
                c[s >> 2] = (c[s >> 2] | 0) + 8;
              }

              c[r >> 2] = (c[r >> 2] | 0) >>> (d[x + 1 >> 0] | 0);
              c[s >> 2] = (c[s >> 2] | 0) - (d[x + 1 >> 0] | 0);

              if (!(c[(c[m >> 2] | 0) + 104 >> 2] | 0)) {
                C = 192;
                break c;
              }

              c[z >> 2] = e[(c[m >> 2] | 0) + 112 + ((c[(c[m >> 2] | 0) + 104 >> 2] | 0) - 1 << 1) >> 1];
              c[v >> 2] = 3 + (c[r >> 2] & 3);
              c[r >> 2] = (c[r >> 2] | 0) >>> 2;
              c[s >> 2] = (c[s >> 2] | 0) - 2;
            } while (0);

            if (((c[(c[m >> 2] | 0) + 104 >> 2] | 0) + (c[v >> 2] | 0) | 0) >>> 0 > ((c[(c[m >> 2] | 0) + 96 >> 2] | 0) + (c[(c[m >> 2] | 0) + 100 >> 2] | 0) | 0) >>> 0) {
              C = 204;
              break;
            }

            while (1) {
              g = c[v >> 2] | 0;
              c[v >> 2] = g + -1;

              if (!g) {
                C = 178;
                continue c;
              }

              g = c[z >> 2] & 65535;
              f = (c[m >> 2] | 0) + 104 | 0;
              D = c[f >> 2] | 0;
              c[f >> 2] = D + 1;
              b[(c[m >> 2] | 0) + 112 + (D << 1) >> 1] = g;
            }
          }

          if ((C | 0) == 192) {
            C = 0;
            c[(c[k >> 2] | 0) + 24 >> 2] = 14513;
            c[c[m >> 2] >> 2] = 29;
          } else if ((C | 0) == 204) {
            C = 0;
            c[(c[k >> 2] | 0) + 24 >> 2] = 14513;
            c[c[m >> 2] >> 2] = 29;
          }

          if ((c[c[m >> 2] >> 2] | 0) == 29) continue a;

          if (!(e[(c[m >> 2] | 0) + 112 + 512 >> 1] | 0)) {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14539;
            c[c[m >> 2] >> 2] = 29;
            continue a;
          }

          c[(c[m >> 2] | 0) + 108 >> 2] = (c[m >> 2] | 0) + 1328;
          c[(c[m >> 2] | 0) + 76 >> 2] = c[(c[m >> 2] | 0) + 108 >> 2];
          c[(c[m >> 2] | 0) + 84 >> 2] = 9;
          c[A >> 2] = rd(1, (c[m >> 2] | 0) + 112 | 0, c[(c[m >> 2] | 0) + 96 >> 2] | 0, (c[m >> 2] | 0) + 108 | 0, (c[m >> 2] | 0) + 84 | 0, (c[m >> 2] | 0) + 752 | 0) | 0;

          if (c[A >> 2] | 0) {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14576;
            c[c[m >> 2] >> 2] = 29;
            continue a;
          }

          c[(c[m >> 2] | 0) + 80 >> 2] = c[(c[m >> 2] | 0) + 108 >> 2];
          c[(c[m >> 2] | 0) + 88 >> 2] = 6;
          c[A >> 2] = rd(2, (c[m >> 2] | 0) + 112 + (c[(c[m >> 2] | 0) + 96 >> 2] << 1) | 0, c[(c[m >> 2] | 0) + 100 >> 2] | 0, (c[m >> 2] | 0) + 108 | 0, (c[m >> 2] | 0) + 88 | 0, (c[m >> 2] | 0) + 752 | 0) | 0;

          if (!(c[A >> 2] | 0)) {
            c[c[m >> 2] >> 2] = 19;
            if ((c[l >> 2] | 0) == 6) break a;else {
              C = 215;
              break;
            }
          } else {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14604;
            c[c[m >> 2] >> 2] = 29;
            continue a;
          }
        } while (0);

        if ((C | 0) == 58) {
          C = 0;

          if (!(c[(c[m >> 2] | 0) + 16 >> 2] & 1024)) {
            if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 16 >> 2] = 0;
          } else {
            while (1) {
              if ((c[s >> 2] | 0) >>> 0 >= 16) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            c[(c[m >> 2] | 0) + 64 >> 2] = c[r >> 2];
            if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 20 >> 2] = c[r >> 2];

            if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
              a[B >> 0] = c[r >> 2];
              a[B + 1 >> 0] = (c[r >> 2] | 0) >>> 8;
              g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, B, 2) | 0;
              c[(c[m >> 2] | 0) + 24 >> 2] = g;
            }

            c[r >> 2] = 0;
            c[s >> 2] = 0;
          }

          c[c[m >> 2] >> 2] = 5;
          C = 70;
        } else if ((C | 0) == 133) {
          C = 0;

          if (c[(c[m >> 2] | 0) + 4 >> 2] | 0) {
            c[r >> 2] = (c[r >> 2] | 0) >>> (c[s >> 2] & 7);
            c[s >> 2] = (c[s >> 2] | 0) - (c[s >> 2] & 7);
            c[c[m >> 2] >> 2] = 26;
            continue;
          }

          while (1) {
            if ((c[s >> 2] | 0) >>> 0 >= 3) break;
            if (!(c[p >> 2] | 0)) break a;
            c[p >> 2] = (c[p >> 2] | 0) + -1;
            g = c[n >> 2] | 0;
            c[n >> 2] = g + 1;
            c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
            c[s >> 2] = (c[s >> 2] | 0) + 8;
          }

          c[(c[m >> 2] | 0) + 4 >> 2] = c[r >> 2] & 1;
          c[r >> 2] = (c[r >> 2] | 0) >>> 1;
          c[s >> 2] = (c[s >> 2] | 0) - 1;

          switch (c[r >> 2] & 3 | 0) {
            case 0:
              {
                c[c[m >> 2] >> 2] = 13;
                break;
              }

            case 1:
              {
                Gd(c[m >> 2] | 0);
                c[c[m >> 2] >> 2] = 19;

                if ((c[l >> 2] | 0) == 6) {
                  C = 141;
                  break a;
                }

                break;
              }

            case 2:
              {
                c[c[m >> 2] >> 2] = 16;
                break;
              }

            case 3:
              {
                c[(c[k >> 2] | 0) + 24 >> 2] = 14404;
                c[c[m >> 2] >> 2] = 29;
                break;
              }

            default:
              {}
          }

          c[r >> 2] = (c[r >> 2] | 0) >>> 2;
          c[s >> 2] = (c[s >> 2] | 0) - 2;
          continue;
        } else if ((C | 0) == 215) {
          C = 0;
          c[c[m >> 2] >> 2] = 20;
          C = 216;
        }

        do if ((C | 0) == 70) {
          C = 0;

          if (c[(c[m >> 2] | 0) + 16 >> 2] & 1024) {
            c[v >> 2] = c[(c[m >> 2] | 0) + 64 >> 2];
            if ((c[v >> 2] | 0) >>> 0 > (c[p >> 2] | 0) >>> 0) c[v >> 2] = c[p >> 2];

            if (c[v >> 2] | 0) {
              if ((c[(c[m >> 2] | 0) + 32 >> 2] | 0) != 0 ? (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 16 >> 2] | 0) != 0 : 0) {
                c[z >> 2] = (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 20 >> 2] | 0) - (c[(c[m >> 2] | 0) + 64 >> 2] | 0);
                if (((c[z >> 2] | 0) + (c[v >> 2] | 0) | 0) >>> 0 > (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 24 >> 2] | 0) >>> 0) H = (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 24 >> 2] | 0) - (c[z >> 2] | 0) | 0;else H = c[v >> 2] | 0;
                af((c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 16 >> 2] | 0) + (c[z >> 2] | 0) | 0, c[n >> 2] | 0, H | 0) | 0;
              }

              if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
                g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, c[n >> 2] | 0, c[v >> 2] | 0) | 0;
                c[(c[m >> 2] | 0) + 24 >> 2] = g;
              }

              c[p >> 2] = (c[p >> 2] | 0) - (c[v >> 2] | 0);
              c[n >> 2] = (c[n >> 2] | 0) + (c[v >> 2] | 0);
              g = (c[m >> 2] | 0) + 64 | 0;
              c[g >> 2] = (c[g >> 2] | 0) - (c[v >> 2] | 0);
            }

            if (c[(c[m >> 2] | 0) + 64 >> 2] | 0) break a;
          }

          c[(c[m >> 2] | 0) + 64 >> 2] = 0;
          c[c[m >> 2] >> 2] = 6;
          C = 85;
        } else if ((C | 0) == 216) {
          C = 0;

          if ((c[p >> 2] | 0) >>> 0 >= 6 & (c[q >> 2] | 0) >>> 0 >= 258) {
            c[(c[k >> 2] | 0) + 12 >> 2] = c[o >> 2];
            c[(c[k >> 2] | 0) + 16 >> 2] = c[q >> 2];
            c[c[k >> 2] >> 2] = c[n >> 2];
            c[(c[k >> 2] | 0) + 4 >> 2] = c[p >> 2];
            c[(c[m >> 2] | 0) + 56 >> 2] = c[r >> 2];
            c[(c[m >> 2] | 0) + 60 >> 2] = c[s >> 2];
            sd(c[k >> 2] | 0, c[u >> 2] | 0);
            c[o >> 2] = c[(c[k >> 2] | 0) + 12 >> 2];
            c[q >> 2] = c[(c[k >> 2] | 0) + 16 >> 2];
            c[n >> 2] = c[c[k >> 2] >> 2];
            c[p >> 2] = c[(c[k >> 2] | 0) + 4 >> 2];
            c[r >> 2] = c[(c[m >> 2] | 0) + 56 >> 2];
            c[s >> 2] = c[(c[m >> 2] | 0) + 60 >> 2];
            if ((c[c[m >> 2] >> 2] | 0) != 11) continue a;
            c[(c[m >> 2] | 0) + 7108 >> 2] = -1;
            continue a;
          }

          c[(c[m >> 2] | 0) + 7108 >> 2] = 0;

          while (1) {
            g = (c[(c[m >> 2] | 0) + 76 >> 2] | 0) + ((c[r >> 2] & (1 << c[(c[m >> 2] | 0) + 84 >> 2]) - 1) << 2) | 0;
            b[x >> 1] = b[g >> 1] | 0;
            b[x + 2 >> 1] = b[g + 2 >> 1] | 0;
            if ((d[x + 1 >> 0] | 0) >>> 0 <= (c[s >> 2] | 0) >>> 0) break;
            if (!(c[p >> 2] | 0)) break a;
            c[p >> 2] = (c[p >> 2] | 0) + -1;
            g = c[n >> 2] | 0;
            c[n >> 2] = g + 1;
            c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
            c[s >> 2] = (c[s >> 2] | 0) + 8;
          }

          if ((d[x >> 0] | 0 | 0) != 0 ? ((d[x >> 0] | 0) & 240 | 0) == 0 : 0) {
            b[y >> 1] = b[x >> 1] | 0;
            b[y + 2 >> 1] = b[x + 2 >> 1] | 0;

            while (1) {
              g = (c[(c[m >> 2] | 0) + 76 >> 2] | 0) + ((e[y + 2 >> 1] | 0) + ((c[r >> 2] & (1 << (d[y + 1 >> 0] | 0) + (d[y >> 0] | 0)) - 1) >>> (d[y + 1 >> 0] | 0)) << 2) | 0;
              b[x >> 1] = b[g >> 1] | 0;
              b[x + 2 >> 1] = b[g + 2 >> 1] | 0;
              if (((d[y + 1 >> 0] | 0) + (d[x + 1 >> 0] | 0) | 0) >>> 0 <= (c[s >> 2] | 0) >>> 0) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            c[r >> 2] = (c[r >> 2] | 0) >>> (d[y + 1 >> 0] | 0);
            c[s >> 2] = (c[s >> 2] | 0) - (d[y + 1 >> 0] | 0);
            g = (c[m >> 2] | 0) + 7108 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (d[y + 1 >> 0] | 0);
          }

          c[r >> 2] = (c[r >> 2] | 0) >>> (d[x + 1 >> 0] | 0);
          c[s >> 2] = (c[s >> 2] | 0) - (d[x + 1 >> 0] | 0);
          g = (c[m >> 2] | 0) + 7108 | 0;
          c[g >> 2] = (c[g >> 2] | 0) + (d[x + 1 >> 0] | 0);
          c[(c[m >> 2] | 0) + 64 >> 2] = e[x + 2 >> 1];

          if (!(d[x >> 0] | 0)) {
            c[c[m >> 2] >> 2] = 25;
            continue a;
          }

          if ((d[x >> 0] | 0) & 32) {
            c[(c[m >> 2] | 0) + 7108 >> 2] = -1;
            c[c[m >> 2] >> 2] = 11;
            continue a;
          }

          if ((d[x >> 0] | 0) & 64) {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14722;
            c[c[m >> 2] >> 2] = 29;
            continue a;
          } else {
            c[(c[m >> 2] | 0) + 72 >> 2] = (d[x >> 0] | 0) & 15;
            c[c[m >> 2] >> 2] = 21;
            C = 237;
            break;
          }
        } while (0);

        if ((C | 0) == 85) {
          C = 0;

          if (c[(c[m >> 2] | 0) + 16 >> 2] & 2048) {
            if (!(c[p >> 2] | 0)) break;
            c[v >> 2] = 0;

            do {
              g = c[v >> 2] | 0;
              c[v >> 2] = g + 1;
              c[z >> 2] = d[(c[n >> 2] | 0) + g >> 0];

              if (((c[(c[m >> 2] | 0) + 32 >> 2] | 0) != 0 ? (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) ? (c[(c[m >> 2] | 0) + 64 >> 2] | 0) >>> 0 < (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 32 >> 2] | 0) >>> 0 : 0) {
                g = c[z >> 2] & 255;
                D = (c[m >> 2] | 0) + 64 | 0;
                f = c[D >> 2] | 0;
                c[D >> 2] = f + 1;
                a[(c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 28 >> 2] | 0) + f >> 0] = g;
              }

              if (!(c[z >> 2] | 0)) break;
            } while ((c[v >> 2] | 0) >>> 0 < (c[p >> 2] | 0) >>> 0);

            if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
              g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, c[n >> 2] | 0, c[v >> 2] | 0) | 0;
              c[(c[m >> 2] | 0) + 24 >> 2] = g;
            }

            c[p >> 2] = (c[p >> 2] | 0) - (c[v >> 2] | 0);
            c[n >> 2] = (c[n >> 2] | 0) + (c[v >> 2] | 0);
            if (c[z >> 2] | 0) break;
          } else if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 28 >> 2] = 0;

          c[(c[m >> 2] | 0) + 64 >> 2] = 0;
          c[c[m >> 2] >> 2] = 7;
          C = 100;
        } else if ((C | 0) == 237) {
          C = 0;

          if (c[(c[m >> 2] | 0) + 72 >> 2] | 0) {
            while (1) {
              if ((c[s >> 2] | 0) >>> 0 >= (c[(c[m >> 2] | 0) + 72 >> 2] | 0) >>> 0) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            g = (c[m >> 2] | 0) + 64 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[r >> 2] & (1 << c[(c[m >> 2] | 0) + 72 >> 2]) - 1);
            c[r >> 2] = (c[r >> 2] | 0) >>> (c[(c[m >> 2] | 0) + 72 >> 2] | 0);
            c[s >> 2] = (c[s >> 2] | 0) - (c[(c[m >> 2] | 0) + 72 >> 2] | 0);
            g = (c[m >> 2] | 0) + 7108 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[(c[m >> 2] | 0) + 72 >> 2] | 0);
          }

          c[(c[m >> 2] | 0) + 7112 >> 2] = c[(c[m >> 2] | 0) + 64 >> 2];
          c[c[m >> 2] >> 2] = 22;
          C = 243;
        }

        do if ((C | 0) == 100) {
          C = 0;

          if (c[(c[m >> 2] | 0) + 16 >> 2] & 4096) {
            if (!(c[p >> 2] | 0)) break a;
            c[v >> 2] = 0;

            do {
              g = c[v >> 2] | 0;
              c[v >> 2] = g + 1;
              c[z >> 2] = d[(c[n >> 2] | 0) + g >> 0];

              if (((c[(c[m >> 2] | 0) + 32 >> 2] | 0) != 0 ? (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 36 >> 2] | 0) != 0 : 0) ? (c[(c[m >> 2] | 0) + 64 >> 2] | 0) >>> 0 < (c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 40 >> 2] | 0) >>> 0 : 0) {
                g = c[z >> 2] & 255;
                f = (c[m >> 2] | 0) + 64 | 0;
                D = c[f >> 2] | 0;
                c[f >> 2] = D + 1;
                a[(c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 36 >> 2] | 0) + D >> 0] = g;
              }

              if (!(c[z >> 2] | 0)) break;
            } while ((c[v >> 2] | 0) >>> 0 < (c[p >> 2] | 0) >>> 0);

            if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
              g = fd(c[(c[m >> 2] | 0) + 24 >> 2] | 0, c[n >> 2] | 0, c[v >> 2] | 0) | 0;
              c[(c[m >> 2] | 0) + 24 >> 2] = g;
            }

            c[p >> 2] = (c[p >> 2] | 0) - (c[v >> 2] | 0);
            c[n >> 2] = (c[n >> 2] | 0) + (c[v >> 2] | 0);
            if (c[z >> 2] | 0) break a;
          } else if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 36 >> 2] = 0;

          c[c[m >> 2] >> 2] = 8;
          C = 115;
        } else if ((C | 0) == 243) {
          while (1) {
            C = 0;
            g = (c[(c[m >> 2] | 0) + 80 >> 2] | 0) + ((c[r >> 2] & (1 << c[(c[m >> 2] | 0) + 88 >> 2]) - 1) << 2) | 0;
            b[x >> 1] = b[g >> 1] | 0;
            b[x + 2 >> 1] = b[g + 2 >> 1] | 0;
            if ((d[x + 1 >> 0] | 0) >>> 0 <= (c[s >> 2] | 0) >>> 0) break;
            if (!(c[p >> 2] | 0)) break a;
            c[p >> 2] = (c[p >> 2] | 0) + -1;
            g = c[n >> 2] | 0;
            c[n >> 2] = g + 1;
            c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
            c[s >> 2] = (c[s >> 2] | 0) + 8;
            C = 243;
          }

          if (!((d[x >> 0] | 0) & 240)) {
            b[y >> 1] = b[x >> 1] | 0;
            b[y + 2 >> 1] = b[x + 2 >> 1] | 0;

            while (1) {
              g = (c[(c[m >> 2] | 0) + 80 >> 2] | 0) + ((e[y + 2 >> 1] | 0) + ((c[r >> 2] & (1 << (d[y + 1 >> 0] | 0) + (d[y >> 0] | 0)) - 1) >>> (d[y + 1 >> 0] | 0)) << 2) | 0;
              b[x >> 1] = b[g >> 1] | 0;
              b[x + 2 >> 1] = b[g + 2 >> 1] | 0;
              if (((d[y + 1 >> 0] | 0) + (d[x + 1 >> 0] | 0) | 0) >>> 0 <= (c[s >> 2] | 0) >>> 0) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            c[r >> 2] = (c[r >> 2] | 0) >>> (d[y + 1 >> 0] | 0);
            c[s >> 2] = (c[s >> 2] | 0) - (d[y + 1 >> 0] | 0);
            g = (c[m >> 2] | 0) + 7108 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (d[y + 1 >> 0] | 0);
          }

          c[r >> 2] = (c[r >> 2] | 0) >>> (d[x + 1 >> 0] | 0);
          c[s >> 2] = (c[s >> 2] | 0) - (d[x + 1 >> 0] | 0);
          g = (c[m >> 2] | 0) + 7108 | 0;
          c[g >> 2] = (c[g >> 2] | 0) + (d[x + 1 >> 0] | 0);

          if ((d[x >> 0] | 0) & 64) {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14700;
            c[c[m >> 2] >> 2] = 29;
            continue a;
          } else {
            c[(c[m >> 2] | 0) + 68 >> 2] = e[x + 2 >> 1];
            c[(c[m >> 2] | 0) + 72 >> 2] = (d[x >> 0] | 0) & 15;
            c[c[m >> 2] >> 2] = 23;
            C = 255;
            break;
          }
        } while (0);

        if ((C | 0) == 115) {
          C = 0;

          do if (c[(c[m >> 2] | 0) + 16 >> 2] & 512) {
            while (1) {
              if ((c[s >> 2] | 0) >>> 0 >= 16) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            if ((c[r >> 2] | 0) != (c[(c[m >> 2] | 0) + 24 >> 2] & 65535 | 0)) {
              c[(c[k >> 2] | 0) + 24 >> 2] = 14384;
              c[c[m >> 2] >> 2] = 29;
              continue a;
            } else {
              c[r >> 2] = 0;
              c[s >> 2] = 0;
              break;
            }
          } while (0);

          if (c[(c[m >> 2] | 0) + 32 >> 2] | 0) {
            c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 44 >> 2] = c[(c[m >> 2] | 0) + 16 >> 2] >> 9 & 1;
            c[(c[(c[m >> 2] | 0) + 32 >> 2] | 0) + 48 >> 2] = 1;
          }

          g = fd(0, 0, 0) | 0;
          c[(c[m >> 2] | 0) + 24 >> 2] = g;
          c[(c[k >> 2] | 0) + 48 >> 2] = g;
          c[c[m >> 2] >> 2] = 11;
          continue;
        } else if ((C | 0) == 255) {
          C = 0;

          if (c[(c[m >> 2] | 0) + 72 >> 2] | 0) {
            while (1) {
              if ((c[s >> 2] | 0) >>> 0 >= (c[(c[m >> 2] | 0) + 72 >> 2] | 0) >>> 0) break;
              if (!(c[p >> 2] | 0)) break a;
              c[p >> 2] = (c[p >> 2] | 0) + -1;
              g = c[n >> 2] | 0;
              c[n >> 2] = g + 1;
              c[r >> 2] = (c[r >> 2] | 0) + ((d[g >> 0] | 0) << c[s >> 2]);
              c[s >> 2] = (c[s >> 2] | 0) + 8;
            }

            g = (c[m >> 2] | 0) + 68 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[r >> 2] & (1 << c[(c[m >> 2] | 0) + 72 >> 2]) - 1);
            c[r >> 2] = (c[r >> 2] | 0) >>> (c[(c[m >> 2] | 0) + 72 >> 2] | 0);
            c[s >> 2] = (c[s >> 2] | 0) - (c[(c[m >> 2] | 0) + 72 >> 2] | 0);
            g = (c[m >> 2] | 0) + 7108 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[(c[m >> 2] | 0) + 72 >> 2] | 0);
          }

          c[c[m >> 2] >> 2] = 24;
        }

        if (!(c[q >> 2] | 0)) break;
        c[v >> 2] = (c[u >> 2] | 0) - (c[q >> 2] | 0);

        if ((c[(c[m >> 2] | 0) + 68 >> 2] | 0) >>> 0 > (c[v >> 2] | 0) >>> 0) {
          c[v >> 2] = (c[(c[m >> 2] | 0) + 68 >> 2] | 0) - (c[v >> 2] | 0);

          if ((c[v >> 2] | 0) >>> 0 > (c[(c[m >> 2] | 0) + 44 >> 2] | 0) >>> 0 ? (c[(c[m >> 2] | 0) + 7104 >> 2] | 0) != 0 : 0) {
            c[(c[k >> 2] | 0) + 24 >> 2] = 14670;
            c[c[m >> 2] >> 2] = 29;
            continue;
          }

          g = c[m >> 2] | 0;

          if ((c[v >> 2] | 0) >>> 0 > (c[(c[m >> 2] | 0) + 48 >> 2] | 0) >>> 0) {
            c[v >> 2] = (c[v >> 2] | 0) - (c[g + 48 >> 2] | 0);
            c[w >> 2] = (c[(c[m >> 2] | 0) + 52 >> 2] | 0) + ((c[(c[m >> 2] | 0) + 40 >> 2] | 0) - (c[v >> 2] | 0));
          } else c[w >> 2] = (c[g + 52 >> 2] | 0) + ((c[(c[m >> 2] | 0) + 48 >> 2] | 0) - (c[v >> 2] | 0));

          if ((c[v >> 2] | 0) >>> 0 > (c[(c[m >> 2] | 0) + 64 >> 2] | 0) >>> 0) c[v >> 2] = c[(c[m >> 2] | 0) + 64 >> 2];
        } else {
          c[w >> 2] = (c[o >> 2] | 0) + (0 - (c[(c[m >> 2] | 0) + 68 >> 2] | 0));
          c[v >> 2] = c[(c[m >> 2] | 0) + 64 >> 2];
        }

        if ((c[v >> 2] | 0) >>> 0 > (c[q >> 2] | 0) >>> 0) c[v >> 2] = c[q >> 2];
        c[q >> 2] = (c[q >> 2] | 0) - (c[v >> 2] | 0);
        g = (c[m >> 2] | 0) + 64 | 0;
        c[g >> 2] = (c[g >> 2] | 0) - (c[v >> 2] | 0);

        do {
          g = c[w >> 2] | 0;
          c[w >> 2] = g + 1;
          D = a[g >> 0] | 0;
          g = c[o >> 2] | 0;
          c[o >> 2] = g + 1;
          a[g >> 0] = D;
          D = (c[v >> 2] | 0) + -1 | 0;
          c[v >> 2] = D;
        } while ((D | 0) != 0);

        if (c[(c[m >> 2] | 0) + 64 >> 2] | 0) continue;
        c[c[m >> 2] >> 2] = 20;
      }

      if ((C | 0) == 130) {
        c[(c[k >> 2] | 0) + 12 >> 2] = c[o >> 2];
        c[(c[k >> 2] | 0) + 16 >> 2] = c[q >> 2];
        c[c[k >> 2] >> 2] = c[n >> 2];
        c[(c[k >> 2] | 0) + 4 >> 2] = c[p >> 2];
        c[(c[m >> 2] | 0) + 56 >> 2] = c[r >> 2];
        c[(c[m >> 2] | 0) + 60 >> 2] = c[s >> 2];
        c[j >> 2] = 2;
        I = c[j >> 2] | 0;
        i = h;
        return I | 0;
      } else if ((C | 0) == 141) {
        c[r >> 2] = (c[r >> 2] | 0) >>> 2;
        c[s >> 2] = (c[s >> 2] | 0) - 2;
      } else if ((C | 0) == 302) {
        c[r >> 2] = 0;
        c[s >> 2] = 0;
        C = 303;
      } else if ((C | 0) == 305) c[A >> 2] = -3;else if ((C | 0) == 306) {
        c[j >> 2] = -4;
        I = c[j >> 2] | 0;
        i = h;
        return I | 0;
      } else if ((C | 0) == 307) {
        c[j >> 2] = -2;
        I = c[j >> 2] | 0;
        i = h;
        return I | 0;
      }

      if ((C | 0) == 303) {
        c[c[m >> 2] >> 2] = 28;
        C = 304;
      }

      if ((C | 0) == 304) c[A >> 2] = 1;
      c[(c[k >> 2] | 0) + 12 >> 2] = c[o >> 2];
      c[(c[k >> 2] | 0) + 16 >> 2] = c[q >> 2];
      c[c[k >> 2] >> 2] = c[n >> 2];
      c[(c[k >> 2] | 0) + 4 >> 2] = c[p >> 2];
      c[(c[m >> 2] | 0) + 56 >> 2] = c[r >> 2];
      c[(c[m >> 2] | 0) + 60 >> 2] = c[s >> 2];

      if (!(c[(c[m >> 2] | 0) + 40 >> 2] | 0)) {
        if ((c[c[m >> 2] >> 2] | 0) >>> 0 < 26 ? (c[u >> 2] | 0) != (c[(c[k >> 2] | 0) + 16 >> 2] | 0) : 0) C = 311;
      } else C = 311;

      if ((C | 0) == 311 ? (Hd(c[k >> 2] | 0, c[u >> 2] | 0) | 0) != 0 : 0) {
        c[c[m >> 2] >> 2] = 30;
        c[j >> 2] = -4;
        I = c[j >> 2] | 0;
        i = h;
        return I | 0;
      }

      c[t >> 2] = (c[t >> 2] | 0) - (c[(c[k >> 2] | 0) + 4 >> 2] | 0);
      c[u >> 2] = (c[u >> 2] | 0) - (c[(c[k >> 2] | 0) + 16 >> 2] | 0);
      D = (c[k >> 2] | 0) + 8 | 0;
      c[D >> 2] = (c[D >> 2] | 0) + (c[t >> 2] | 0);
      D = (c[k >> 2] | 0) + 20 | 0;
      c[D >> 2] = (c[D >> 2] | 0) + (c[u >> 2] | 0);
      D = (c[m >> 2] | 0) + 28 | 0;
      c[D >> 2] = (c[D >> 2] | 0) + (c[u >> 2] | 0);

      if ((c[u >> 2] | 0) != 0 ? (c[(c[m >> 2] | 0) + 8 >> 2] | 0) != 0 : 0) {
        D = c[(c[m >> 2] | 0) + 24 >> 2] | 0;
        g = (c[(c[k >> 2] | 0) + 12 >> 2] | 0) + (0 - (c[u >> 2] | 0)) | 0;
        f = c[u >> 2] | 0;
        if (c[(c[m >> 2] | 0) + 16 >> 2] | 0) J = fd(D, g, f) | 0;else J = ed(D, g, f) | 0;
        c[(c[m >> 2] | 0) + 24 >> 2] = J;
        c[(c[k >> 2] | 0) + 48 >> 2] = J;
      }

      if ((c[c[m >> 2] >> 2] | 0) == 19) K = 1;else K = (c[c[m >> 2] >> 2] | 0) == 14;
      c[(c[k >> 2] | 0) + 44 >> 2] = (c[(c[m >> 2] | 0) + 60 >> 2] | 0) + ((c[(c[m >> 2] | 0) + 4 >> 2] | 0) != 0 ? 64 : 0) + ((c[c[m >> 2] >> 2] | 0) == 11 ? 128 : 0) + (K ? 256 : 0);
      if (((c[t >> 2] | 0) == 0 & (c[u >> 2] | 0) == 0 | (c[l >> 2] | 0) == 4) & (c[A >> 2] | 0) == 0) c[A >> 2] = -5;
      c[j >> 2] = c[A >> 2];
      I = c[j >> 2] | 0;
      i = h;
      return I | 0;
    } while (0);

    c[j >> 2] = -2;
    I = c[j >> 2] | 0;
    i = h;
    return I | 0;
  }

  function qd(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0;
    b = i;
    i = i + 16 | 0;
    d = b + 8 | 0;
    e = b + 4 | 0;
    f = b;
    c[e >> 2] = a;

    if (((c[e >> 2] | 0) != 0 ? (c[(c[e >> 2] | 0) + 28 >> 2] | 0) != 0 : 0) ? (c[(c[e >> 2] | 0) + 36 >> 2] | 0) != 0 : 0) {
      c[f >> 2] = c[(c[e >> 2] | 0) + 28 >> 2];
      if (c[(c[f >> 2] | 0) + 52 >> 2] | 0) ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[f >> 2] | 0) + 52 >> 2] | 0);
      ka(c[(c[e >> 2] | 0) + 36 >> 2] | 0, c[(c[e >> 2] | 0) + 40 >> 2] | 0, c[(c[e >> 2] | 0) + 28 >> 2] | 0);
      c[(c[e >> 2] | 0) + 28 >> 2] = 0;
      c[d >> 2] = 0;
      g = c[d >> 2] | 0;
      i = b;
      return g | 0;
    }

    c[d >> 2] = -2;
    g = c[d >> 2] | 0;
    i = b;
    return g | 0;
  }

  function rd(d, f, g, h, j, k) {
    d = d | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    j = j | 0;
    k = k | 0;
    var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0;
    l = i;
    i = i + 176 | 0;
    m = l + 96 | 0;
    n = l + 92 | 0;
    o = l + 88 | 0;
    p = l + 84 | 0;
    q = l + 80 | 0;
    r = l + 76 | 0;
    s = l + 72 | 0;
    t = l + 68 | 0;
    u = l + 64 | 0;
    v = l + 60 | 0;
    w = l + 56 | 0;
    x = l + 52 | 0;
    y = l + 48 | 0;
    z = l + 44 | 0;
    A = l + 40 | 0;
    B = l + 36 | 0;
    C = l + 32 | 0;
    D = l + 28 | 0;
    E = l + 24 | 0;
    F = l + 20 | 0;
    G = l + 16 | 0;
    H = l + 168 | 0;
    I = l + 12 | 0;
    J = l + 8 | 0;
    K = l + 4 | 0;
    L = l;
    M = l + 136 | 0;
    N = l + 104 | 0;
    c[n >> 2] = d;
    c[o >> 2] = f;
    c[p >> 2] = g;
    c[q >> 2] = h;
    c[r >> 2] = j;
    c[s >> 2] = k;
    c[t >> 2] = 0;

    while (1) {
      if ((c[t >> 2] | 0) >>> 0 > 15) break;
      b[M + (c[t >> 2] << 1) >> 1] = 0;
      c[t >> 2] = (c[t >> 2] | 0) + 1;
    }

    c[u >> 2] = 0;

    while (1) {
      if ((c[u >> 2] | 0) >>> 0 >= (c[p >> 2] | 0) >>> 0) break;
      k = M + ((e[(c[o >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0) << 1) | 0;
      b[k >> 1] = (b[k >> 1] | 0) + 1 << 16 >> 16;
      c[u >> 2] = (c[u >> 2] | 0) + 1;
    }

    c[x >> 2] = c[c[r >> 2] >> 2];
    c[w >> 2] = 15;

    while (1) {
      if ((c[w >> 2] | 0) >>> 0 < 1) break;
      if (e[M + (c[w >> 2] << 1) >> 1] | 0) break;
      c[w >> 2] = (c[w >> 2] | 0) + -1;
    }

    if ((c[x >> 2] | 0) >>> 0 > (c[w >> 2] | 0) >>> 0) c[x >> 2] = c[w >> 2];

    if (!(c[w >> 2] | 0)) {
      a[H >> 0] = 64;
      a[H + 1 >> 0] = 1;
      b[H + 2 >> 1] = 0;
      k = c[q >> 2] | 0;
      j = c[k >> 2] | 0;
      c[k >> 2] = j + 4;
      b[j >> 1] = b[H >> 1] | 0;
      b[j + 2 >> 1] = b[H + 2 >> 1] | 0;
      j = c[q >> 2] | 0;
      k = c[j >> 2] | 0;
      c[j >> 2] = k + 4;
      b[k >> 1] = b[H >> 1] | 0;
      b[k + 2 >> 1] = b[H + 2 >> 1] | 0;
      c[c[r >> 2] >> 2] = 1;
      c[m >> 2] = 0;
      O = c[m >> 2] | 0;
      i = l;
      return O | 0;
    }

    c[v >> 2] = 1;

    while (1) {
      if ((c[v >> 2] | 0) >>> 0 >= (c[w >> 2] | 0) >>> 0) break;
      if (e[M + (c[v >> 2] << 1) >> 1] | 0) break;
      c[v >> 2] = (c[v >> 2] | 0) + 1;
    }

    if ((c[x >> 2] | 0) >>> 0 < (c[v >> 2] | 0) >>> 0) c[x >> 2] = c[v >> 2];
    c[A >> 2] = 1;
    c[t >> 2] = 1;

    while (1) {
      P = c[A >> 2] | 0;
      if ((c[t >> 2] | 0) >>> 0 > 15) break;
      c[A >> 2] = P << 1;
      c[A >> 2] = (c[A >> 2] | 0) - (e[M + (c[t >> 2] << 1) >> 1] | 0);

      if ((c[A >> 2] | 0) < 0) {
        Q = 24;
        break;
      }

      c[t >> 2] = (c[t >> 2] | 0) + 1;
    }

    if ((Q | 0) == 24) {
      c[m >> 2] = -1;
      O = c[m >> 2] | 0;
      i = l;
      return O | 0;
    }

    if ((P | 0) > 0 ? (c[n >> 2] | 0) == 0 | (c[w >> 2] | 0) != 1 : 0) {
      c[m >> 2] = -1;
      O = c[m >> 2] | 0;
      i = l;
      return O | 0;
    }

    b[N + 2 >> 1] = 0;
    c[t >> 2] = 1;

    while (1) {
      if ((c[t >> 2] | 0) >>> 0 >= 15) break;
      b[N + ((c[t >> 2] | 0) + 1 << 1) >> 1] = (e[N + (c[t >> 2] << 1) >> 1] | 0) + (e[M + (c[t >> 2] << 1) >> 1] | 0);
      c[t >> 2] = (c[t >> 2] | 0) + 1;
    }

    c[u >> 2] = 0;

    while (1) {
      if ((c[u >> 2] | 0) >>> 0 >= (c[p >> 2] | 0) >>> 0) break;

      if (e[(c[o >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0) {
        P = c[u >> 2] & 65535;
        k = N + ((e[(c[o >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0) << 1) | 0;
        j = b[k >> 1] | 0;
        b[k >> 1] = j + 1 << 16 >> 16;
        b[(c[s >> 2] | 0) + ((j & 65535) << 1) >> 1] = P;
      }

      c[u >> 2] = (c[u >> 2] | 0) + 1;
    }

    switch (c[n >> 2] | 0) {
      case 0:
        {
          N = c[s >> 2] | 0;
          c[K >> 2] = N;
          c[J >> 2] = N;
          c[L >> 2] = 19;
          break;
        }

      case 1:
        {
          c[J >> 2] = 9778;
          c[J >> 2] = (c[J >> 2] | 0) + -514;
          c[K >> 2] = 9840;
          c[K >> 2] = (c[K >> 2] | 0) + -514;
          c[L >> 2] = 256;
          break;
        }

      default:
        {
          c[J >> 2] = 9902;
          c[K >> 2] = 9966;
          c[L >> 2] = -1;
        }
    }

    c[C >> 2] = 0;
    c[u >> 2] = 0;
    c[t >> 2] = c[v >> 2];
    c[I >> 2] = c[c[q >> 2] >> 2];
    c[y >> 2] = c[x >> 2];
    c[z >> 2] = 0;
    c[F >> 2] = -1;
    c[B >> 2] = 1 << c[x >> 2];
    c[G >> 2] = (c[B >> 2] | 0) - 1;

    if (!((c[n >> 2] | 0) == 1 & (c[B >> 2] | 0) >>> 0 >= 852) ? !((c[n >> 2] | 0) == 2 & (c[B >> 2] | 0) >>> 0 >= 592) : 0) {
      while (1) {
        a[H + 1 >> 0] = (c[t >> 2] | 0) - (c[z >> 2] | 0);

        do if ((e[(c[s >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0 | 0) >= (c[L >> 2] | 0)) {
          if ((e[(c[s >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0 | 0) > (c[L >> 2] | 0)) {
            a[H >> 0] = b[(c[K >> 2] | 0) + ((e[(c[s >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0) << 1) >> 1];
            b[H + 2 >> 1] = b[(c[J >> 2] | 0) + ((e[(c[s >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0) << 1) >> 1] | 0;
            break;
          } else {
            a[H >> 0] = 96;
            b[H + 2 >> 1] = 0;
            break;
          }
        } else {
          a[H >> 0] = 0;
          b[H + 2 >> 1] = b[(c[s >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0;
        } while (0);

        c[D >> 2] = 1 << (c[t >> 2] | 0) - (c[z >> 2] | 0);
        c[E >> 2] = 1 << c[y >> 2];
        c[v >> 2] = c[E >> 2];

        do {
          c[E >> 2] = (c[E >> 2] | 0) - (c[D >> 2] | 0);
          N = (c[I >> 2] | 0) + (((c[C >> 2] | 0) >>> (c[z >> 2] | 0)) + (c[E >> 2] | 0) << 2) | 0;
          b[N >> 1] = b[H >> 1] | 0;
          b[N + 2 >> 1] = b[H + 2 >> 1] | 0;
        } while ((c[E >> 2] | 0) != 0);

        c[D >> 2] = 1 << (c[t >> 2] | 0) - 1;

        while (1) {
          R = c[D >> 2] | 0;
          if (!(c[C >> 2] & c[D >> 2])) break;
          c[D >> 2] = R >>> 1;
        }

        if (R) {
          c[C >> 2] = c[C >> 2] & (c[D >> 2] | 0) - 1;
          c[C >> 2] = (c[C >> 2] | 0) + (c[D >> 2] | 0);
        } else c[C >> 2] = 0;

        c[u >> 2] = (c[u >> 2] | 0) + 1;
        N = M + (c[t >> 2] << 1) | 0;
        p = (b[N >> 1] | 0) + -1 << 16 >> 16;
        b[N >> 1] = p;

        if (!(p & 65535)) {
          if ((c[t >> 2] | 0) == (c[w >> 2] | 0)) break;
          c[t >> 2] = e[(c[o >> 2] | 0) + ((e[(c[s >> 2] | 0) + (c[u >> 2] << 1) >> 1] | 0) << 1) >> 1];
        }

        if ((c[t >> 2] | 0) >>> 0 <= (c[x >> 2] | 0) >>> 0) continue;
        if ((c[C >> 2] & c[G >> 2] | 0) == (c[F >> 2] | 0)) continue;
        if (!(c[z >> 2] | 0)) c[z >> 2] = c[x >> 2];
        c[I >> 2] = (c[I >> 2] | 0) + (c[v >> 2] << 2);
        c[y >> 2] = (c[t >> 2] | 0) - (c[z >> 2] | 0);
        c[A >> 2] = 1 << c[y >> 2];

        while (1) {
          if (((c[y >> 2] | 0) + (c[z >> 2] | 0) | 0) >>> 0 >= (c[w >> 2] | 0) >>> 0) break;
          c[A >> 2] = (c[A >> 2] | 0) - (e[M + ((c[y >> 2] | 0) + (c[z >> 2] | 0) << 1) >> 1] | 0);
          if ((c[A >> 2] | 0) <= 0) break;
          c[y >> 2] = (c[y >> 2] | 0) + 1;
          c[A >> 2] = c[A >> 2] << 1;
        }

        c[B >> 2] = (c[B >> 2] | 0) + (1 << c[y >> 2]);

        if ((c[n >> 2] | 0) == 1 & (c[B >> 2] | 0) >>> 0 >= 852) {
          Q = 70;
          break;
        }

        if ((c[n >> 2] | 0) == 2 & (c[B >> 2] | 0) >>> 0 >= 592) {
          Q = 70;
          break;
        }

        c[F >> 2] = c[C >> 2] & c[G >> 2];
        a[(c[c[q >> 2] >> 2] | 0) + (c[F >> 2] << 2) >> 0] = c[y >> 2];
        a[(c[c[q >> 2] >> 2] | 0) + (c[F >> 2] << 2) + 1 >> 0] = c[x >> 2];
        b[(c[c[q >> 2] >> 2] | 0) + (c[F >> 2] << 2) + 2 >> 1] = ((c[I >> 2] | 0) - (c[c[q >> 2] >> 2] | 0) | 0) / 4 | 0;
      }

      if ((Q | 0) == 70) {
        c[m >> 2] = 1;
        O = c[m >> 2] | 0;
        i = l;
        return O | 0;
      }

      a[H >> 0] = 64;
      a[H + 1 >> 0] = (c[t >> 2] | 0) - (c[z >> 2] | 0);
      b[H + 2 >> 1] = 0;

      while (1) {
        if (!(c[C >> 2] | 0)) break;

        if ((c[z >> 2] | 0) != 0 ? (c[C >> 2] & c[G >> 2] | 0) != (c[F >> 2] | 0) : 0) {
          c[z >> 2] = 0;
          c[t >> 2] = c[x >> 2];
          c[I >> 2] = c[c[q >> 2] >> 2];
          a[H + 1 >> 0] = c[t >> 2];
        }

        Q = (c[I >> 2] | 0) + ((c[C >> 2] | 0) >>> (c[z >> 2] | 0) << 2) | 0;
        b[Q >> 1] = b[H >> 1] | 0;
        b[Q + 2 >> 1] = b[H + 2 >> 1] | 0;
        c[D >> 2] = 1 << (c[t >> 2] | 0) - 1;

        while (1) {
          S = c[D >> 2] | 0;
          if (!(c[C >> 2] & c[D >> 2])) break;
          c[D >> 2] = S >>> 1;
        }

        if (S) {
          c[C >> 2] = c[C >> 2] & (c[D >> 2] | 0) - 1;
          c[C >> 2] = (c[C >> 2] | 0) + (c[D >> 2] | 0);
          continue;
        } else {
          c[C >> 2] = 0;
          continue;
        }
      }

      C = c[q >> 2] | 0;
      c[C >> 2] = (c[C >> 2] | 0) + (c[B >> 2] << 2);
      c[c[r >> 2] >> 2] = c[x >> 2];
      c[m >> 2] = 0;
      O = c[m >> 2] | 0;
      i = l;
      return O | 0;
    }

    c[m >> 2] = 1;
    O = c[m >> 2] | 0;
    i = l;
    return O | 0;
  }

  function sd(f, g) {
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0;
    h = i;
    i = i + 96 | 0;
    j = h + 84 | 0;
    k = h + 80 | 0;
    l = h + 76 | 0;
    m = h + 72 | 0;
    n = h + 68 | 0;
    o = h + 64 | 0;
    p = h + 60 | 0;
    q = h + 56 | 0;
    r = h + 52 | 0;
    s = h + 48 | 0;
    t = h + 44 | 0;
    u = h + 40 | 0;
    v = h + 36 | 0;
    w = h + 32 | 0;
    x = h + 28 | 0;
    y = h + 24 | 0;
    z = h + 20 | 0;
    A = h + 16 | 0;
    B = h + 88 | 0;
    C = h + 12 | 0;
    D = h + 8 | 0;
    E = h + 4 | 0;
    F = h;
    c[j >> 2] = f;
    c[k >> 2] = g;
    c[l >> 2] = c[(c[j >> 2] | 0) + 28 >> 2];
    c[m >> 2] = (c[c[j >> 2] >> 2] | 0) + -1;
    c[n >> 2] = (c[m >> 2] | 0) + ((c[(c[j >> 2] | 0) + 4 >> 2] | 0) - 5);
    c[o >> 2] = (c[(c[j >> 2] | 0) + 12 >> 2] | 0) + -1;
    c[p >> 2] = (c[o >> 2] | 0) + (0 - ((c[k >> 2] | 0) - (c[(c[j >> 2] | 0) + 16 >> 2] | 0)));
    c[q >> 2] = (c[o >> 2] | 0) + ((c[(c[j >> 2] | 0) + 16 >> 2] | 0) - 257);
    c[r >> 2] = c[(c[l >> 2] | 0) + 40 >> 2];
    c[s >> 2] = c[(c[l >> 2] | 0) + 44 >> 2];
    c[t >> 2] = c[(c[l >> 2] | 0) + 48 >> 2];
    c[u >> 2] = c[(c[l >> 2] | 0) + 52 >> 2];
    c[v >> 2] = c[(c[l >> 2] | 0) + 56 >> 2];
    c[w >> 2] = c[(c[l >> 2] | 0) + 60 >> 2];
    c[x >> 2] = c[(c[l >> 2] | 0) + 76 >> 2];
    c[y >> 2] = c[(c[l >> 2] | 0) + 80 >> 2];
    c[z >> 2] = (1 << c[(c[l >> 2] | 0) + 84 >> 2]) - 1;
    c[A >> 2] = (1 << c[(c[l >> 2] | 0) + 88 >> 2]) - 1;

    a: do {
      if ((c[w >> 2] | 0) >>> 0 < 15) {
        k = (c[m >> 2] | 0) + 1 | 0;
        c[m >> 2] = k;
        c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]);
        c[w >> 2] = (c[w >> 2] | 0) + 8;
        k = (c[m >> 2] | 0) + 1 | 0;
        c[m >> 2] = k;
        c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]);
        c[w >> 2] = (c[w >> 2] | 0) + 8;
      }

      k = (c[x >> 2] | 0) + ((c[v >> 2] & c[z >> 2]) << 2) | 0;
      b[B >> 1] = b[k >> 1] | 0;
      b[B + 2 >> 1] = b[k + 2 >> 1] | 0;

      while (1) {
        c[C >> 2] = d[B + 1 >> 0];
        c[v >> 2] = (c[v >> 2] | 0) >>> (c[C >> 2] | 0);
        c[w >> 2] = (c[w >> 2] | 0) - (c[C >> 2] | 0);
        c[C >> 2] = d[B >> 0];

        if (!(c[C >> 2] | 0)) {
          G = 6;
          break;
        }

        if (c[C >> 2] & 16) {
          G = 8;
          break;
        }

        if (c[C >> 2] & 64) {
          G = 55;
          break a;
        }

        k = (c[x >> 2] | 0) + ((e[B + 2 >> 1] | 0) + (c[v >> 2] & (1 << c[C >> 2]) - 1) << 2) | 0;
        b[B >> 1] = b[k >> 1] | 0;
        b[B + 2 >> 1] = b[k + 2 >> 1] | 0;
      }

      do if ((G | 0) == 6) {
        G = 0;
        k = b[B + 2 >> 1] & 255;
        g = (c[o >> 2] | 0) + 1 | 0;
        c[o >> 2] = g;
        a[g >> 0] = k;
      } else if ((G | 0) == 8) {
        G = 0;
        c[D >> 2] = e[B + 2 >> 1];
        c[C >> 2] = c[C >> 2] & 15;

        if (c[C >> 2] | 0) {
          if ((c[w >> 2] | 0) >>> 0 < (c[C >> 2] | 0) >>> 0) {
            k = (c[m >> 2] | 0) + 1 | 0;
            c[m >> 2] = k;
            c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]);
            c[w >> 2] = (c[w >> 2] | 0) + 8;
          }

          c[D >> 2] = (c[D >> 2] | 0) + (c[v >> 2] & (1 << c[C >> 2]) - 1);
          c[v >> 2] = (c[v >> 2] | 0) >>> (c[C >> 2] | 0);
          c[w >> 2] = (c[w >> 2] | 0) - (c[C >> 2] | 0);
        }

        if ((c[w >> 2] | 0) >>> 0 < 15) {
          k = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = k;
          c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]);
          c[w >> 2] = (c[w >> 2] | 0) + 8;
          k = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = k;
          c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]);
          c[w >> 2] = (c[w >> 2] | 0) + 8;
        }

        k = (c[y >> 2] | 0) + ((c[v >> 2] & c[A >> 2]) << 2) | 0;
        b[B >> 1] = b[k >> 1] | 0;
        b[B + 2 >> 1] = b[k + 2 >> 1] | 0;

        while (1) {
          c[C >> 2] = d[B + 1 >> 0];
          c[v >> 2] = (c[v >> 2] | 0) >>> (c[C >> 2] | 0);
          c[w >> 2] = (c[w >> 2] | 0) - (c[C >> 2] | 0);
          c[C >> 2] = d[B >> 0];
          if (c[C >> 2] & 16) break;

          if (c[C >> 2] & 64) {
            G = 52;
            break a;
          }

          k = (c[y >> 2] | 0) + ((e[B + 2 >> 1] | 0) + (c[v >> 2] & (1 << c[C >> 2]) - 1) << 2) | 0;
          b[B >> 1] = b[k >> 1] | 0;
          b[B + 2 >> 1] = b[k + 2 >> 1] | 0;
        }

        c[E >> 2] = e[B + 2 >> 1];
        c[C >> 2] = c[C >> 2] & 15;

        if ((c[w >> 2] | 0) >>> 0 < (c[C >> 2] | 0) >>> 0 ? (k = (c[m >> 2] | 0) + 1 | 0, c[m >> 2] = k, c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]), c[w >> 2] = (c[w >> 2] | 0) + 8, (c[w >> 2] | 0) >>> 0 < (c[C >> 2] | 0) >>> 0) : 0) {
          k = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = k;
          c[v >> 2] = (c[v >> 2] | 0) + ((d[k >> 0] | 0) << c[w >> 2]);
          c[w >> 2] = (c[w >> 2] | 0) + 8;
        }

        c[E >> 2] = (c[E >> 2] | 0) + (c[v >> 2] & (1 << c[C >> 2]) - 1);
        c[v >> 2] = (c[v >> 2] | 0) >>> (c[C >> 2] | 0);
        c[w >> 2] = (c[w >> 2] | 0) - (c[C >> 2] | 0);
        c[C >> 2] = (c[o >> 2] | 0) - (c[p >> 2] | 0);

        if ((c[E >> 2] | 0) >>> 0 <= (c[C >> 2] | 0) >>> 0) {
          c[F >> 2] = (c[o >> 2] | 0) + (0 - (c[E >> 2] | 0));

          do {
            k = (c[F >> 2] | 0) + 1 | 0;
            c[F >> 2] = k;
            g = a[k >> 0] | 0;
            k = (c[o >> 2] | 0) + 1 | 0;
            c[o >> 2] = k;
            a[k >> 0] = g;
            g = (c[F >> 2] | 0) + 1 | 0;
            c[F >> 2] = g;
            k = a[g >> 0] | 0;
            g = (c[o >> 2] | 0) + 1 | 0;
            c[o >> 2] = g;
            a[g >> 0] = k;
            k = (c[F >> 2] | 0) + 1 | 0;
            c[F >> 2] = k;
            g = a[k >> 0] | 0;
            k = (c[o >> 2] | 0) + 1 | 0;
            c[o >> 2] = k;
            a[k >> 0] = g;
            c[D >> 2] = (c[D >> 2] | 0) - 3;
          } while ((c[D >> 2] | 0) >>> 0 > 2);

          if (!(c[D >> 2] | 0)) break;
          g = (c[F >> 2] | 0) + 1 | 0;
          c[F >> 2] = g;
          k = a[g >> 0] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          a[g >> 0] = k;
          if ((c[D >> 2] | 0) >>> 0 <= 1) break;
          k = (c[F >> 2] | 0) + 1 | 0;
          c[F >> 2] = k;
          g = a[k >> 0] | 0;
          k = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = k;
          a[k >> 0] = g;
          break;
        }

        c[C >> 2] = (c[E >> 2] | 0) - (c[C >> 2] | 0);

        if ((c[C >> 2] | 0) >>> 0 > (c[s >> 2] | 0) >>> 0 ? (c[(c[l >> 2] | 0) + 7104 >> 2] | 0) != 0 : 0) {
          G = 22;
          break a;
        }

        c[F >> 2] = (c[u >> 2] | 0) + -1;

        do if (!(c[t >> 2] | 0)) {
          c[F >> 2] = (c[F >> 2] | 0) + ((c[r >> 2] | 0) - (c[C >> 2] | 0));

          if ((c[C >> 2] | 0) >>> 0 < (c[D >> 2] | 0) >>> 0) {
            c[D >> 2] = (c[D >> 2] | 0) - (c[C >> 2] | 0);

            do {
              g = (c[F >> 2] | 0) + 1 | 0;
              c[F >> 2] = g;
              k = a[g >> 0] | 0;
              g = (c[o >> 2] | 0) + 1 | 0;
              c[o >> 2] = g;
              a[g >> 0] = k;
              k = (c[C >> 2] | 0) + -1 | 0;
              c[C >> 2] = k;
            } while ((k | 0) != 0);

            c[F >> 2] = (c[o >> 2] | 0) + (0 - (c[E >> 2] | 0));
          }
        } else {
          if ((c[t >> 2] | 0) >>> 0 >= (c[C >> 2] | 0) >>> 0) {
            c[F >> 2] = (c[F >> 2] | 0) + ((c[t >> 2] | 0) - (c[C >> 2] | 0));
            if ((c[C >> 2] | 0) >>> 0 >= (c[D >> 2] | 0) >>> 0) break;
            c[D >> 2] = (c[D >> 2] | 0) - (c[C >> 2] | 0);

            do {
              k = (c[F >> 2] | 0) + 1 | 0;
              c[F >> 2] = k;
              g = a[k >> 0] | 0;
              k = (c[o >> 2] | 0) + 1 | 0;
              c[o >> 2] = k;
              a[k >> 0] = g;
              g = (c[C >> 2] | 0) + -1 | 0;
              c[C >> 2] = g;
            } while ((g | 0) != 0);

            c[F >> 2] = (c[o >> 2] | 0) + (0 - (c[E >> 2] | 0));
            break;
          }

          c[F >> 2] = (c[F >> 2] | 0) + ((c[r >> 2] | 0) + (c[t >> 2] | 0) - (c[C >> 2] | 0));
          c[C >> 2] = (c[C >> 2] | 0) - (c[t >> 2] | 0);

          if ((c[C >> 2] | 0) >>> 0 < (c[D >> 2] | 0) >>> 0) {
            c[D >> 2] = (c[D >> 2] | 0) - (c[C >> 2] | 0);

            do {
              g = (c[F >> 2] | 0) + 1 | 0;
              c[F >> 2] = g;
              k = a[g >> 0] | 0;
              g = (c[o >> 2] | 0) + 1 | 0;
              c[o >> 2] = g;
              a[g >> 0] = k;
              k = (c[C >> 2] | 0) + -1 | 0;
              c[C >> 2] = k;
            } while ((k | 0) != 0);

            c[F >> 2] = (c[u >> 2] | 0) + -1;

            if ((c[t >> 2] | 0) >>> 0 < (c[D >> 2] | 0) >>> 0) {
              c[C >> 2] = c[t >> 2];
              c[D >> 2] = (c[D >> 2] | 0) - (c[C >> 2] | 0);

              do {
                k = (c[F >> 2] | 0) + 1 | 0;
                c[F >> 2] = k;
                g = a[k >> 0] | 0;
                k = (c[o >> 2] | 0) + 1 | 0;
                c[o >> 2] = k;
                a[k >> 0] = g;
                g = (c[C >> 2] | 0) + -1 | 0;
                c[C >> 2] = g;
              } while ((g | 0) != 0);

              c[F >> 2] = (c[o >> 2] | 0) + (0 - (c[E >> 2] | 0));
            }
          }
        } while (0);

        while (1) {
          if ((c[D >> 2] | 0) >>> 0 <= 2) break;
          g = (c[F >> 2] | 0) + 1 | 0;
          c[F >> 2] = g;
          k = a[g >> 0] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          a[g >> 0] = k;
          k = (c[F >> 2] | 0) + 1 | 0;
          c[F >> 2] = k;
          g = a[k >> 0] | 0;
          k = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = k;
          a[k >> 0] = g;
          g = (c[F >> 2] | 0) + 1 | 0;
          c[F >> 2] = g;
          k = a[g >> 0] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          a[g >> 0] = k;
          c[D >> 2] = (c[D >> 2] | 0) - 3;
        }

        if ((c[D >> 2] | 0) != 0 ? (k = (c[F >> 2] | 0) + 1 | 0, c[F >> 2] = k, g = a[k >> 0] | 0, k = (c[o >> 2] | 0) + 1 | 0, c[o >> 2] = k, a[k >> 0] = g, (c[D >> 2] | 0) >>> 0 > 1) : 0) {
          g = (c[F >> 2] | 0) + 1 | 0;
          c[F >> 2] = g;
          k = a[g >> 0] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          a[g >> 0] = k;
        }
      } while (0);

      if ((c[m >> 2] | 0) >>> 0 >= (c[n >> 2] | 0) >>> 0) break;
    } while ((c[o >> 2] | 0) >>> 0 < (c[q >> 2] | 0) >>> 0);

    do if ((G | 0) == 22) {
      c[(c[j >> 2] | 0) + 24 >> 2] = 14670;
      c[c[l >> 2] >> 2] = 29;
    } else if ((G | 0) == 52) {
      c[(c[j >> 2] | 0) + 24 >> 2] = 14700;
      c[c[l >> 2] >> 2] = 29;
    } else if ((G | 0) == 55) if (c[C >> 2] & 32) {
      c[c[l >> 2] >> 2] = 11;
      break;
    } else {
      c[(c[j >> 2] | 0) + 24 >> 2] = 14722;
      c[c[l >> 2] >> 2] = 29;
      break;
    } while (0);

    c[D >> 2] = (c[w >> 2] | 0) >>> 3;
    c[m >> 2] = (c[m >> 2] | 0) + (0 - (c[D >> 2] | 0));
    c[w >> 2] = (c[w >> 2] | 0) - (c[D >> 2] << 3);
    c[v >> 2] = c[v >> 2] & (1 << c[w >> 2]) - 1;
    c[c[j >> 2] >> 2] = (c[m >> 2] | 0) + 1;
    c[(c[j >> 2] | 0) + 12 >> 2] = (c[o >> 2] | 0) + 1;
    if ((c[m >> 2] | 0) >>> 0 < (c[n >> 2] | 0) >>> 0) H = 5 + ((c[n >> 2] | 0) - (c[m >> 2] | 0)) | 0;else H = 5 - ((c[m >> 2] | 0) - (c[n >> 2] | 0)) | 0;
    c[(c[j >> 2] | 0) + 4 >> 2] = H;

    if ((c[o >> 2] | 0) >>> 0 < (c[q >> 2] | 0) >>> 0) {
      I = 257 + ((c[q >> 2] | 0) - (c[o >> 2] | 0)) | 0;
      J = c[j >> 2] | 0;
      K = J + 16 | 0;
      c[K >> 2] = I;
      L = c[v >> 2] | 0;
      M = c[l >> 2] | 0;
      N = M + 56 | 0;
      c[N >> 2] = L;
      O = c[w >> 2] | 0;
      P = c[l >> 2] | 0;
      Q = P + 60 | 0;
      c[Q >> 2] = O;
      i = h;
      return;
    } else {
      I = 257 - ((c[o >> 2] | 0) - (c[q >> 2] | 0)) | 0;
      J = c[j >> 2] | 0;
      K = J + 16 | 0;
      c[K >> 2] = I;
      L = c[v >> 2] | 0;
      M = c[l >> 2] | 0;
      N = M + 56 | 0;
      c[N >> 2] = L;
      O = c[w >> 2] | 0;
      P = c[l >> 2] | 0;
      Q = P + 60 | 0;
      c[Q >> 2] = O;
      i = h;
      return;
    }
  }

  function td(a) {
    a = a | 0;
    var d = 0,
        e = 0;
    d = i;
    i = i + 16 | 0;
    e = d;
    c[e >> 2] = a;
    Id();
    c[(c[e >> 2] | 0) + 2840 >> 2] = (c[e >> 2] | 0) + 148;
    c[(c[e >> 2] | 0) + 2840 + 8 >> 2] = 8360;
    c[(c[e >> 2] | 0) + 2852 >> 2] = (c[e >> 2] | 0) + 2440;
    c[(c[e >> 2] | 0) + 2852 + 8 >> 2] = 8380;
    c[(c[e >> 2] | 0) + 2864 >> 2] = (c[e >> 2] | 0) + 2684;
    c[(c[e >> 2] | 0) + 2864 + 8 >> 2] = 8400;
    b[(c[e >> 2] | 0) + 5816 >> 1] = 0;
    c[(c[e >> 2] | 0) + 5820 >> 2] = 0;
    c[(c[e >> 2] | 0) + 5812 >> 2] = 8;
    Jd(c[e >> 2] | 0);
    i = d;
    return;
  }

  function ud(d, f, g, h) {
    d = d | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
    j = i;
    i = i + 32 | 0;
    k = j + 20 | 0;
    l = j + 16 | 0;
    m = j + 12 | 0;
    n = j + 8 | 0;
    o = j + 4 | 0;
    p = j;
    c[k >> 2] = d;
    c[l >> 2] = f;
    c[m >> 2] = g;
    c[n >> 2] = h;
    c[o >> 2] = 3;
    h = 0 + (c[n >> 2] | 0) | 0;

    if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[o >> 2] | 0) | 0)) {
      c[p >> 2] = h;
      n = (c[k >> 2] | 0) + 5816 | 0;
      b[n >> 1] = e[n >> 1] | 0 | (c[p >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
      n = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
      g = (c[k >> 2] | 0) + 20 | 0;
      f = c[g >> 2] | 0;
      c[g >> 2] = f + 1;
      a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = n;
      n = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      f = (c[k >> 2] | 0) + 20 | 0;
      g = c[f >> 2] | 0;
      c[f >> 2] = g + 1;
      a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + g >> 0] = n;
      b[(c[k >> 2] | 0) + 5816 >> 1] = (c[p >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
      p = (c[k >> 2] | 0) + 5820 | 0;
      c[p >> 2] = (c[p >> 2] | 0) + ((c[o >> 2] | 0) - 16);
      q = c[k >> 2] | 0;
      r = c[l >> 2] | 0;
      s = c[m >> 2] | 0;
      Kd(q, r, s, 1);
      i = j;
      return;
    } else {
      p = (c[k >> 2] | 0) + 5816 | 0;
      b[p >> 1] = e[p >> 1] | 0 | (h & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
      h = (c[k >> 2] | 0) + 5820 | 0;
      c[h >> 2] = (c[h >> 2] | 0) + (c[o >> 2] | 0);
      q = c[k >> 2] | 0;
      r = c[l >> 2] | 0;
      s = c[m >> 2] | 0;
      Kd(q, r, s, 1);
      i = j;
      return;
    }
  }

  function vd(d) {
    d = d | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
    f = i;
    i = i + 48 | 0;
    g = f + 32 | 0;
    h = f + 28 | 0;
    j = f + 24 | 0;
    k = f + 20 | 0;
    l = f + 16 | 0;
    m = f + 12 | 0;
    n = f + 8 | 0;
    o = f + 4 | 0;
    p = f;
    c[g >> 2] = d;
    c[h >> 2] = 3;

    if ((c[(c[g >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[h >> 2] | 0) | 0)) {
      c[j >> 2] = 2;
      d = (c[g >> 2] | 0) + 5816 | 0;
      b[d >> 1] = e[d >> 1] | 0 | (c[j >> 2] & 65535) << c[(c[g >> 2] | 0) + 5820 >> 2];
      d = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) & 255;
      q = (c[g >> 2] | 0) + 20 | 0;
      r = c[q >> 2] | 0;
      c[q >> 2] = r + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + r >> 0] = d;
      d = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      r = (c[g >> 2] | 0) + 20 | 0;
      q = c[r >> 2] | 0;
      c[r >> 2] = q + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + q >> 0] = d;
      b[(c[g >> 2] | 0) + 5816 >> 1] = (c[j >> 2] & 65535) >> 16 - (c[(c[g >> 2] | 0) + 5820 >> 2] | 0);
      j = (c[g >> 2] | 0) + 5820 | 0;
      c[j >> 2] = (c[j >> 2] | 0) + ((c[h >> 2] | 0) - 16);
    } else {
      j = (c[g >> 2] | 0) + 5816 | 0;
      b[j >> 1] = e[j >> 1] | 0 | 2 << c[(c[g >> 2] | 0) + 5820 >> 2];
      j = (c[g >> 2] | 0) + 5820 | 0;
      c[j >> 2] = (c[j >> 2] | 0) + (c[h >> 2] | 0);
    }

    c[k >> 2] = e[5528];
    h = e[5527] | 0;

    if ((c[(c[g >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[k >> 2] | 0) | 0)) {
      c[l >> 2] = h;
      j = (c[g >> 2] | 0) + 5816 | 0;
      b[j >> 1] = e[j >> 1] | 0 | (c[l >> 2] & 65535) << c[(c[g >> 2] | 0) + 5820 >> 2];
      j = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) & 255;
      d = (c[g >> 2] | 0) + 20 | 0;
      q = c[d >> 2] | 0;
      c[d >> 2] = q + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + q >> 0] = j;
      j = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      q = (c[g >> 2] | 0) + 20 | 0;
      d = c[q >> 2] | 0;
      c[q >> 2] = d + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = j;
      b[(c[g >> 2] | 0) + 5816 >> 1] = (c[l >> 2] & 65535) >> 16 - (c[(c[g >> 2] | 0) + 5820 >> 2] | 0);
      l = (c[g >> 2] | 0) + 5820 | 0;
      c[l >> 2] = (c[l >> 2] | 0) + ((c[k >> 2] | 0) - 16);
    } else {
      l = (c[g >> 2] | 0) + 5816 | 0;
      b[l >> 1] = e[l >> 1] | 0 | h << c[(c[g >> 2] | 0) + 5820 >> 2];
      h = (c[g >> 2] | 0) + 5820 | 0;
      c[h >> 2] = (c[h >> 2] | 0) + (c[k >> 2] | 0);
    }

    Ld(c[g >> 2] | 0);

    if ((1 + (c[(c[g >> 2] | 0) + 5812 >> 2] | 0) + 10 - (c[(c[g >> 2] | 0) + 5820 >> 2] | 0) | 0) >= 9) {
      s = c[g >> 2] | 0;
      t = s + 5812 | 0;
      c[t >> 2] = 7;
      i = f;
      return;
    }

    c[m >> 2] = 3;

    if ((c[(c[g >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[m >> 2] | 0) | 0)) {
      c[n >> 2] = 2;
      k = (c[g >> 2] | 0) + 5816 | 0;
      b[k >> 1] = e[k >> 1] | 0 | (c[n >> 2] & 65535) << c[(c[g >> 2] | 0) + 5820 >> 2];
      k = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) & 255;
      h = (c[g >> 2] | 0) + 20 | 0;
      l = c[h >> 2] | 0;
      c[h >> 2] = l + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + l >> 0] = k;
      k = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      l = (c[g >> 2] | 0) + 20 | 0;
      h = c[l >> 2] | 0;
      c[l >> 2] = h + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + h >> 0] = k;
      b[(c[g >> 2] | 0) + 5816 >> 1] = (c[n >> 2] & 65535) >> 16 - (c[(c[g >> 2] | 0) + 5820 >> 2] | 0);
      n = (c[g >> 2] | 0) + 5820 | 0;
      c[n >> 2] = (c[n >> 2] | 0) + ((c[m >> 2] | 0) - 16);
    } else {
      n = (c[g >> 2] | 0) + 5816 | 0;
      b[n >> 1] = e[n >> 1] | 0 | 2 << c[(c[g >> 2] | 0) + 5820 >> 2];
      n = (c[g >> 2] | 0) + 5820 | 0;
      c[n >> 2] = (c[n >> 2] | 0) + (c[m >> 2] | 0);
    }

    c[o >> 2] = e[5528];
    m = e[5527] | 0;

    if ((c[(c[g >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[o >> 2] | 0) | 0)) {
      c[p >> 2] = m;
      n = (c[g >> 2] | 0) + 5816 | 0;
      b[n >> 1] = e[n >> 1] | 0 | (c[p >> 2] & 65535) << c[(c[g >> 2] | 0) + 5820 >> 2];
      n = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) & 255;
      k = (c[g >> 2] | 0) + 20 | 0;
      h = c[k >> 2] | 0;
      c[k >> 2] = h + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + h >> 0] = n;
      n = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      h = (c[g >> 2] | 0) + 20 | 0;
      k = c[h >> 2] | 0;
      c[h >> 2] = k + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + k >> 0] = n;
      b[(c[g >> 2] | 0) + 5816 >> 1] = (c[p >> 2] & 65535) >> 16 - (c[(c[g >> 2] | 0) + 5820 >> 2] | 0);
      p = (c[g >> 2] | 0) + 5820 | 0;
      c[p >> 2] = (c[p >> 2] | 0) + ((c[o >> 2] | 0) - 16);
    } else {
      p = (c[g >> 2] | 0) + 5816 | 0;
      b[p >> 1] = e[p >> 1] | 0 | m << c[(c[g >> 2] | 0) + 5820 >> 2];
      m = (c[g >> 2] | 0) + 5820 | 0;
      c[m >> 2] = (c[m >> 2] | 0) + (c[o >> 2] | 0);
    }

    Ld(c[g >> 2] | 0);
    s = c[g >> 2] | 0;
    t = s + 5812 | 0;
    c[t >> 2] = 7;
    i = f;
    return;
  }

  function wd(d, f, g, h) {
    d = d | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0;
    j = i;
    i = i + 48 | 0;
    k = j + 40 | 0;
    l = j + 36 | 0;
    m = j + 32 | 0;
    n = j + 28 | 0;
    o = j + 24 | 0;
    p = j + 20 | 0;
    q = j + 16 | 0;
    r = j + 12 | 0;
    s = j + 8 | 0;
    t = j + 4 | 0;
    u = j;
    c[k >> 2] = d;
    c[l >> 2] = f;
    c[m >> 2] = g;
    c[n >> 2] = h;
    c[q >> 2] = 0;

    if ((c[(c[k >> 2] | 0) + 132 >> 2] | 0) > 0) {
      if ((c[(c[c[k >> 2] >> 2] | 0) + 44 >> 2] | 0) == 2) {
        h = Md(c[k >> 2] | 0) | 0;
        c[(c[c[k >> 2] >> 2] | 0) + 44 >> 2] = h;
      }

      Nd(c[k >> 2] | 0, (c[k >> 2] | 0) + 2840 | 0);
      Nd(c[k >> 2] | 0, (c[k >> 2] | 0) + 2852 | 0);
      c[q >> 2] = Od(c[k >> 2] | 0) | 0;
      c[o >> 2] = ((c[(c[k >> 2] | 0) + 5800 >> 2] | 0) + 3 + 7 | 0) >>> 3;
      c[p >> 2] = ((c[(c[k >> 2] | 0) + 5804 >> 2] | 0) + 3 + 7 | 0) >>> 3;
      if ((c[p >> 2] | 0) >>> 0 <= (c[o >> 2] | 0) >>> 0) c[o >> 2] = c[p >> 2];
    } else {
      h = (c[m >> 2] | 0) + 5 | 0;
      c[p >> 2] = h;
      c[o >> 2] = h;
    }

    h = c[k >> 2] | 0;

    do if ((c[l >> 2] | 0) != 0 ? ((c[m >> 2] | 0) + 4 | 0) >>> 0 <= (c[o >> 2] | 0) >>> 0 : 0) ud(h, c[l >> 2] | 0, c[m >> 2] | 0, c[n >> 2] | 0);else {
      if ((c[h + 136 >> 2] | 0) != 4 ? (c[p >> 2] | 0) != (c[o >> 2] | 0) : 0) {
        c[t >> 2] = 3;
        g = 4 + (c[n >> 2] | 0) | 0;

        if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[t >> 2] | 0) | 0)) {
          c[u >> 2] = g;
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | (c[u >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
          d = (c[k >> 2] | 0) + 20 | 0;
          v = c[d >> 2] | 0;
          c[d >> 2] = v + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + v >> 0] = f;
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
          v = (c[k >> 2] | 0) + 20 | 0;
          d = c[v >> 2] | 0;
          c[v >> 2] = d + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
          b[(c[k >> 2] | 0) + 5816 >> 1] = (c[u >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
          f = (c[k >> 2] | 0) + 5820 | 0;
          c[f >> 2] = (c[f >> 2] | 0) + ((c[t >> 2] | 0) - 16);
        } else {
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | (g & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
          g = (c[k >> 2] | 0) + 5820 | 0;
          c[g >> 2] = (c[g >> 2] | 0) + (c[t >> 2] | 0);
        }

        Qd(c[k >> 2] | 0, (c[(c[k >> 2] | 0) + 2840 + 4 >> 2] | 0) + 1 | 0, (c[(c[k >> 2] | 0) + 2852 + 4 >> 2] | 0) + 1 | 0, (c[q >> 2] | 0) + 1 | 0);
        Pd(c[k >> 2] | 0, (c[k >> 2] | 0) + 148 | 0, (c[k >> 2] | 0) + 2440 | 0);
        break;
      }

      c[r >> 2] = 3;
      g = 2 + (c[n >> 2] | 0) | 0;

      if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[r >> 2] | 0) | 0)) {
        c[s >> 2] = g;
        f = (c[k >> 2] | 0) + 5816 | 0;
        b[f >> 1] = e[f >> 1] | 0 | (c[s >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
        f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
        d = (c[k >> 2] | 0) + 20 | 0;
        v = c[d >> 2] | 0;
        c[d >> 2] = v + 1;
        a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + v >> 0] = f;
        f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
        v = (c[k >> 2] | 0) + 20 | 0;
        d = c[v >> 2] | 0;
        c[v >> 2] = d + 1;
        a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
        b[(c[k >> 2] | 0) + 5816 >> 1] = (c[s >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
        f = (c[k >> 2] | 0) + 5820 | 0;
        c[f >> 2] = (c[f >> 2] | 0) + ((c[r >> 2] | 0) - 16);
      } else {
        f = (c[k >> 2] | 0) + 5816 | 0;
        b[f >> 1] = e[f >> 1] | 0 | (g & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
        g = (c[k >> 2] | 0) + 5820 | 0;
        c[g >> 2] = (c[g >> 2] | 0) + (c[r >> 2] | 0);
      }

      Pd(c[k >> 2] | 0, 10030, 11182);
    } while (0);

    Jd(c[k >> 2] | 0);

    if (!(c[n >> 2] | 0)) {
      i = j;
      return;
    }

    Rd(c[k >> 2] | 0);
    i = j;
    return;
  }

  function xd(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0;
    e = i;
    i = i + 16 | 0;
    f = e + 8 | 0;
    g = e + 4 | 0;
    h = e;
    c[f >> 2] = a;
    c[g >> 2] = b;
    c[h >> 2] = d;
    if (c[f >> 2] | 0) c[g >> 2] = (c[g >> 2] | 0) + ((c[h >> 2] | 0) - (c[h >> 2] | 0));
    f = Re(_(c[g >> 2] | 0, c[h >> 2] | 0) | 0) | 0;
    i = e;
    return f | 0;
  }

  function yd(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0;
    d = i;
    i = i + 16 | 0;
    e = d;
    c[d + 4 >> 2] = a;
    c[e >> 2] = b;
    Se(c[e >> 2] | 0);
    i = d;
    return;
  }

  function zd(a, b, e) {
    a = a | 0;
    b = b | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
    f = i;
    i = i + 32 | 0;
    g = f + 16 | 0;
    h = f + 12 | 0;
    j = f + 8 | 0;
    k = f + 4 | 0;
    l = f;
    c[g >> 2] = a;
    c[h >> 2] = b;
    c[j >> 2] = e;
    c[k >> 2] = c[g >> 2];
    c[k >> 2] = ~c[k >> 2];

    while (1) {
      if (!(c[j >> 2] | 0)) break;
      if (!(c[h >> 2] & 3)) break;
      g = c[k >> 2] | 0;
      e = c[h >> 2] | 0;
      c[h >> 2] = e + 1;
      c[k >> 2] = c[48 + (((g ^ (d[e >> 0] | 0)) & 255) << 2) >> 2] ^ (c[k >> 2] | 0) >>> 8;
      c[j >> 2] = (c[j >> 2] | 0) + -1;
    }

    c[l >> 2] = c[h >> 2];

    while (1) {
      if ((c[j >> 2] | 0) >>> 0 < 32) break;
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 4;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      c[j >> 2] = (c[j >> 2] | 0) - 32;
    }

    while (1) {
      m = c[l >> 2] | 0;
      if ((c[j >> 2] | 0) >>> 0 < 4) break;
      c[l >> 2] = m + 4;
      c[k >> 2] = c[k >> 2] ^ c[m >> 2];
      c[k >> 2] = c[3120 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[2096 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[1072 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[48 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      c[j >> 2] = (c[j >> 2] | 0) - 4;
    }

    c[h >> 2] = m;

    if (!(c[j >> 2] | 0)) {
      n = c[k >> 2] | 0;
      o = ~n;
      c[k >> 2] = o;
      p = c[k >> 2] | 0;
      i = f;
      return p | 0;
    }

    do {
      m = c[k >> 2] | 0;
      l = c[h >> 2] | 0;
      c[h >> 2] = l + 1;
      c[k >> 2] = c[48 + (((m ^ (d[l >> 0] | 0)) & 255) << 2) >> 2] ^ (c[k >> 2] | 0) >>> 8;
      l = (c[j >> 2] | 0) + -1 | 0;
      c[j >> 2] = l;
    } while ((l | 0) != 0);

    n = c[k >> 2] | 0;
    o = ~n;
    c[k >> 2] = o;
    p = c[k >> 2] | 0;
    i = f;
    return p | 0;
  }

  function Ad(a, b, e) {
    a = a | 0;
    b = b | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0;
    f = i;
    i = i + 32 | 0;
    g = f + 16 | 0;
    h = f + 12 | 0;
    j = f + 8 | 0;
    k = f + 4 | 0;
    l = f;
    c[g >> 2] = a;
    c[h >> 2] = b;
    c[j >> 2] = e;
    c[k >> 2] = ((c[g >> 2] | 0) >>> 24 & 255) + ((c[g >> 2] | 0) >>> 8 & 65280) + ((c[g >> 2] & 65280) << 8) + ((c[g >> 2] & 255) << 24);
    c[k >> 2] = ~c[k >> 2];

    while (1) {
      if (!(c[j >> 2] | 0)) break;
      if (!(c[h >> 2] & 3)) break;
      g = (c[k >> 2] | 0) >>> 24;
      e = c[h >> 2] | 0;
      c[h >> 2] = e + 1;
      c[k >> 2] = c[4144 + ((g ^ (d[e >> 0] | 0)) << 2) >> 2] ^ c[k >> 2] << 8;
      c[j >> 2] = (c[j >> 2] | 0) + -1;
    }

    c[l >> 2] = c[h >> 2];
    c[l >> 2] = (c[l >> 2] | 0) + -4;

    while (1) {
      if ((c[j >> 2] | 0) >>> 0 < 32) break;
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      e = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = e;
      c[k >> 2] = c[k >> 2] ^ c[e >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      c[j >> 2] = (c[j >> 2] | 0) - 32;
    }

    while (1) {
      e = (c[j >> 2] | 0) >>> 0 >= 4;
      g = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = g;
      if (!e) break;
      c[k >> 2] = c[k >> 2] ^ c[g >> 2];
      c[k >> 2] = c[4144 + ((c[k >> 2] & 255) << 2) >> 2] ^ c[5168 + (((c[k >> 2] | 0) >>> 8 & 255) << 2) >> 2] ^ c[6192 + (((c[k >> 2] | 0) >>> 16 & 255) << 2) >> 2] ^ c[7216 + ((c[k >> 2] | 0) >>> 24 << 2) >> 2];
      c[j >> 2] = (c[j >> 2] | 0) - 4;
    }

    c[h >> 2] = c[l >> 2];

    if (!(c[j >> 2] | 0)) {
      m = c[k >> 2] | 0;
      n = ~m;
      c[k >> 2] = n;
      o = c[k >> 2] | 0;
      p = o >>> 24;
      q = p & 255;
      r = c[k >> 2] | 0;
      s = r >>> 8;
      t = s & 65280;
      u = q + t | 0;
      v = c[k >> 2] | 0;
      w = v & 65280;
      x = w << 8;
      y = u + x | 0;
      z = c[k >> 2] | 0;
      A = z & 255;
      B = A << 24;
      C = y + B | 0;
      i = f;
      return C | 0;
    }

    do {
      l = (c[k >> 2] | 0) >>> 24;
      g = c[h >> 2] | 0;
      c[h >> 2] = g + 1;
      c[k >> 2] = c[4144 + ((l ^ (d[g >> 0] | 0)) << 2) >> 2] ^ c[k >> 2] << 8;
      g = (c[j >> 2] | 0) + -1 | 0;
      c[j >> 2] = g;
    } while ((g | 0) != 0);

    m = c[k >> 2] | 0;
    n = ~m;
    c[k >> 2] = n;
    o = c[k >> 2] | 0;
    p = o >>> 24;
    q = p & 255;
    r = c[k >> 2] | 0;
    s = r >>> 8;
    t = s & 65280;
    u = q + t | 0;
    v = c[k >> 2] | 0;
    w = v & 65280;
    x = w << 8;
    y = u + x | 0;
    z = c[k >> 2] | 0;
    A = z & 255;
    B = A << 24;
    C = y + B | 0;
    i = f;
    return C | 0;
  }

  function Bd(a) {
    a = a | 0;
    var d = 0,
        f = 0;
    d = i;
    i = i + 16 | 0;
    f = d;
    c[f >> 2] = a;
    c[(c[f >> 2] | 0) + 60 >> 2] = c[(c[f >> 2] | 0) + 44 >> 2] << 1;
    b[(c[(c[f >> 2] | 0) + 68 >> 2] | 0) + ((c[(c[f >> 2] | 0) + 76 >> 2] | 0) - 1 << 1) >> 1] = 0;
    Ze(c[(c[f >> 2] | 0) + 68 >> 2] | 0, 0, (c[(c[f >> 2] | 0) + 76 >> 2] | 0) - 1 << 1 | 0) | 0;
    c[(c[f >> 2] | 0) + 128 >> 2] = e[8240 + ((c[(c[f >> 2] | 0) + 132 >> 2] | 0) * 12 | 0) + 2 >> 1];
    c[(c[f >> 2] | 0) + 140 >> 2] = e[8240 + ((c[(c[f >> 2] | 0) + 132 >> 2] | 0) * 12 | 0) >> 1];
    c[(c[f >> 2] | 0) + 144 >> 2] = e[8240 + ((c[(c[f >> 2] | 0) + 132 >> 2] | 0) * 12 | 0) + 4 >> 1];
    c[(c[f >> 2] | 0) + 124 >> 2] = e[8240 + ((c[(c[f >> 2] | 0) + 132 >> 2] | 0) * 12 | 0) + 6 >> 1];
    c[(c[f >> 2] | 0) + 108 >> 2] = 0;
    c[(c[f >> 2] | 0) + 92 >> 2] = 0;
    c[(c[f >> 2] | 0) + 116 >> 2] = 0;
    c[(c[f >> 2] | 0) + 120 >> 2] = 2;
    c[(c[f >> 2] | 0) + 96 >> 2] = 2;
    c[(c[f >> 2] | 0) + 104 >> 2] = 0;
    c[(c[f >> 2] | 0) + 72 >> 2] = 0;
    i = d;
    return;
  }

  function Cd(b, d) {
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0;
    e = i;
    i = i + 16 | 0;
    f = e + 4 | 0;
    g = e;
    c[f >> 2] = b;
    c[g >> 2] = d;
    d = (c[g >> 2] | 0) >>> 8 & 255;
    b = (c[f >> 2] | 0) + 20 | 0;
    h = c[b >> 2] | 0;
    c[b >> 2] = h + 1;
    a[(c[(c[f >> 2] | 0) + 8 >> 2] | 0) + h >> 0] = d;
    d = c[g >> 2] & 255;
    g = (c[f >> 2] | 0) + 20 | 0;
    h = c[g >> 2] | 0;
    c[g >> 2] = h + 1;
    a[(c[(c[f >> 2] | 0) + 8 >> 2] | 0) + h >> 0] = d;
    i = e;
    return;
  }

  function Dd(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0;
    b = i;
    i = i + 16 | 0;
    d = b + 4 | 0;
    e = b;
    c[d >> 2] = a;
    c[e >> 2] = c[(c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 20 >> 2];
    if ((c[e >> 2] | 0) >>> 0 > (c[(c[d >> 2] | 0) + 16 >> 2] | 0) >>> 0) c[e >> 2] = c[(c[d >> 2] | 0) + 16 >> 2];

    if (!(c[e >> 2] | 0)) {
      i = b;
      return;
    }

    af(c[(c[d >> 2] | 0) + 12 >> 2] | 0, c[(c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 16 >> 2] | 0, c[e >> 2] | 0) | 0;
    a = (c[d >> 2] | 0) + 12 | 0;
    c[a >> 2] = (c[a >> 2] | 0) + (c[e >> 2] | 0);
    a = (c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 16 | 0;
    c[a >> 2] = (c[a >> 2] | 0) + (c[e >> 2] | 0);
    a = (c[d >> 2] | 0) + 20 | 0;
    c[a >> 2] = (c[a >> 2] | 0) + (c[e >> 2] | 0);
    a = (c[d >> 2] | 0) + 16 | 0;
    c[a >> 2] = (c[a >> 2] | 0) - (c[e >> 2] | 0);
    a = (c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 20 | 0;
    c[a >> 2] = (c[a >> 2] | 0) - (c[e >> 2] | 0);

    if (c[(c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 20 >> 2] | 0) {
      i = b;
      return;
    }

    c[(c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 16 >> 2] = c[(c[(c[d >> 2] | 0) + 28 >> 2] | 0) + 8 >> 2];
    i = b;
    return;
  }

  function Ed(e, f) {
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0;
    g = i;
    i = i + 32 | 0;
    h = g + 12 | 0;
    j = g + 8 | 0;
    k = g + 4 | 0;
    l = g;
    m = g + 16 | 0;
    c[j >> 2] = e;
    c[k >> 2] = f;

    while (1) {
      if ((c[(c[j >> 2] | 0) + 116 >> 2] | 0) == 0 ? (Yd(c[j >> 2] | 0), (c[(c[j >> 2] | 0) + 116 >> 2] | 0) == 0) : 0) break;
      c[(c[j >> 2] | 0) + 96 >> 2] = 0;
      a[m >> 0] = a[(c[(c[j >> 2] | 0) + 56 >> 2] | 0) + (c[(c[j >> 2] | 0) + 108 >> 2] | 0) >> 0] | 0;
      b[(c[(c[j >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[j >> 2] | 0) + 5792 >> 2] << 1) >> 1] = 0;
      f = a[m >> 0] | 0;
      e = (c[j >> 2] | 0) + 5792 | 0;
      n = c[e >> 2] | 0;
      c[e >> 2] = n + 1;
      a[(c[(c[j >> 2] | 0) + 5784 >> 2] | 0) + n >> 0] = f;
      f = (c[j >> 2] | 0) + 148 + ((d[m >> 0] | 0) << 2) | 0;
      b[f >> 1] = (b[f >> 1] | 0) + 1 << 16 >> 16;
      c[l >> 2] = (c[(c[j >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[j >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
      f = (c[j >> 2] | 0) + 116 | 0;
      c[f >> 2] = (c[f >> 2] | 0) + -1;
      f = (c[j >> 2] | 0) + 108 | 0;
      c[f >> 2] = (c[f >> 2] | 0) + 1;
      if (!(c[l >> 2] | 0)) continue;
      if ((c[(c[j >> 2] | 0) + 92 >> 2] | 0) >= 0) o = (c[(c[j >> 2] | 0) + 56 >> 2] | 0) + (c[(c[j >> 2] | 0) + 92 >> 2] | 0) | 0;else o = 0;
      wd(c[j >> 2] | 0, o, (c[(c[j >> 2] | 0) + 108 >> 2] | 0) - (c[(c[j >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
      c[(c[j >> 2] | 0) + 92 >> 2] = c[(c[j >> 2] | 0) + 108 >> 2];
      Dd(c[c[j >> 2] >> 2] | 0);

      if (!(c[(c[c[j >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        p = 10;
        break;
      }
    }

    if ((p | 0) == 10) {
      c[h >> 2] = 0;
      q = c[h >> 2] | 0;
      i = g;
      return q | 0;
    }

    if (!(c[k >> 2] | 0)) {
      c[h >> 2] = 0;
      q = c[h >> 2] | 0;
      i = g;
      return q | 0;
    }

    if ((c[(c[j >> 2] | 0) + 92 >> 2] | 0) >= 0) r = (c[(c[j >> 2] | 0) + 56 >> 2] | 0) + (c[(c[j >> 2] | 0) + 92 >> 2] | 0) | 0;else r = 0;
    wd(c[j >> 2] | 0, r, (c[(c[j >> 2] | 0) + 108 >> 2] | 0) - (c[(c[j >> 2] | 0) + 92 >> 2] | 0) | 0, (c[k >> 2] | 0) == 4 & 1);
    c[(c[j >> 2] | 0) + 92 >> 2] = c[(c[j >> 2] | 0) + 108 >> 2];
    Dd(c[c[j >> 2] >> 2] | 0);
    r = (c[k >> 2] | 0) == 4;

    if (!(c[(c[c[j >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
      c[h >> 2] = r ? 2 : 0;
      q = c[h >> 2] | 0;
      i = g;
      return q | 0;
    } else {
      c[h >> 2] = r ? 3 : 1;
      q = c[h >> 2] | 0;
      i = g;
      return q | 0;
    }

    return 0;
  }

  function Fd(f, g) {
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0;
    h = i;
    i = i + 32 | 0;
    j = h + 24 | 0;
    k = h + 20 | 0;
    l = h + 16 | 0;
    m = h + 12 | 0;
    n = h + 8 | 0;
    o = h + 4 | 0;
    p = h;
    q = h + 31 | 0;
    r = h + 28 | 0;
    s = h + 30 | 0;
    c[k >> 2] = f;
    c[l >> 2] = g;

    while (1) {
      if ((c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 < 258) {
        Yd(c[k >> 2] | 0);

        if ((c[l >> 2] | 0) == 0 ? (c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 < 258 : 0) {
          t = 4;
          break;
        }

        if (!(c[(c[k >> 2] | 0) + 116 >> 2] | 0)) {
          t = 34;
          break;
        }
      }

      c[(c[k >> 2] | 0) + 96 >> 2] = 0;

      if (((((c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 >= 3 ? (c[(c[k >> 2] | 0) + 108 >> 2] | 0) >>> 0 > 0 : 0) ? (c[o >> 2] = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 108 >> 2] | 0) + -1, c[n >> 2] = d[c[o >> 2] >> 0], g = c[n >> 2] | 0, f = (c[o >> 2] | 0) + 1 | 0, c[o >> 2] = f, (g | 0) == (d[f >> 0] | 0 | 0)) : 0) ? (f = c[n >> 2] | 0, g = (c[o >> 2] | 0) + 1 | 0, c[o >> 2] = g, (f | 0) == (d[g >> 0] | 0 | 0)) : 0) ? (g = c[n >> 2] | 0, f = (c[o >> 2] | 0) + 1 | 0, c[o >> 2] = f, (g | 0) == (d[f >> 0] | 0 | 0)) : 0) {
        c[p >> 2] = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 108 >> 2] | 0) + 258;

        do {
          f = c[n >> 2] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          if ((f | 0) != (d[g >> 0] | 0 | 0)) break;
          g = c[n >> 2] | 0;
          f = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = f;
          if ((g | 0) != (d[f >> 0] | 0 | 0)) break;
          f = c[n >> 2] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          if ((f | 0) != (d[g >> 0] | 0 | 0)) break;
          g = c[n >> 2] | 0;
          f = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = f;
          if ((g | 0) != (d[f >> 0] | 0 | 0)) break;
          f = c[n >> 2] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          if ((f | 0) != (d[g >> 0] | 0 | 0)) break;
          g = c[n >> 2] | 0;
          f = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = f;
          if ((g | 0) != (d[f >> 0] | 0 | 0)) break;
          f = c[n >> 2] | 0;
          g = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = g;
          if ((f | 0) != (d[g >> 0] | 0 | 0)) break;
          g = c[n >> 2] | 0;
          f = (c[o >> 2] | 0) + 1 | 0;
          c[o >> 2] = f;
          if ((g | 0) != (d[f >> 0] | 0 | 0)) break;
        } while ((c[o >> 2] | 0) >>> 0 < (c[p >> 2] | 0) >>> 0);

        c[(c[k >> 2] | 0) + 96 >> 2] = 258 - ((c[p >> 2] | 0) - (c[o >> 2] | 0));
        if ((c[(c[k >> 2] | 0) + 96 >> 2] | 0) >>> 0 > (c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0) c[(c[k >> 2] | 0) + 96 >> 2] = c[(c[k >> 2] | 0) + 116 >> 2];
      }

      f = c[k >> 2] | 0;

      if ((c[(c[k >> 2] | 0) + 96 >> 2] | 0) >>> 0 >= 3) {
        a[q >> 0] = (c[f + 96 >> 2] | 0) - 3;
        b[r >> 1] = 1;
        b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = b[r >> 1] | 0;
        g = a[q >> 0] | 0;
        u = (c[k >> 2] | 0) + 5792 | 0;
        v = c[u >> 2] | 0;
        c[u >> 2] = v + 1;
        a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + v >> 0] = g;
        b[r >> 1] = (b[r >> 1] | 0) + -1 << 16 >> 16;
        g = (c[k >> 2] | 0) + 148 + ((d[14027 + (d[q >> 0] | 0) >> 0] | 0) + 256 + 1 << 2) | 0;
        b[g >> 1] = (b[g >> 1] | 0) + 1 << 16 >> 16;
        g = e[r >> 1] | 0;
        if ((e[r >> 1] | 0 | 0) < 256) w = a[13515 + g >> 0] | 0;else w = a[13515 + (256 + (g >> 7)) >> 0] | 0;
        g = (c[k >> 2] | 0) + 2440 + ((w & 255) << 2) | 0;
        b[g >> 1] = (b[g >> 1] | 0) + 1 << 16 >> 16;
        c[m >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
        g = (c[k >> 2] | 0) + 116 | 0;
        c[g >> 2] = (c[g >> 2] | 0) - (c[(c[k >> 2] | 0) + 96 >> 2] | 0);
        g = (c[k >> 2] | 0) + 108 | 0;
        c[g >> 2] = (c[g >> 2] | 0) + (c[(c[k >> 2] | 0) + 96 >> 2] | 0);
        c[(c[k >> 2] | 0) + 96 >> 2] = 0;
      } else {
        a[s >> 0] = a[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[f + 108 >> 2] | 0) >> 0] | 0;
        b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = 0;
        f = a[s >> 0] | 0;
        g = (c[k >> 2] | 0) + 5792 | 0;
        v = c[g >> 2] | 0;
        c[g >> 2] = v + 1;
        a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + v >> 0] = f;
        f = (c[k >> 2] | 0) + 148 + ((d[s >> 0] | 0) << 2) | 0;
        b[f >> 1] = (b[f >> 1] | 0) + 1 << 16 >> 16;
        c[m >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
        f = (c[k >> 2] | 0) + 116 | 0;
        c[f >> 2] = (c[f >> 2] | 0) + -1;
        f = (c[k >> 2] | 0) + 108 | 0;
        c[f >> 2] = (c[f >> 2] | 0) + 1;
      }

      if (!(c[m >> 2] | 0)) continue;
      if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) x = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else x = 0;
      wd(c[k >> 2] | 0, x, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
      c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
      Dd(c[c[k >> 2] >> 2] | 0);

      if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        t = 33;
        break;
      }
    }

    if ((t | 0) == 4) {
      c[j >> 2] = 0;
      y = c[j >> 2] | 0;
      i = h;
      return y | 0;
    } else if ((t | 0) == 33) {
      c[j >> 2] = 0;
      y = c[j >> 2] | 0;
      i = h;
      return y | 0;
    } else if ((t | 0) == 34) {
      if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) z = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else z = 0;
      wd(c[k >> 2] | 0, z, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, (c[l >> 2] | 0) == 4 & 1);
      c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
      Dd(c[c[k >> 2] >> 2] | 0);
      z = (c[l >> 2] | 0) == 4;

      if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        c[j >> 2] = z ? 2 : 0;
        y = c[j >> 2] | 0;
        i = h;
        return y | 0;
      } else {
        c[j >> 2] = z ? 3 : 1;
        y = c[j >> 2] | 0;
        i = h;
        return y | 0;
      }
    }

    return 0;
  }

  function Gd(a) {
    a = a | 0;
    var b = 0,
        d = 0;
    b = i;
    i = i + 16 | 0;
    d = b;
    c[d >> 2] = a;
    c[(c[d >> 2] | 0) + 76 >> 2] = 11302;
    c[(c[d >> 2] | 0) + 84 >> 2] = 9;
    c[(c[d >> 2] | 0) + 80 >> 2] = 13350;
    c[(c[d >> 2] | 0) + 88 >> 2] = 5;
    i = b;
    return;
  }

  function Hd(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0;
    d = i;
    i = i + 32 | 0;
    e = d + 20 | 0;
    f = d + 16 | 0;
    g = d + 12 | 0;
    h = d + 8 | 0;
    j = d + 4 | 0;
    k = d;
    c[f >> 2] = a;
    c[g >> 2] = b;
    c[h >> 2] = c[(c[f >> 2] | 0) + 28 >> 2];

    if ((c[(c[h >> 2] | 0) + 52 >> 2] | 0) == 0 ? (b = ea(c[(c[f >> 2] | 0) + 32 >> 2] | 0, c[(c[f >> 2] | 0) + 40 >> 2] | 0, 1 << c[(c[h >> 2] | 0) + 36 >> 2] | 0, 1) | 0, c[(c[h >> 2] | 0) + 52 >> 2] = b, (c[(c[h >> 2] | 0) + 52 >> 2] | 0) == 0) : 0) {
      c[e >> 2] = 1;
      l = c[e >> 2] | 0;
      i = d;
      return l | 0;
    }

    if (!(c[(c[h >> 2] | 0) + 40 >> 2] | 0)) {
      c[(c[h >> 2] | 0) + 40 >> 2] = 1 << c[(c[h >> 2] | 0) + 36 >> 2];
      c[(c[h >> 2] | 0) + 48 >> 2] = 0;
      c[(c[h >> 2] | 0) + 44 >> 2] = 0;
    }

    c[j >> 2] = (c[g >> 2] | 0) - (c[(c[f >> 2] | 0) + 16 >> 2] | 0);
    g = c[h >> 2] | 0;

    do if ((c[j >> 2] | 0) >>> 0 < (c[(c[h >> 2] | 0) + 40 >> 2] | 0) >>> 0) {
      c[k >> 2] = (c[g + 40 >> 2] | 0) - (c[(c[h >> 2] | 0) + 48 >> 2] | 0);
      if ((c[k >> 2] | 0) >>> 0 > (c[j >> 2] | 0) >>> 0) c[k >> 2] = c[j >> 2];
      af((c[(c[h >> 2] | 0) + 52 >> 2] | 0) + (c[(c[h >> 2] | 0) + 48 >> 2] | 0) | 0, (c[(c[f >> 2] | 0) + 12 >> 2] | 0) + (0 - (c[j >> 2] | 0)) | 0, c[k >> 2] | 0) | 0;
      c[j >> 2] = (c[j >> 2] | 0) - (c[k >> 2] | 0);

      if (c[j >> 2] | 0) {
        af(c[(c[h >> 2] | 0) + 52 >> 2] | 0, (c[(c[f >> 2] | 0) + 12 >> 2] | 0) + (0 - (c[j >> 2] | 0)) | 0, c[j >> 2] | 0) | 0;
        c[(c[h >> 2] | 0) + 48 >> 2] = c[j >> 2];
        c[(c[h >> 2] | 0) + 44 >> 2] = c[(c[h >> 2] | 0) + 40 >> 2];
        break;
      }

      b = (c[h >> 2] | 0) + 48 | 0;
      c[b >> 2] = (c[b >> 2] | 0) + (c[k >> 2] | 0);
      if ((c[(c[h >> 2] | 0) + 48 >> 2] | 0) == (c[(c[h >> 2] | 0) + 40 >> 2] | 0)) c[(c[h >> 2] | 0) + 48 >> 2] = 0;

      if ((c[(c[h >> 2] | 0) + 44 >> 2] | 0) >>> 0 < (c[(c[h >> 2] | 0) + 40 >> 2] | 0) >>> 0) {
        b = (c[h >> 2] | 0) + 44 | 0;
        c[b >> 2] = (c[b >> 2] | 0) + (c[k >> 2] | 0);
      }
    } else {
      af(c[g + 52 >> 2] | 0, (c[(c[f >> 2] | 0) + 12 >> 2] | 0) + (0 - (c[(c[h >> 2] | 0) + 40 >> 2] | 0)) | 0, c[(c[h >> 2] | 0) + 40 >> 2] | 0) | 0;
      c[(c[h >> 2] | 0) + 48 >> 2] = 0;
      c[(c[h >> 2] | 0) + 44 >> 2] = c[(c[h >> 2] | 0) + 40 >> 2];
    } while (0);

    c[e >> 2] = 0;
    l = c[e >> 2] | 0;
    i = d;
    return l | 0;
  }

  function Id() {
    return;
  }

  function Jd(a) {
    a = a | 0;
    var d = 0,
        e = 0,
        f = 0;
    d = i;
    i = i + 16 | 0;
    e = d + 4 | 0;
    f = d;
    c[e >> 2] = a;
    c[f >> 2] = 0;

    while (1) {
      if ((c[f >> 2] | 0) >= 286) break;
      b[(c[e >> 2] | 0) + 148 + (c[f >> 2] << 2) >> 1] = 0;
      c[f >> 2] = (c[f >> 2] | 0) + 1;
    }

    c[f >> 2] = 0;

    while (1) {
      if ((c[f >> 2] | 0) >= 30) break;
      b[(c[e >> 2] | 0) + 2440 + (c[f >> 2] << 2) >> 1] = 0;
      c[f >> 2] = (c[f >> 2] | 0) + 1;
    }

    c[f >> 2] = 0;

    while (1) {
      if ((c[f >> 2] | 0) >= 19) break;
      b[(c[e >> 2] | 0) + 2684 + (c[f >> 2] << 2) >> 1] = 0;
      c[f >> 2] = (c[f >> 2] | 0) + 1;
    }

    b[(c[e >> 2] | 0) + 148 + 1024 >> 1] = 1;
    c[(c[e >> 2] | 0) + 5804 >> 2] = 0;
    c[(c[e >> 2] | 0) + 5800 >> 2] = 0;
    c[(c[e >> 2] | 0) + 5808 >> 2] = 0;
    c[(c[e >> 2] | 0) + 5792 >> 2] = 0;
    i = d;
    return;
  }

  function Kd(b, d, e, f) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0;
    g = i;
    i = i + 16 | 0;
    h = g + 12 | 0;
    j = g + 8 | 0;
    k = g + 4 | 0;
    l = g;
    c[h >> 2] = b;
    c[j >> 2] = d;
    c[k >> 2] = e;
    c[l >> 2] = f;
    Rd(c[h >> 2] | 0);
    c[(c[h >> 2] | 0) + 5812 >> 2] = 8;

    if (c[l >> 2] | 0) {
      l = c[k >> 2] & 255;
      f = (c[h >> 2] | 0) + 20 | 0;
      e = c[f >> 2] | 0;
      c[f >> 2] = e + 1;
      a[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = l;
      l = (c[k >> 2] & 65535) >> 8 & 255;
      e = (c[h >> 2] | 0) + 20 | 0;
      f = c[e >> 2] | 0;
      c[e >> 2] = f + 1;
      a[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = l;
      l = ~c[k >> 2] & 255;
      f = (c[h >> 2] | 0) + 20 | 0;
      e = c[f >> 2] | 0;
      c[f >> 2] = e + 1;
      a[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = l;
      l = (~c[k >> 2] & 65535) >> 8 & 255;
      e = (c[h >> 2] | 0) + 20 | 0;
      f = c[e >> 2] | 0;
      c[e >> 2] = f + 1;
      a[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = l;
    }

    while (1) {
      l = c[k >> 2] | 0;
      c[k >> 2] = l + -1;
      if (!l) break;
      l = c[j >> 2] | 0;
      c[j >> 2] = l + 1;
      f = a[l >> 0] | 0;
      l = (c[h >> 2] | 0) + 20 | 0;
      e = c[l >> 2] | 0;
      c[l >> 2] = e + 1;
      a[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + e >> 0] = f;
    }

    i = g;
    return;
  }

  function Ld(d) {
    d = d | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0;
    f = i;
    i = i + 16 | 0;
    g = f;
    c[g >> 2] = d;
    d = c[g >> 2] | 0;

    if ((c[(c[g >> 2] | 0) + 5820 >> 2] | 0) == 16) {
      h = (e[d + 5816 >> 1] | 0) & 255;
      j = (c[g >> 2] | 0) + 20 | 0;
      k = c[j >> 2] | 0;
      c[j >> 2] = k + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + k >> 0] = h;
      h = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      k = (c[g >> 2] | 0) + 20 | 0;
      j = c[k >> 2] | 0;
      c[k >> 2] = j + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + j >> 0] = h;
      b[(c[g >> 2] | 0) + 5816 >> 1] = 0;
      c[(c[g >> 2] | 0) + 5820 >> 2] = 0;
      i = f;
      return;
    }

    if ((c[d + 5820 >> 2] | 0) < 8) {
      i = f;
      return;
    }

    d = b[(c[g >> 2] | 0) + 5816 >> 1] & 255;
    h = (c[g >> 2] | 0) + 20 | 0;
    j = c[h >> 2] | 0;
    c[h >> 2] = j + 1;
    a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + j >> 0] = d;
    d = (c[g >> 2] | 0) + 5816 | 0;
    b[d >> 1] = (e[d >> 1] | 0) >> 8;
    d = (c[g >> 2] | 0) + 5820 | 0;
    c[d >> 2] = (c[d >> 2] | 0) - 8;
    i = f;
    return;
  }

  function Md(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0;
    b = i;
    i = i + 16 | 0;
    d = b + 12 | 0;
    f = b + 8 | 0;
    g = b + 4 | 0;
    h = b;
    c[f >> 2] = a;
    c[g >> 2] = -201342849;
    c[h >> 2] = 0;

    while (1) {
      if ((c[h >> 2] | 0) > 31) break;

      if ((c[g >> 2] & 1 | 0) != 0 ? (e[(c[f >> 2] | 0) + 148 + (c[h >> 2] << 2) >> 1] | 0 | 0) != 0 : 0) {
        j = 5;
        break;
      }

      c[h >> 2] = (c[h >> 2] | 0) + 1;
      c[g >> 2] = (c[g >> 2] | 0) >>> 1;
    }

    if ((j | 0) == 5) {
      c[d >> 2] = 0;
      k = c[d >> 2] | 0;
      i = b;
      return k | 0;
    }

    if (((e[(c[f >> 2] | 0) + 148 + 36 >> 1] | 0 | 0) == 0 ? (e[(c[f >> 2] | 0) + 148 + 40 >> 1] | 0 | 0) == 0 : 0) ? (e[(c[f >> 2] | 0) + 148 + 52 >> 1] | 0 | 0) == 0 : 0) {
      c[h >> 2] = 32;

      while (1) {
        if ((c[h >> 2] | 0) >= 256) {
          j = 16;
          break;
        }

        if (e[(c[f >> 2] | 0) + 148 + (c[h >> 2] << 2) >> 1] | 0) {
          j = 14;
          break;
        }

        c[h >> 2] = (c[h >> 2] | 0) + 1;
      }

      if ((j | 0) == 14) {
        c[d >> 2] = 1;
        k = c[d >> 2] | 0;
        i = b;
        return k | 0;
      } else if ((j | 0) == 16) {
        c[d >> 2] = 0;
        k = c[d >> 2] | 0;
        i = b;
        return k | 0;
      }
    }

    c[d >> 2] = 1;
    k = c[d >> 2] | 0;
    i = b;
    return k | 0;
  }

  function Nd(f, g) {
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0;
    h = i;
    i = i + 48 | 0;
    j = h + 32 | 0;
    k = h + 28 | 0;
    l = h + 24 | 0;
    m = h + 20 | 0;
    n = h + 16 | 0;
    o = h + 12 | 0;
    p = h + 8 | 0;
    q = h + 4 | 0;
    r = h;
    c[j >> 2] = f;
    c[k >> 2] = g;
    c[l >> 2] = c[c[k >> 2] >> 2];
    c[m >> 2] = c[c[(c[k >> 2] | 0) + 8 >> 2] >> 2];
    c[n >> 2] = c[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + 12 >> 2];
    c[q >> 2] = -1;
    c[(c[j >> 2] | 0) + 5200 >> 2] = 0;
    c[(c[j >> 2] | 0) + 5204 >> 2] = 573;
    c[o >> 2] = 0;

    while (1) {
      if ((c[o >> 2] | 0) >= (c[n >> 2] | 0)) break;
      g = c[o >> 2] | 0;

      if (e[(c[l >> 2] | 0) + (c[o >> 2] << 2) >> 1] | 0) {
        c[q >> 2] = g;
        f = (c[j >> 2] | 0) + 5200 | 0;
        s = (c[f >> 2] | 0) + 1 | 0;
        c[f >> 2] = s;
        c[(c[j >> 2] | 0) + 2908 + (s << 2) >> 2] = g;
        a[(c[j >> 2] | 0) + 5208 + (c[o >> 2] | 0) >> 0] = 0;
      } else b[(c[l >> 2] | 0) + (g << 2) + 2 >> 1] = 0;

      c[o >> 2] = (c[o >> 2] | 0) + 1;
    }

    while (1) {
      t = c[q >> 2] | 0;
      if ((c[(c[j >> 2] | 0) + 5200 >> 2] | 0) >= 2) break;

      if ((t | 0) < 2) {
        g = (c[q >> 2] | 0) + 1 | 0;
        c[q >> 2] = g;
        u = g;
      } else u = 0;

      g = (c[j >> 2] | 0) + 5200 | 0;
      s = (c[g >> 2] | 0) + 1 | 0;
      c[g >> 2] = s;
      c[(c[j >> 2] | 0) + 2908 + (s << 2) >> 2] = u;
      c[r >> 2] = u;
      b[(c[l >> 2] | 0) + (c[r >> 2] << 2) >> 1] = 1;
      a[(c[j >> 2] | 0) + 5208 + (c[r >> 2] | 0) >> 0] = 0;
      s = (c[j >> 2] | 0) + 5800 | 0;
      c[s >> 2] = (c[s >> 2] | 0) + -1;
      if (!(c[m >> 2] | 0)) continue;
      s = (c[j >> 2] | 0) + 5804 | 0;
      c[s >> 2] = (c[s >> 2] | 0) - (e[(c[m >> 2] | 0) + (c[r >> 2] << 2) + 2 >> 1] | 0);
    }

    c[(c[k >> 2] | 0) + 4 >> 2] = t;
    c[o >> 2] = (c[(c[j >> 2] | 0) + 5200 >> 2] | 0) / 2 | 0;

    while (1) {
      if ((c[o >> 2] | 0) < 1) break;
      Ud(c[j >> 2] | 0, c[l >> 2] | 0, c[o >> 2] | 0);
      c[o >> 2] = (c[o >> 2] | 0) + -1;
    }

    c[r >> 2] = c[n >> 2];

    do {
      c[o >> 2] = c[(c[j >> 2] | 0) + 2908 + 4 >> 2];
      n = (c[j >> 2] | 0) + 5200 | 0;
      t = c[n >> 2] | 0;
      c[n >> 2] = t + -1;
      c[(c[j >> 2] | 0) + 2908 + 4 >> 2] = c[(c[j >> 2] | 0) + 2908 + (t << 2) >> 2];
      Ud(c[j >> 2] | 0, c[l >> 2] | 0, 1);
      c[p >> 2] = c[(c[j >> 2] | 0) + 2908 + 4 >> 2];
      t = c[o >> 2] | 0;
      n = (c[j >> 2] | 0) + 5204 | 0;
      m = (c[n >> 2] | 0) + -1 | 0;
      c[n >> 2] = m;
      c[(c[j >> 2] | 0) + 2908 + (m << 2) >> 2] = t;
      t = c[p >> 2] | 0;
      m = (c[j >> 2] | 0) + 5204 | 0;
      n = (c[m >> 2] | 0) + -1 | 0;
      c[m >> 2] = n;
      c[(c[j >> 2] | 0) + 2908 + (n << 2) >> 2] = t;
      b[(c[l >> 2] | 0) + (c[r >> 2] << 2) >> 1] = (e[(c[l >> 2] | 0) + (c[o >> 2] << 2) >> 1] | 0) + (e[(c[l >> 2] | 0) + (c[p >> 2] << 2) >> 1] | 0);
      if ((d[(c[j >> 2] | 0) + 5208 + (c[o >> 2] | 0) >> 0] | 0 | 0) >= (d[(c[j >> 2] | 0) + 5208 + (c[p >> 2] | 0) >> 0] | 0 | 0)) v = a[(c[j >> 2] | 0) + 5208 + (c[o >> 2] | 0) >> 0] | 0;else v = a[(c[j >> 2] | 0) + 5208 + (c[p >> 2] | 0) >> 0] | 0;
      a[(c[j >> 2] | 0) + 5208 + (c[r >> 2] | 0) >> 0] = (v & 255) + 1;
      t = c[r >> 2] & 65535;
      b[(c[l >> 2] | 0) + (c[p >> 2] << 2) + 2 >> 1] = t;
      b[(c[l >> 2] | 0) + (c[o >> 2] << 2) + 2 >> 1] = t;
      t = c[r >> 2] | 0;
      c[r >> 2] = t + 1;
      c[(c[j >> 2] | 0) + 2908 + 4 >> 2] = t;
      Ud(c[j >> 2] | 0, c[l >> 2] | 0, 1);
    } while ((c[(c[j >> 2] | 0) + 5200 >> 2] | 0) >= 2);

    r = c[(c[j >> 2] | 0) + 2908 + 4 >> 2] | 0;
    o = (c[j >> 2] | 0) + 5204 | 0;
    p = (c[o >> 2] | 0) + -1 | 0;
    c[o >> 2] = p;
    c[(c[j >> 2] | 0) + 2908 + (p << 2) >> 2] = r;
    Vd(c[j >> 2] | 0, c[k >> 2] | 0);
    Wd(c[l >> 2] | 0, c[q >> 2] | 0, (c[j >> 2] | 0) + 2876 | 0);
    i = h;
    return;
  }

  function Od(a) {
    a = a | 0;
    var b = 0,
        f = 0,
        g = 0;
    b = i;
    i = i + 16 | 0;
    f = b + 4 | 0;
    g = b;
    c[f >> 2] = a;
    Td(c[f >> 2] | 0, (c[f >> 2] | 0) + 148 | 0, c[(c[f >> 2] | 0) + 2840 + 4 >> 2] | 0);
    Td(c[f >> 2] | 0, (c[f >> 2] | 0) + 2440 | 0, c[(c[f >> 2] | 0) + 2852 + 4 >> 2] | 0);
    Nd(c[f >> 2] | 0, (c[f >> 2] | 0) + 2864 | 0);
    c[g >> 2] = 18;

    while (1) {
      if ((c[g >> 2] | 0) < 3) break;
      if (e[(c[f >> 2] | 0) + 2684 + ((d[14867 + (c[g >> 2] | 0) >> 0] | 0) << 2) + 2 >> 1] | 0) break;
      c[g >> 2] = (c[g >> 2] | 0) + -1;
    }

    a = (c[f >> 2] | 0) + 5800 | 0;
    c[a >> 2] = (c[a >> 2] | 0) + ((((c[g >> 2] | 0) + 1 | 0) * 3 | 0) + 5 + 5 + 4);
    i = b;
    return c[g >> 2] | 0;
  }

  function Pd(f, g, h) {
    f = f | 0;
    g = g | 0;
    h = h | 0;
    var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0;
    j = i;
    i = i + 80 | 0;
    k = j + 76 | 0;
    l = j + 72 | 0;
    m = j + 68 | 0;
    n = j + 64 | 0;
    o = j + 60 | 0;
    p = j + 56 | 0;
    q = j + 52 | 0;
    r = j + 48 | 0;
    s = j + 44 | 0;
    t = j + 40 | 0;
    u = j + 36 | 0;
    v = j + 32 | 0;
    w = j + 28 | 0;
    x = j + 24 | 0;
    y = j + 20 | 0;
    z = j + 16 | 0;
    A = j + 12 | 0;
    B = j + 8 | 0;
    C = j + 4 | 0;
    D = j;
    c[k >> 2] = f;
    c[l >> 2] = g;
    c[m >> 2] = h;
    c[p >> 2] = 0;
    if (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) do {
      c[n >> 2] = e[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[p >> 2] << 1) >> 1];
      h = c[p >> 2] | 0;
      c[p >> 2] = h + 1;
      c[o >> 2] = d[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + h >> 0];
      h = c[o >> 2] | 0;

      do if (!(c[n >> 2] | 0)) {
        c[s >> 2] = e[(c[l >> 2] | 0) + (h << 2) + 2 >> 1];
        g = e[(c[l >> 2] | 0) + (c[o >> 2] << 2) >> 1] | 0;

        if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[s >> 2] | 0) | 0)) {
          c[t >> 2] = g;
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | (c[t >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
          E = (c[k >> 2] | 0) + 20 | 0;
          F = c[E >> 2] | 0;
          c[E >> 2] = F + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + F >> 0] = f;
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
          F = (c[k >> 2] | 0) + 20 | 0;
          E = c[F >> 2] | 0;
          c[F >> 2] = E + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + E >> 0] = f;
          b[(c[k >> 2] | 0) + 5816 >> 1] = (c[t >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
          f = (c[k >> 2] | 0) + 5820 | 0;
          c[f >> 2] = (c[f >> 2] | 0) + ((c[s >> 2] | 0) - 16);
          break;
        } else {
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | g << c[(c[k >> 2] | 0) + 5820 >> 2];
          g = (c[k >> 2] | 0) + 5820 | 0;
          c[g >> 2] = (c[g >> 2] | 0) + (c[s >> 2] | 0);
          break;
        }
      } else {
        c[q >> 2] = d[14027 + h >> 0];
        c[u >> 2] = e[(c[l >> 2] | 0) + ((c[q >> 2] | 0) + 256 + 1 << 2) + 2 >> 1];
        g = e[(c[l >> 2] | 0) + ((c[q >> 2] | 0) + 256 + 1 << 2) >> 1] | 0;

        if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[u >> 2] | 0) | 0)) {
          c[v >> 2] = g;
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | (c[v >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
          E = (c[k >> 2] | 0) + 20 | 0;
          F = c[E >> 2] | 0;
          c[E >> 2] = F + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + F >> 0] = f;
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
          F = (c[k >> 2] | 0) + 20 | 0;
          E = c[F >> 2] | 0;
          c[F >> 2] = E + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + E >> 0] = f;
          b[(c[k >> 2] | 0) + 5816 >> 1] = (c[v >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
          f = (c[k >> 2] | 0) + 5820 | 0;
          c[f >> 2] = (c[f >> 2] | 0) + ((c[u >> 2] | 0) - 16);
        } else {
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | g << c[(c[k >> 2] | 0) + 5820 >> 2];
          g = (c[k >> 2] | 0) + 5820 | 0;
          c[g >> 2] = (c[g >> 2] | 0) + (c[u >> 2] | 0);
        }

        c[r >> 2] = c[8420 + (c[q >> 2] << 2) >> 2];

        do if (c[r >> 2] | 0) {
          c[o >> 2] = (c[o >> 2] | 0) - (c[8536 + (c[q >> 2] << 2) >> 2] | 0);
          c[w >> 2] = c[r >> 2];
          g = c[o >> 2] | 0;

          if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[w >> 2] | 0) | 0)) {
            c[x >> 2] = g;
            f = (c[k >> 2] | 0) + 5816 | 0;
            b[f >> 1] = e[f >> 1] | 0 | (c[x >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
            f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
            E = (c[k >> 2] | 0) + 20 | 0;
            F = c[E >> 2] | 0;
            c[E >> 2] = F + 1;
            a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + F >> 0] = f;
            f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
            F = (c[k >> 2] | 0) + 20 | 0;
            E = c[F >> 2] | 0;
            c[F >> 2] = E + 1;
            a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + E >> 0] = f;
            b[(c[k >> 2] | 0) + 5816 >> 1] = (c[x >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
            f = (c[k >> 2] | 0) + 5820 | 0;
            c[f >> 2] = (c[f >> 2] | 0) + ((c[w >> 2] | 0) - 16);
            break;
          } else {
            f = (c[k >> 2] | 0) + 5816 | 0;
            b[f >> 1] = e[f >> 1] | 0 | (g & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
            g = (c[k >> 2] | 0) + 5820 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[w >> 2] | 0);
            break;
          }
        } while (0);

        c[n >> 2] = (c[n >> 2] | 0) + -1;
        g = c[n >> 2] | 0;
        if ((c[n >> 2] | 0) >>> 0 < 256) G = a[13515 + g >> 0] | 0;else G = a[13515 + (256 + (g >>> 7)) >> 0] | 0;
        c[q >> 2] = G & 255;
        c[y >> 2] = e[(c[m >> 2] | 0) + (c[q >> 2] << 2) + 2 >> 1];
        g = e[(c[m >> 2] | 0) + (c[q >> 2] << 2) >> 1] | 0;

        if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[y >> 2] | 0) | 0)) {
          c[z >> 2] = g;
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | (c[z >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
          E = (c[k >> 2] | 0) + 20 | 0;
          F = c[E >> 2] | 0;
          c[E >> 2] = F + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + F >> 0] = f;
          f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
          F = (c[k >> 2] | 0) + 20 | 0;
          E = c[F >> 2] | 0;
          c[F >> 2] = E + 1;
          a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + E >> 0] = f;
          b[(c[k >> 2] | 0) + 5816 >> 1] = (c[z >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
          f = (c[k >> 2] | 0) + 5820 | 0;
          c[f >> 2] = (c[f >> 2] | 0) + ((c[y >> 2] | 0) - 16);
        } else {
          f = (c[k >> 2] | 0) + 5816 | 0;
          b[f >> 1] = e[f >> 1] | 0 | g << c[(c[k >> 2] | 0) + 5820 >> 2];
          g = (c[k >> 2] | 0) + 5820 | 0;
          c[g >> 2] = (c[g >> 2] | 0) + (c[y >> 2] | 0);
        }

        c[r >> 2] = c[8652 + (c[q >> 2] << 2) >> 2];

        if (c[r >> 2] | 0) {
          c[n >> 2] = (c[n >> 2] | 0) - (c[8772 + (c[q >> 2] << 2) >> 2] | 0);
          c[A >> 2] = c[r >> 2];
          g = c[n >> 2] | 0;

          if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[A >> 2] | 0) | 0)) {
            c[B >> 2] = g;
            f = (c[k >> 2] | 0) + 5816 | 0;
            b[f >> 1] = e[f >> 1] | 0 | (c[B >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
            f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
            E = (c[k >> 2] | 0) + 20 | 0;
            F = c[E >> 2] | 0;
            c[E >> 2] = F + 1;
            a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + F >> 0] = f;
            f = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
            F = (c[k >> 2] | 0) + 20 | 0;
            E = c[F >> 2] | 0;
            c[F >> 2] = E + 1;
            a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + E >> 0] = f;
            b[(c[k >> 2] | 0) + 5816 >> 1] = (c[B >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
            f = (c[k >> 2] | 0) + 5820 | 0;
            c[f >> 2] = (c[f >> 2] | 0) + ((c[A >> 2] | 0) - 16);
            break;
          } else {
            f = (c[k >> 2] | 0) + 5816 | 0;
            b[f >> 1] = e[f >> 1] | 0 | (g & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
            g = (c[k >> 2] | 0) + 5820 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[A >> 2] | 0);
            break;
          }
        }
      } while (0);
    } while ((c[p >> 2] | 0) >>> 0 < (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) >>> 0);
    c[C >> 2] = e[(c[l >> 2] | 0) + 1024 + 2 >> 1];
    p = e[(c[l >> 2] | 0) + 1024 >> 1] | 0;

    if ((c[(c[k >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[C >> 2] | 0) | 0)) {
      c[D >> 2] = p;
      A = (c[k >> 2] | 0) + 5816 | 0;
      b[A >> 1] = e[A >> 1] | 0 | (c[D >> 2] & 65535) << c[(c[k >> 2] | 0) + 5820 >> 2];
      A = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) & 255;
      B = (c[k >> 2] | 0) + 20 | 0;
      n = c[B >> 2] | 0;
      c[B >> 2] = n + 1;
      a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + n >> 0] = A;
      A = (e[(c[k >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      n = (c[k >> 2] | 0) + 20 | 0;
      B = c[n >> 2] | 0;
      c[n >> 2] = B + 1;
      a[(c[(c[k >> 2] | 0) + 8 >> 2] | 0) + B >> 0] = A;
      b[(c[k >> 2] | 0) + 5816 >> 1] = (c[D >> 2] & 65535) >> 16 - (c[(c[k >> 2] | 0) + 5820 >> 2] | 0);
      D = (c[k >> 2] | 0) + 5820 | 0;
      c[D >> 2] = (c[D >> 2] | 0) + ((c[C >> 2] | 0) - 16);
      H = c[l >> 2] | 0;
      I = H + 1024 | 0;
      J = I + 2 | 0;
      K = b[J >> 1] | 0;
      L = K & 65535;
      M = c[k >> 2] | 0;
      N = M + 5812 | 0;
      c[N >> 2] = L;
      i = j;
      return;
    } else {
      D = (c[k >> 2] | 0) + 5816 | 0;
      b[D >> 1] = e[D >> 1] | 0 | p << c[(c[k >> 2] | 0) + 5820 >> 2];
      p = (c[k >> 2] | 0) + 5820 | 0;
      c[p >> 2] = (c[p >> 2] | 0) + (c[C >> 2] | 0);
      H = c[l >> 2] | 0;
      I = H + 1024 | 0;
      J = I + 2 | 0;
      K = b[J >> 1] | 0;
      L = K & 65535;
      M = c[k >> 2] | 0;
      N = M + 5812 | 0;
      c[N >> 2] = L;
      i = j;
      return;
    }
  }

  function Qd(f, g, h, j) {
    f = f | 0;
    g = g | 0;
    h = h | 0;
    j = j | 0;
    var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0;
    k = i;
    i = i + 64 | 0;
    l = k + 48 | 0;
    m = k + 44 | 0;
    n = k + 40 | 0;
    o = k + 36 | 0;
    p = k + 32 | 0;
    q = k + 28 | 0;
    r = k + 24 | 0;
    s = k + 20 | 0;
    t = k + 16 | 0;
    u = k + 12 | 0;
    v = k + 8 | 0;
    w = k + 4 | 0;
    x = k;
    c[l >> 2] = f;
    c[m >> 2] = g;
    c[n >> 2] = h;
    c[o >> 2] = j;
    c[q >> 2] = 5;
    j = (c[m >> 2] | 0) - 257 | 0;

    if ((c[(c[l >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[q >> 2] | 0) | 0)) {
      c[r >> 2] = j;
      h = (c[l >> 2] | 0) + 5816 | 0;
      b[h >> 1] = e[h >> 1] | 0 | (c[r >> 2] & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
      h = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) & 255;
      g = (c[l >> 2] | 0) + 20 | 0;
      f = c[g >> 2] | 0;
      c[g >> 2] = f + 1;
      a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + f >> 0] = h;
      h = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      f = (c[l >> 2] | 0) + 20 | 0;
      g = c[f >> 2] | 0;
      c[f >> 2] = g + 1;
      a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + g >> 0] = h;
      b[(c[l >> 2] | 0) + 5816 >> 1] = (c[r >> 2] & 65535) >> 16 - (c[(c[l >> 2] | 0) + 5820 >> 2] | 0);
      r = (c[l >> 2] | 0) + 5820 | 0;
      c[r >> 2] = (c[r >> 2] | 0) + ((c[q >> 2] | 0) - 16);
    } else {
      r = (c[l >> 2] | 0) + 5816 | 0;
      b[r >> 1] = e[r >> 1] | 0 | (j & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
      j = (c[l >> 2] | 0) + 5820 | 0;
      c[j >> 2] = (c[j >> 2] | 0) + (c[q >> 2] | 0);
    }

    c[s >> 2] = 5;
    q = (c[n >> 2] | 0) - 1 | 0;

    if ((c[(c[l >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[s >> 2] | 0) | 0)) {
      c[t >> 2] = q;
      j = (c[l >> 2] | 0) + 5816 | 0;
      b[j >> 1] = e[j >> 1] | 0 | (c[t >> 2] & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
      j = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) & 255;
      r = (c[l >> 2] | 0) + 20 | 0;
      h = c[r >> 2] | 0;
      c[r >> 2] = h + 1;
      a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + h >> 0] = j;
      j = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      h = (c[l >> 2] | 0) + 20 | 0;
      r = c[h >> 2] | 0;
      c[h >> 2] = r + 1;
      a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + r >> 0] = j;
      b[(c[l >> 2] | 0) + 5816 >> 1] = (c[t >> 2] & 65535) >> 16 - (c[(c[l >> 2] | 0) + 5820 >> 2] | 0);
      t = (c[l >> 2] | 0) + 5820 | 0;
      c[t >> 2] = (c[t >> 2] | 0) + ((c[s >> 2] | 0) - 16);
    } else {
      t = (c[l >> 2] | 0) + 5816 | 0;
      b[t >> 1] = e[t >> 1] | 0 | (q & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
      q = (c[l >> 2] | 0) + 5820 | 0;
      c[q >> 2] = (c[q >> 2] | 0) + (c[s >> 2] | 0);
    }

    c[u >> 2] = 4;
    s = (c[o >> 2] | 0) - 4 | 0;

    if ((c[(c[l >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[u >> 2] | 0) | 0)) {
      c[v >> 2] = s;
      q = (c[l >> 2] | 0) + 5816 | 0;
      b[q >> 1] = e[q >> 1] | 0 | (c[v >> 2] & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
      q = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) & 255;
      t = (c[l >> 2] | 0) + 20 | 0;
      j = c[t >> 2] | 0;
      c[t >> 2] = j + 1;
      a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + j >> 0] = q;
      q = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      j = (c[l >> 2] | 0) + 20 | 0;
      t = c[j >> 2] | 0;
      c[j >> 2] = t + 1;
      a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + t >> 0] = q;
      b[(c[l >> 2] | 0) + 5816 >> 1] = (c[v >> 2] & 65535) >> 16 - (c[(c[l >> 2] | 0) + 5820 >> 2] | 0);
      v = (c[l >> 2] | 0) + 5820 | 0;
      c[v >> 2] = (c[v >> 2] | 0) + ((c[u >> 2] | 0) - 16);
    } else {
      v = (c[l >> 2] | 0) + 5816 | 0;
      b[v >> 1] = e[v >> 1] | 0 | (s & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
      s = (c[l >> 2] | 0) + 5820 | 0;
      c[s >> 2] = (c[s >> 2] | 0) + (c[u >> 2] | 0);
    }

    c[p >> 2] = 0;

    while (1) {
      if ((c[p >> 2] | 0) >= (c[o >> 2] | 0)) break;
      c[w >> 2] = 3;
      u = e[(c[l >> 2] | 0) + 2684 + ((d[14867 + (c[p >> 2] | 0) >> 0] | 0) << 2) + 2 >> 1] | 0;

      if ((c[(c[l >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[w >> 2] | 0) | 0)) {
        c[x >> 2] = u;
        s = (c[l >> 2] | 0) + 5816 | 0;
        b[s >> 1] = e[s >> 1] | 0 | (c[x >> 2] & 65535) << c[(c[l >> 2] | 0) + 5820 >> 2];
        s = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) & 255;
        v = (c[l >> 2] | 0) + 20 | 0;
        q = c[v >> 2] | 0;
        c[v >> 2] = q + 1;
        a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + q >> 0] = s;
        s = (e[(c[l >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
        q = (c[l >> 2] | 0) + 20 | 0;
        v = c[q >> 2] | 0;
        c[q >> 2] = v + 1;
        a[(c[(c[l >> 2] | 0) + 8 >> 2] | 0) + v >> 0] = s;
        b[(c[l >> 2] | 0) + 5816 >> 1] = (c[x >> 2] & 65535) >> 16 - (c[(c[l >> 2] | 0) + 5820 >> 2] | 0);
        s = (c[l >> 2] | 0) + 5820 | 0;
        c[s >> 2] = (c[s >> 2] | 0) + ((c[w >> 2] | 0) - 16);
      } else {
        s = (c[l >> 2] | 0) + 5816 | 0;
        b[s >> 1] = e[s >> 1] | 0 | u << c[(c[l >> 2] | 0) + 5820 >> 2];
        u = (c[l >> 2] | 0) + 5820 | 0;
        c[u >> 2] = (c[u >> 2] | 0) + (c[w >> 2] | 0);
      }

      c[p >> 2] = (c[p >> 2] | 0) + 1;
    }

    Sd(c[l >> 2] | 0, (c[l >> 2] | 0) + 148 | 0, (c[m >> 2] | 0) - 1 | 0);
    Sd(c[l >> 2] | 0, (c[l >> 2] | 0) + 2440 | 0, (c[n >> 2] | 0) - 1 | 0);
    i = k;
    return;
  }

  function Rd(d) {
    d = d | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0;
    f = i;
    i = i + 16 | 0;
    g = f;
    c[g >> 2] = d;
    d = c[g >> 2] | 0;

    if ((c[(c[g >> 2] | 0) + 5820 >> 2] | 0) <= 8) {
      if ((c[d + 5820 >> 2] | 0) > 0) {
        h = b[(c[g >> 2] | 0) + 5816 >> 1] & 255;
        j = (c[g >> 2] | 0) + 20 | 0;
        k = c[j >> 2] | 0;
        c[j >> 2] = k + 1;
        a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + k >> 0] = h;
      }
    } else {
      h = (e[d + 5816 >> 1] | 0) & 255;
      d = (c[g >> 2] | 0) + 20 | 0;
      k = c[d >> 2] | 0;
      c[d >> 2] = k + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + k >> 0] = h;
      h = (e[(c[g >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
      k = (c[g >> 2] | 0) + 20 | 0;
      d = c[k >> 2] | 0;
      c[k >> 2] = d + 1;
      a[(c[(c[g >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = h;
    }

    b[(c[g >> 2] | 0) + 5816 >> 1] = 0;
    c[(c[g >> 2] | 0) + 5820 >> 2] = 0;
    i = f;
    return;
  }

  function Sd(d, f, g) {
    d = d | 0;
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0;
    h = i;
    i = i + 112 | 0;
    j = h + 100 | 0;
    k = h + 96 | 0;
    l = h + 92 | 0;
    m = h + 88 | 0;
    n = h + 84 | 0;
    o = h + 80 | 0;
    p = h + 76 | 0;
    q = h + 72 | 0;
    r = h + 68 | 0;
    s = h + 64 | 0;
    t = h + 60 | 0;
    u = h + 56 | 0;
    v = h + 52 | 0;
    w = h + 48 | 0;
    x = h + 44 | 0;
    y = h + 40 | 0;
    z = h + 36 | 0;
    A = h + 32 | 0;
    B = h + 28 | 0;
    C = h + 24 | 0;
    D = h + 20 | 0;
    E = h + 16 | 0;
    F = h + 12 | 0;
    G = h + 8 | 0;
    H = h + 4 | 0;
    I = h;
    c[j >> 2] = d;
    c[k >> 2] = f;
    c[l >> 2] = g;
    c[n >> 2] = -1;
    c[p >> 2] = e[(c[k >> 2] | 0) + 2 >> 1];
    c[q >> 2] = 0;
    c[r >> 2] = 7;
    c[s >> 2] = 4;

    if (!(c[p >> 2] | 0)) {
      c[r >> 2] = 138;
      c[s >> 2] = 3;
    }

    c[m >> 2] = 0;

    while (1) {
      if ((c[m >> 2] | 0) > (c[l >> 2] | 0)) break;
      c[o >> 2] = c[p >> 2];
      c[p >> 2] = e[(c[k >> 2] | 0) + ((c[m >> 2] | 0) + 1 << 2) + 2 >> 1];
      g = (c[q >> 2] | 0) + 1 | 0;
      c[q >> 2] = g;
      if (!((g | 0) < (c[r >> 2] | 0) ? (c[o >> 2] | 0) == (c[p >> 2] | 0) : 0)) J = 7;

      do if ((J | 0) == 7) {
        J = 0;

        do if ((c[q >> 2] | 0) >= (c[s >> 2] | 0)) {
          if (c[o >> 2] | 0) {
            if ((c[o >> 2] | 0) != (c[n >> 2] | 0)) {
              c[v >> 2] = e[(c[j >> 2] | 0) + 2684 + (c[o >> 2] << 2) + 2 >> 1];
              g = e[(c[j >> 2] | 0) + 2684 + (c[o >> 2] << 2) >> 1] | 0;

              if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[v >> 2] | 0) | 0)) {
                c[w >> 2] = g;
                f = (c[j >> 2] | 0) + 5816 | 0;
                b[f >> 1] = e[f >> 1] | 0 | (c[w >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
                f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
                d = (c[j >> 2] | 0) + 20 | 0;
                K = c[d >> 2] | 0;
                c[d >> 2] = K + 1;
                a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = f;
                f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
                K = (c[j >> 2] | 0) + 20 | 0;
                d = c[K >> 2] | 0;
                c[K >> 2] = d + 1;
                a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
                b[(c[j >> 2] | 0) + 5816 >> 1] = (c[w >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
                f = (c[j >> 2] | 0) + 5820 | 0;
                c[f >> 2] = (c[f >> 2] | 0) + ((c[v >> 2] | 0) - 16);
              } else {
                f = (c[j >> 2] | 0) + 5816 | 0;
                b[f >> 1] = e[f >> 1] | 0 | g << c[(c[j >> 2] | 0) + 5820 >> 2];
                g = (c[j >> 2] | 0) + 5820 | 0;
                c[g >> 2] = (c[g >> 2] | 0) + (c[v >> 2] | 0);
              }

              c[q >> 2] = (c[q >> 2] | 0) + -1;
            }

            c[x >> 2] = e[(c[j >> 2] | 0) + 2684 + 64 + 2 >> 1];
            g = e[(c[j >> 2] | 0) + 2684 + 64 >> 1] | 0;

            if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[x >> 2] | 0) | 0)) {
              c[y >> 2] = g;
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | (c[y >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
              d = (c[j >> 2] | 0) + 20 | 0;
              K = c[d >> 2] | 0;
              c[d >> 2] = K + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = f;
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
              K = (c[j >> 2] | 0) + 20 | 0;
              d = c[K >> 2] | 0;
              c[K >> 2] = d + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
              b[(c[j >> 2] | 0) + 5816 >> 1] = (c[y >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
              f = (c[j >> 2] | 0) + 5820 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + ((c[x >> 2] | 0) - 16);
            } else {
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | g << c[(c[j >> 2] | 0) + 5820 >> 2];
              g = (c[j >> 2] | 0) + 5820 | 0;
              c[g >> 2] = (c[g >> 2] | 0) + (c[x >> 2] | 0);
            }

            c[z >> 2] = 2;
            g = (c[q >> 2] | 0) - 3 | 0;

            if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[z >> 2] | 0) | 0)) {
              c[A >> 2] = g;
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | (c[A >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
              d = (c[j >> 2] | 0) + 20 | 0;
              K = c[d >> 2] | 0;
              c[d >> 2] = K + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = f;
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
              K = (c[j >> 2] | 0) + 20 | 0;
              d = c[K >> 2] | 0;
              c[K >> 2] = d + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
              b[(c[j >> 2] | 0) + 5816 >> 1] = (c[A >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
              f = (c[j >> 2] | 0) + 5820 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + ((c[z >> 2] | 0) - 16);
              break;
            } else {
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | (g & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              g = (c[j >> 2] | 0) + 5820 | 0;
              c[g >> 2] = (c[g >> 2] | 0) + (c[z >> 2] | 0);
              break;
            }
          }

          g = (c[j >> 2] | 0) + 2684 | 0;

          if ((c[q >> 2] | 0) <= 10) {
            c[B >> 2] = e[g + 68 + 2 >> 1];
            f = e[(c[j >> 2] | 0) + 2684 + 68 >> 1] | 0;

            if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[B >> 2] | 0) | 0)) {
              c[C >> 2] = f;
              d = (c[j >> 2] | 0) + 5816 | 0;
              b[d >> 1] = e[d >> 1] | 0 | (c[C >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              d = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
              K = (c[j >> 2] | 0) + 20 | 0;
              L = c[K >> 2] | 0;
              c[K >> 2] = L + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + L >> 0] = d;
              d = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
              L = (c[j >> 2] | 0) + 20 | 0;
              K = c[L >> 2] | 0;
              c[L >> 2] = K + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = d;
              b[(c[j >> 2] | 0) + 5816 >> 1] = (c[C >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
              d = (c[j >> 2] | 0) + 5820 | 0;
              c[d >> 2] = (c[d >> 2] | 0) + ((c[B >> 2] | 0) - 16);
            } else {
              d = (c[j >> 2] | 0) + 5816 | 0;
              b[d >> 1] = e[d >> 1] | 0 | f << c[(c[j >> 2] | 0) + 5820 >> 2];
              f = (c[j >> 2] | 0) + 5820 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + (c[B >> 2] | 0);
            }

            c[D >> 2] = 3;
            f = (c[q >> 2] | 0) - 3 | 0;

            if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[D >> 2] | 0) | 0)) {
              c[E >> 2] = f;
              d = (c[j >> 2] | 0) + 5816 | 0;
              b[d >> 1] = e[d >> 1] | 0 | (c[E >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              d = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
              K = (c[j >> 2] | 0) + 20 | 0;
              L = c[K >> 2] | 0;
              c[K >> 2] = L + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + L >> 0] = d;
              d = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
              L = (c[j >> 2] | 0) + 20 | 0;
              K = c[L >> 2] | 0;
              c[L >> 2] = K + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = d;
              b[(c[j >> 2] | 0) + 5816 >> 1] = (c[E >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
              d = (c[j >> 2] | 0) + 5820 | 0;
              c[d >> 2] = (c[d >> 2] | 0) + ((c[D >> 2] | 0) - 16);
              break;
            } else {
              d = (c[j >> 2] | 0) + 5816 | 0;
              b[d >> 1] = e[d >> 1] | 0 | (f & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              f = (c[j >> 2] | 0) + 5820 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + (c[D >> 2] | 0);
              break;
            }
          } else {
            c[F >> 2] = e[g + 72 + 2 >> 1];
            g = e[(c[j >> 2] | 0) + 2684 + 72 >> 1] | 0;

            if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[F >> 2] | 0) | 0)) {
              c[G >> 2] = g;
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | (c[G >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
              d = (c[j >> 2] | 0) + 20 | 0;
              K = c[d >> 2] | 0;
              c[d >> 2] = K + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = f;
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
              K = (c[j >> 2] | 0) + 20 | 0;
              d = c[K >> 2] | 0;
              c[K >> 2] = d + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
              b[(c[j >> 2] | 0) + 5816 >> 1] = (c[G >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
              f = (c[j >> 2] | 0) + 5820 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + ((c[F >> 2] | 0) - 16);
            } else {
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | g << c[(c[j >> 2] | 0) + 5820 >> 2];
              g = (c[j >> 2] | 0) + 5820 | 0;
              c[g >> 2] = (c[g >> 2] | 0) + (c[F >> 2] | 0);
            }

            c[H >> 2] = 7;
            g = (c[q >> 2] | 0) - 11 | 0;

            if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[H >> 2] | 0) | 0)) {
              c[I >> 2] = g;
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | (c[I >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
              d = (c[j >> 2] | 0) + 20 | 0;
              K = c[d >> 2] | 0;
              c[d >> 2] = K + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = f;
              f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
              K = (c[j >> 2] | 0) + 20 | 0;
              d = c[K >> 2] | 0;
              c[K >> 2] = d + 1;
              a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
              b[(c[j >> 2] | 0) + 5816 >> 1] = (c[I >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
              f = (c[j >> 2] | 0) + 5820 | 0;
              c[f >> 2] = (c[f >> 2] | 0) + ((c[H >> 2] | 0) - 16);
              break;
            } else {
              f = (c[j >> 2] | 0) + 5816 | 0;
              b[f >> 1] = e[f >> 1] | 0 | (g & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
              g = (c[j >> 2] | 0) + 5820 | 0;
              c[g >> 2] = (c[g >> 2] | 0) + (c[H >> 2] | 0);
              break;
            }
          }
        } else do {
          c[t >> 2] = e[(c[j >> 2] | 0) + 2684 + (c[o >> 2] << 2) + 2 >> 1];
          g = e[(c[j >> 2] | 0) + 2684 + (c[o >> 2] << 2) >> 1] | 0;

          if ((c[(c[j >> 2] | 0) + 5820 >> 2] | 0) > (16 - (c[t >> 2] | 0) | 0)) {
            c[u >> 2] = g;
            f = (c[j >> 2] | 0) + 5816 | 0;
            b[f >> 1] = e[f >> 1] | 0 | (c[u >> 2] & 65535) << c[(c[j >> 2] | 0) + 5820 >> 2];
            f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) & 255;
            d = (c[j >> 2] | 0) + 20 | 0;
            K = c[d >> 2] | 0;
            c[d >> 2] = K + 1;
            a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + K >> 0] = f;
            f = (e[(c[j >> 2] | 0) + 5816 >> 1] | 0) >> 8 & 255;
            K = (c[j >> 2] | 0) + 20 | 0;
            d = c[K >> 2] | 0;
            c[K >> 2] = d + 1;
            a[(c[(c[j >> 2] | 0) + 8 >> 2] | 0) + d >> 0] = f;
            b[(c[j >> 2] | 0) + 5816 >> 1] = (c[u >> 2] & 65535) >> 16 - (c[(c[j >> 2] | 0) + 5820 >> 2] | 0);
            f = (c[j >> 2] | 0) + 5820 | 0;
            c[f >> 2] = (c[f >> 2] | 0) + ((c[t >> 2] | 0) - 16);
          } else {
            f = (c[j >> 2] | 0) + 5816 | 0;
            b[f >> 1] = e[f >> 1] | 0 | g << c[(c[j >> 2] | 0) + 5820 >> 2];
            g = (c[j >> 2] | 0) + 5820 | 0;
            c[g >> 2] = (c[g >> 2] | 0) + (c[t >> 2] | 0);
          }

          g = (c[q >> 2] | 0) + -1 | 0;
          c[q >> 2] = g;
        } while ((g | 0) != 0); while (0);

        c[q >> 2] = 0;
        c[n >> 2] = c[o >> 2];

        if (!(c[p >> 2] | 0)) {
          c[r >> 2] = 138;
          c[s >> 2] = 3;
          break;
        }

        if ((c[o >> 2] | 0) == (c[p >> 2] | 0)) {
          c[r >> 2] = 6;
          c[s >> 2] = 3;
          break;
        } else {
          c[r >> 2] = 7;
          c[s >> 2] = 4;
          break;
        }
      } while (0);

      c[m >> 2] = (c[m >> 2] | 0) + 1;
    }

    i = h;
    return;
  }

  function Td(a, d, f) {
    a = a | 0;
    d = d | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
    g = i;
    i = i + 48 | 0;
    h = g + 36 | 0;
    j = g + 32 | 0;
    k = g + 28 | 0;
    l = g + 24 | 0;
    m = g + 20 | 0;
    n = g + 16 | 0;
    o = g + 12 | 0;
    p = g + 8 | 0;
    q = g + 4 | 0;
    r = g;
    c[h >> 2] = a;
    c[j >> 2] = d;
    c[k >> 2] = f;
    c[m >> 2] = -1;
    c[o >> 2] = e[(c[j >> 2] | 0) + 2 >> 1];
    c[p >> 2] = 0;
    c[q >> 2] = 7;
    c[r >> 2] = 4;

    if (!(c[o >> 2] | 0)) {
      c[q >> 2] = 138;
      c[r >> 2] = 3;
    }

    b[(c[j >> 2] | 0) + ((c[k >> 2] | 0) + 1 << 2) + 2 >> 1] = -1;
    c[l >> 2] = 0;

    while (1) {
      if ((c[l >> 2] | 0) > (c[k >> 2] | 0)) break;
      c[n >> 2] = c[o >> 2];
      c[o >> 2] = e[(c[j >> 2] | 0) + ((c[l >> 2] | 0) + 1 << 2) + 2 >> 1];
      f = (c[p >> 2] | 0) + 1 | 0;
      c[p >> 2] = f;
      if (!((f | 0) < (c[q >> 2] | 0) ? (c[n >> 2] | 0) == (c[o >> 2] | 0) : 0)) s = 7;

      do if ((s | 0) == 7) {
        s = 0;

        do if ((c[p >> 2] | 0) >= (c[r >> 2] | 0)) {
          if (!(c[n >> 2] | 0)) {
            f = (c[h >> 2] | 0) + 2684 | 0;

            if ((c[p >> 2] | 0) <= 10) {
              d = f + 68 | 0;
              b[d >> 1] = (b[d >> 1] | 0) + 1 << 16 >> 16;
              break;
            } else {
              d = f + 72 | 0;
              b[d >> 1] = (b[d >> 1] | 0) + 1 << 16 >> 16;
              break;
            }
          } else {
            if ((c[n >> 2] | 0) != (c[m >> 2] | 0)) {
              d = (c[h >> 2] | 0) + 2684 + (c[n >> 2] << 2) | 0;
              b[d >> 1] = (b[d >> 1] | 0) + 1 << 16 >> 16;
            }

            d = (c[h >> 2] | 0) + 2684 + 64 | 0;
            b[d >> 1] = (b[d >> 1] | 0) + 1 << 16 >> 16;
            break;
          }
        } else {
          d = (c[h >> 2] | 0) + 2684 + (c[n >> 2] << 2) | 0;
          b[d >> 1] = (e[d >> 1] | 0) + (c[p >> 2] | 0);
        } while (0);

        c[p >> 2] = 0;
        c[m >> 2] = c[n >> 2];

        if (!(c[o >> 2] | 0)) {
          c[q >> 2] = 138;
          c[r >> 2] = 3;
          break;
        }

        if ((c[n >> 2] | 0) == (c[o >> 2] | 0)) {
          c[q >> 2] = 6;
          c[r >> 2] = 3;
          break;
        } else {
          c[q >> 2] = 7;
          c[r >> 2] = 4;
          break;
        }
      } while (0);

      c[l >> 2] = (c[l >> 2] | 0) + 1;
    }

    i = g;
    return;
  }

  function Ud(a, b, f) {
    a = a | 0;
    b = b | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0;
    g = i;
    i = i + 32 | 0;
    h = g + 16 | 0;
    j = g + 12 | 0;
    k = g + 8 | 0;
    l = g + 4 | 0;
    m = g;
    c[h >> 2] = a;
    c[j >> 2] = b;
    c[k >> 2] = f;
    c[l >> 2] = c[(c[h >> 2] | 0) + 2908 + (c[k >> 2] << 2) >> 2];
    c[m >> 2] = c[k >> 2] << 1;

    while (1) {
      if ((c[m >> 2] | 0) > (c[(c[h >> 2] | 0) + 5200 >> 2] | 0)) {
        n = 12;
        break;
      }

      do if ((c[m >> 2] | 0) < (c[(c[h >> 2] | 0) + 5200 >> 2] | 0)) {
        if ((e[(c[j >> 2] | 0) + (c[(c[h >> 2] | 0) + 2908 + ((c[m >> 2] | 0) + 1 << 2) >> 2] << 2) >> 1] | 0 | 0) >= (e[(c[j >> 2] | 0) + (c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2] << 2) >> 1] | 0 | 0)) {
          if ((e[(c[j >> 2] | 0) + (c[(c[h >> 2] | 0) + 2908 + ((c[m >> 2] | 0) + 1 << 2) >> 2] << 2) >> 1] | 0 | 0) != (e[(c[j >> 2] | 0) + (c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2] << 2) >> 1] | 0 | 0)) break;
          if ((d[(c[h >> 2] | 0) + 5208 + (c[(c[h >> 2] | 0) + 2908 + ((c[m >> 2] | 0) + 1 << 2) >> 2] | 0) >> 0] | 0 | 0) > (d[(c[h >> 2] | 0) + 5208 + (c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2] | 0) >> 0] | 0 | 0)) break;
        }

        c[m >> 2] = (c[m >> 2] | 0) + 1;
      } while (0);

      if ((e[(c[j >> 2] | 0) + (c[l >> 2] << 2) >> 1] | 0 | 0) < (e[(c[j >> 2] | 0) + (c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2] << 2) >> 1] | 0 | 0)) {
        n = 12;
        break;
      }

      if ((e[(c[j >> 2] | 0) + (c[l >> 2] << 2) >> 1] | 0 | 0) == (e[(c[j >> 2] | 0) + (c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2] << 2) >> 1] | 0 | 0) ? (d[(c[h >> 2] | 0) + 5208 + (c[l >> 2] | 0) >> 0] | 0 | 0) <= (d[(c[h >> 2] | 0) + 5208 + (c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2] | 0) >> 0] | 0 | 0) : 0) {
        n = 12;
        break;
      }

      c[(c[h >> 2] | 0) + 2908 + (c[k >> 2] << 2) >> 2] = c[(c[h >> 2] | 0) + 2908 + (c[m >> 2] << 2) >> 2];
      c[k >> 2] = c[m >> 2];
      c[m >> 2] = c[m >> 2] << 1;
    }

    if ((n | 0) == 12) {
      c[(c[h >> 2] | 0) + 2908 + (c[k >> 2] << 2) >> 2] = c[l >> 2];
      i = g;
      return;
    }
  }

  function Vd(a, d) {
    a = a | 0;
    d = d | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
    f = i;
    i = i + 64 | 0;
    g = f + 52 | 0;
    h = f + 48 | 0;
    j = f + 44 | 0;
    k = f + 40 | 0;
    l = f + 36 | 0;
    m = f + 32 | 0;
    n = f + 28 | 0;
    o = f + 24 | 0;
    p = f + 20 | 0;
    q = f + 16 | 0;
    r = f + 12 | 0;
    s = f + 8 | 0;
    t = f + 4 | 0;
    u = f + 56 | 0;
    v = f;
    c[g >> 2] = a;
    c[h >> 2] = d;
    c[j >> 2] = c[c[h >> 2] >> 2];
    c[k >> 2] = c[(c[h >> 2] | 0) + 4 >> 2];
    c[l >> 2] = c[c[(c[h >> 2] | 0) + 8 >> 2] >> 2];
    c[m >> 2] = c[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + 4 >> 2];
    c[n >> 2] = c[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + 8 >> 2];
    c[o >> 2] = c[(c[(c[h >> 2] | 0) + 8 >> 2] | 0) + 16 >> 2];
    c[v >> 2] = 0;
    c[s >> 2] = 0;

    while (1) {
      if ((c[s >> 2] | 0) > 15) break;
      b[(c[g >> 2] | 0) + 2876 + (c[s >> 2] << 1) >> 1] = 0;
      c[s >> 2] = (c[s >> 2] | 0) + 1;
    }

    b[(c[j >> 2] | 0) + (c[(c[g >> 2] | 0) + 2908 + (c[(c[g >> 2] | 0) + 5204 >> 2] << 2) >> 2] << 2) + 2 >> 1] = 0;
    c[p >> 2] = (c[(c[g >> 2] | 0) + 5204 >> 2] | 0) + 1;

    while (1) {
      if ((c[p >> 2] | 0) >= 573) break;
      c[q >> 2] = c[(c[g >> 2] | 0) + 2908 + (c[p >> 2] << 2) >> 2];
      c[s >> 2] = (e[(c[j >> 2] | 0) + ((e[(c[j >> 2] | 0) + (c[q >> 2] << 2) + 2 >> 1] | 0) << 2) + 2 >> 1] | 0) + 1;

      if ((c[s >> 2] | 0) > (c[o >> 2] | 0)) {
        c[s >> 2] = c[o >> 2];
        c[v >> 2] = (c[v >> 2] | 0) + 1;
      }

      b[(c[j >> 2] | 0) + (c[q >> 2] << 2) + 2 >> 1] = c[s >> 2];

      if ((c[q >> 2] | 0) <= (c[k >> 2] | 0)) {
        h = (c[g >> 2] | 0) + 2876 + (c[s >> 2] << 1) | 0;
        b[h >> 1] = (b[h >> 1] | 0) + 1 << 16 >> 16;
        c[t >> 2] = 0;
        if ((c[q >> 2] | 0) >= (c[n >> 2] | 0)) c[t >> 2] = c[(c[m >> 2] | 0) + ((c[q >> 2] | 0) - (c[n >> 2] | 0) << 2) >> 2];
        b[u >> 1] = b[(c[j >> 2] | 0) + (c[q >> 2] << 2) >> 1] | 0;
        h = _(e[u >> 1] | 0, (c[s >> 2] | 0) + (c[t >> 2] | 0) | 0) | 0;
        d = (c[g >> 2] | 0) + 5800 | 0;
        c[d >> 2] = (c[d >> 2] | 0) + h;

        if (c[l >> 2] | 0) {
          h = _(e[u >> 1] | 0, (e[(c[l >> 2] | 0) + (c[q >> 2] << 2) + 2 >> 1] | 0) + (c[t >> 2] | 0) | 0) | 0;
          d = (c[g >> 2] | 0) + 5804 | 0;
          c[d >> 2] = (c[d >> 2] | 0) + h;
        }
      }

      c[p >> 2] = (c[p >> 2] | 0) + 1;
    }

    if (!(c[v >> 2] | 0)) {
      i = f;
      return;
    }

    do {
      c[s >> 2] = (c[o >> 2] | 0) - 1;

      while (1) {
        w = c[s >> 2] | 0;
        if (e[(c[g >> 2] | 0) + 2876 + (c[s >> 2] << 1) >> 1] | 0) break;
        c[s >> 2] = w + -1;
      }

      t = (c[g >> 2] | 0) + 2876 + (w << 1) | 0;
      b[t >> 1] = (b[t >> 1] | 0) + -1 << 16 >> 16;
      t = (c[g >> 2] | 0) + 2876 + ((c[s >> 2] | 0) + 1 << 1) | 0;
      b[t >> 1] = (e[t >> 1] | 0) + 2;
      t = (c[g >> 2] | 0) + 2876 + (c[o >> 2] << 1) | 0;
      b[t >> 1] = (b[t >> 1] | 0) + -1 << 16 >> 16;
      c[v >> 2] = (c[v >> 2] | 0) - 2;
    } while ((c[v >> 2] | 0) > 0);

    c[s >> 2] = c[o >> 2];

    while (1) {
      if (!(c[s >> 2] | 0)) break;
      c[q >> 2] = e[(c[g >> 2] | 0) + 2876 + (c[s >> 2] << 1) >> 1];

      while (1) {
        if (!(c[q >> 2] | 0)) break;
        o = (c[p >> 2] | 0) + -1 | 0;
        c[p >> 2] = o;
        c[r >> 2] = c[(c[g >> 2] | 0) + 2908 + (o << 2) >> 2];
        if ((c[r >> 2] | 0) > (c[k >> 2] | 0)) continue;

        if ((e[(c[j >> 2] | 0) + (c[r >> 2] << 2) + 2 >> 1] | 0 | 0) != (c[s >> 2] | 0)) {
          o = _((c[s >> 2] | 0) - (e[(c[j >> 2] | 0) + (c[r >> 2] << 2) + 2 >> 1] | 0) | 0, e[(c[j >> 2] | 0) + (c[r >> 2] << 2) >> 1] | 0) | 0;
          v = (c[g >> 2] | 0) + 5800 | 0;
          c[v >> 2] = (c[v >> 2] | 0) + o;
          b[(c[j >> 2] | 0) + (c[r >> 2] << 2) + 2 >> 1] = c[s >> 2];
        }

        c[q >> 2] = (c[q >> 2] | 0) + -1;
      }

      c[s >> 2] = (c[s >> 2] | 0) + -1;
    }

    i = f;
    return;
  }

  function Wd(a, d, f) {
    a = a | 0;
    d = d | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
    g = i;
    i = i + 64 | 0;
    h = g + 20 | 0;
    j = g + 16 | 0;
    k = g + 12 | 0;
    l = g + 32 | 0;
    m = g + 24 | 0;
    n = g + 8 | 0;
    o = g + 4 | 0;
    p = g;
    c[h >> 2] = a;
    c[j >> 2] = d;
    c[k >> 2] = f;
    b[m >> 1] = 0;
    c[n >> 2] = 1;

    while (1) {
      if ((c[n >> 2] | 0) > 15) break;
      f = (e[m >> 1] | 0) + (e[(c[k >> 2] | 0) + ((c[n >> 2] | 0) - 1 << 1) >> 1] | 0) << 1 & 65535;
      b[m >> 1] = f;
      b[l + (c[n >> 2] << 1) >> 1] = f;
      c[n >> 2] = (c[n >> 2] | 0) + 1;
    }

    c[o >> 2] = 0;

    while (1) {
      if ((c[o >> 2] | 0) > (c[j >> 2] | 0)) break;
      c[p >> 2] = e[(c[h >> 2] | 0) + (c[o >> 2] << 2) + 2 >> 1];

      if (c[p >> 2] | 0) {
        n = l + (c[p >> 2] << 1) | 0;
        m = b[n >> 1] | 0;
        b[n >> 1] = m + 1 << 16 >> 16;
        n = (Xd(m & 65535, c[p >> 2] | 0) | 0) & 65535;
        b[(c[h >> 2] | 0) + (c[o >> 2] << 2) >> 1] = n;
      }

      c[o >> 2] = (c[o >> 2] | 0) + 1;
    }

    i = g;
    return;
  }

  function Xd(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0;
    d = i;
    i = i + 16 | 0;
    e = d + 8 | 0;
    f = d + 4 | 0;
    g = d;
    c[e >> 2] = a;
    c[f >> 2] = b;
    c[g >> 2] = 0;

    do {
      c[g >> 2] = c[g >> 2] | c[e >> 2] & 1;
      c[e >> 2] = (c[e >> 2] | 0) >>> 1;
      c[g >> 2] = c[g >> 2] << 1;
      b = (c[f >> 2] | 0) + -1 | 0;
      c[f >> 2] = b;
    } while ((b | 0) > 0);

    i = d;
    return (c[g >> 2] | 0) >>> 1 | 0;
  }

  function Yd(a) {
    a = a | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0;
    f = i;
    i = i + 32 | 0;
    g = f + 28 | 0;
    h = f + 24 | 0;
    j = f + 20 | 0;
    k = f + 16 | 0;
    l = f + 12 | 0;
    m = f + 8 | 0;
    n = f + 4 | 0;
    o = f;
    c[g >> 2] = a;
    c[m >> 2] = c[(c[g >> 2] | 0) + 44 >> 2];

    do {
      c[l >> 2] = (c[(c[g >> 2] | 0) + 60 >> 2] | 0) - (c[(c[g >> 2] | 0) + 116 >> 2] | 0) - (c[(c[g >> 2] | 0) + 108 >> 2] | 0);

      if ((c[(c[g >> 2] | 0) + 108 >> 2] | 0) >>> 0 >= ((c[m >> 2] | 0) + ((c[(c[g >> 2] | 0) + 44 >> 2] | 0) - 262) | 0) >>> 0) {
        af(c[(c[g >> 2] | 0) + 56 >> 2] | 0, (c[(c[g >> 2] | 0) + 56 >> 2] | 0) + (c[m >> 2] | 0) | 0, c[m >> 2] | 0) | 0;
        a = (c[g >> 2] | 0) + 112 | 0;
        c[a >> 2] = (c[a >> 2] | 0) - (c[m >> 2] | 0);
        a = (c[g >> 2] | 0) + 108 | 0;
        c[a >> 2] = (c[a >> 2] | 0) - (c[m >> 2] | 0);
        a = (c[g >> 2] | 0) + 92 | 0;
        c[a >> 2] = (c[a >> 2] | 0) - (c[m >> 2] | 0);
        c[h >> 2] = c[(c[g >> 2] | 0) + 76 >> 2];
        c[k >> 2] = (c[(c[g >> 2] | 0) + 68 >> 2] | 0) + (c[h >> 2] << 1);

        do {
          a = (c[k >> 2] | 0) + -2 | 0;
          c[k >> 2] = a;
          c[j >> 2] = e[a >> 1];
          if ((c[j >> 2] | 0) >>> 0 >= (c[m >> 2] | 0) >>> 0) p = (c[j >> 2] | 0) - (c[m >> 2] | 0) | 0;else p = 0;
          b[c[k >> 2] >> 1] = p;
          a = (c[h >> 2] | 0) + -1 | 0;
          c[h >> 2] = a;
        } while ((a | 0) != 0);

        c[h >> 2] = c[m >> 2];
        c[k >> 2] = (c[(c[g >> 2] | 0) + 64 >> 2] | 0) + (c[h >> 2] << 1);

        do {
          a = (c[k >> 2] | 0) + -2 | 0;
          c[k >> 2] = a;
          c[j >> 2] = e[a >> 1];
          if ((c[j >> 2] | 0) >>> 0 >= (c[m >> 2] | 0) >>> 0) q = (c[j >> 2] | 0) - (c[m >> 2] | 0) | 0;else q = 0;
          b[c[k >> 2] >> 1] = q;
          a = (c[h >> 2] | 0) + -1 | 0;
          c[h >> 2] = a;
        } while ((a | 0) != 0);

        c[l >> 2] = (c[l >> 2] | 0) + (c[m >> 2] | 0);
      }

      if (!(c[(c[c[g >> 2] >> 2] | 0) + 4 >> 2] | 0)) {
        r = 24;
        break;
      }

      c[h >> 2] = Zd(c[c[g >> 2] >> 2] | 0, (c[(c[g >> 2] | 0) + 56 >> 2] | 0) + (c[(c[g >> 2] | 0) + 108 >> 2] | 0) + (c[(c[g >> 2] | 0) + 116 >> 2] | 0) | 0, c[l >> 2] | 0) | 0;
      a = (c[g >> 2] | 0) + 116 | 0;
      c[a >> 2] = (c[a >> 2] | 0) + (c[h >> 2] | 0);

      if ((c[(c[g >> 2] | 0) + 116 >> 2] | 0) >>> 0 >= 3) {
        c[(c[g >> 2] | 0) + 72 >> 2] = d[(c[(c[g >> 2] | 0) + 56 >> 2] | 0) + (c[(c[g >> 2] | 0) + 108 >> 2] | 0) >> 0];
        c[(c[g >> 2] | 0) + 72 >> 2] = (c[(c[g >> 2] | 0) + 72 >> 2] << c[(c[g >> 2] | 0) + 88 >> 2] ^ (d[(c[(c[g >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[g >> 2] | 0) + 108 >> 2] | 0) + 1) >> 0] | 0)) & c[(c[g >> 2] | 0) + 84 >> 2];
      }

      if ((c[(c[g >> 2] | 0) + 116 >> 2] | 0) >>> 0 >= 262) break;
    } while ((c[(c[c[g >> 2] >> 2] | 0) + 4 >> 2] | 0) != 0);

    if ((r | 0) == 24) {
      i = f;
      return;
    }

    if ((c[(c[g >> 2] | 0) + 5824 >> 2] | 0) >>> 0 >= (c[(c[g >> 2] | 0) + 60 >> 2] | 0) >>> 0) {
      i = f;
      return;
    }

    c[n >> 2] = (c[(c[g >> 2] | 0) + 108 >> 2] | 0) + (c[(c[g >> 2] | 0) + 116 >> 2] | 0);
    r = c[g >> 2] | 0;

    if ((c[(c[g >> 2] | 0) + 5824 >> 2] | 0) >>> 0 < (c[n >> 2] | 0) >>> 0) {
      h = (c[r + 60 >> 2] | 0) - (c[n >> 2] | 0) | 0;
      c[o >> 2] = h;
      c[o >> 2] = (c[o >> 2] | 0) >>> 0 > 258 ? 258 : h;
      Ze((c[(c[g >> 2] | 0) + 56 >> 2] | 0) + (c[n >> 2] | 0) | 0, 0, c[o >> 2] | 0) | 0;
      c[(c[g >> 2] | 0) + 5824 >> 2] = (c[n >> 2] | 0) + (c[o >> 2] | 0);
      i = f;
      return;
    }

    if ((c[r + 5824 >> 2] | 0) >>> 0 >= ((c[n >> 2] | 0) + 258 | 0) >>> 0) {
      i = f;
      return;
    }

    c[o >> 2] = (c[n >> 2] | 0) + 258 - (c[(c[g >> 2] | 0) + 5824 >> 2] | 0);
    if ((c[o >> 2] | 0) >>> 0 > ((c[(c[g >> 2] | 0) + 60 >> 2] | 0) - (c[(c[g >> 2] | 0) + 5824 >> 2] | 0) | 0) >>> 0) c[o >> 2] = (c[(c[g >> 2] | 0) + 60 >> 2] | 0) - (c[(c[g >> 2] | 0) + 5824 >> 2] | 0);
    Ze((c[(c[g >> 2] | 0) + 56 >> 2] | 0) + (c[(c[g >> 2] | 0) + 5824 >> 2] | 0) | 0, 0, c[o >> 2] | 0) | 0;
    n = (c[g >> 2] | 0) + 5824 | 0;
    c[n >> 2] = (c[n >> 2] | 0) + (c[o >> 2] | 0);
    i = f;
    return;
  }

  function Zd(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0;
    e = i;
    i = i + 32 | 0;
    f = e + 16 | 0;
    g = e + 12 | 0;
    h = e + 8 | 0;
    j = e + 4 | 0;
    k = e;
    c[g >> 2] = a;
    c[h >> 2] = b;
    c[j >> 2] = d;
    c[k >> 2] = c[(c[g >> 2] | 0) + 4 >> 2];
    if ((c[k >> 2] | 0) >>> 0 > (c[j >> 2] | 0) >>> 0) c[k >> 2] = c[j >> 2];

    if (!(c[k >> 2] | 0)) {
      c[f >> 2] = 0;
      l = c[f >> 2] | 0;
      i = e;
      return l | 0;
    }

    j = (c[g >> 2] | 0) + 4 | 0;
    c[j >> 2] = (c[j >> 2] | 0) - (c[k >> 2] | 0);
    j = c[g >> 2] | 0;

    if ((c[(c[(c[g >> 2] | 0) + 28 >> 2] | 0) + 24 >> 2] | 0) != 1) {
      if ((c[(c[j + 28 >> 2] | 0) + 24 >> 2] | 0) == 2) {
        d = fd(c[(c[g >> 2] | 0) + 48 >> 2] | 0, c[c[g >> 2] >> 2] | 0, c[k >> 2] | 0) | 0;
        c[(c[g >> 2] | 0) + 48 >> 2] = d;
      }
    } else {
      d = ed(c[j + 48 >> 2] | 0, c[c[g >> 2] >> 2] | 0, c[k >> 2] | 0) | 0;
      c[(c[g >> 2] | 0) + 48 >> 2] = d;
    }

    af(c[h >> 2] | 0, c[c[g >> 2] >> 2] | 0, c[k >> 2] | 0) | 0;
    h = c[g >> 2] | 0;
    c[h >> 2] = (c[h >> 2] | 0) + (c[k >> 2] | 0);
    h = (c[g >> 2] | 0) + 8 | 0;
    c[h >> 2] = (c[h >> 2] | 0) + (c[k >> 2] | 0);
    c[f >> 2] = c[k >> 2];
    l = c[f >> 2] | 0;
    i = e;
    return l | 0;
  }

  function _d(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0;
    d = i;
    i = i + 32 | 0;
    e = d + 16 | 0;
    f = d + 12 | 0;
    g = d + 8 | 0;
    h = d + 4 | 0;
    j = d;
    c[f >> 2] = a;
    c[g >> 2] = b;
    c[h >> 2] = 65535;
    if ((c[h >> 2] | 0) >>> 0 > ((c[(c[f >> 2] | 0) + 12 >> 2] | 0) - 5 | 0) >>> 0) c[h >> 2] = (c[(c[f >> 2] | 0) + 12 >> 2] | 0) - 5;

    while (1) {
      if ((c[(c[f >> 2] | 0) + 116 >> 2] | 0) >>> 0 <= 1) {
        Yd(c[f >> 2] | 0);

        if ((c[g >> 2] | 0) == 0 ? (c[(c[f >> 2] | 0) + 116 >> 2] | 0) == 0 : 0) {
          k = 5;
          break;
        }

        if (!(c[(c[f >> 2] | 0) + 116 >> 2] | 0)) {
          k = 18;
          break;
        }
      }

      b = (c[f >> 2] | 0) + 108 | 0;
      c[b >> 2] = (c[b >> 2] | 0) + (c[(c[f >> 2] | 0) + 116 >> 2] | 0);
      c[(c[f >> 2] | 0) + 116 >> 2] = 0;
      c[j >> 2] = (c[(c[f >> 2] | 0) + 92 >> 2] | 0) + (c[h >> 2] | 0);

      if (!((c[(c[f >> 2] | 0) + 108 >> 2] | 0) != 0 ? (c[(c[f >> 2] | 0) + 108 >> 2] | 0) >>> 0 < (c[j >> 2] | 0) >>> 0 : 0)) {
        c[(c[f >> 2] | 0) + 116 >> 2] = (c[(c[f >> 2] | 0) + 108 >> 2] | 0) - (c[j >> 2] | 0);
        c[(c[f >> 2] | 0) + 108 >> 2] = c[j >> 2];
        if ((c[(c[f >> 2] | 0) + 92 >> 2] | 0) >= 0) l = (c[(c[f >> 2] | 0) + 56 >> 2] | 0) + (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0;else l = 0;
        wd(c[f >> 2] | 0, l, (c[(c[f >> 2] | 0) + 108 >> 2] | 0) - (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
        c[(c[f >> 2] | 0) + 92 >> 2] = c[(c[f >> 2] | 0) + 108 >> 2];
        Dd(c[c[f >> 2] >> 2] | 0);

        if (!(c[(c[c[f >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
          k = 12;
          break;
        }
      }

      if (((c[(c[f >> 2] | 0) + 108 >> 2] | 0) - (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0) >>> 0 < ((c[(c[f >> 2] | 0) + 44 >> 2] | 0) - 262 | 0) >>> 0) continue;
      if ((c[(c[f >> 2] | 0) + 92 >> 2] | 0) >= 0) m = (c[(c[f >> 2] | 0) + 56 >> 2] | 0) + (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0;else m = 0;
      wd(c[f >> 2] | 0, m, (c[(c[f >> 2] | 0) + 108 >> 2] | 0) - (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
      c[(c[f >> 2] | 0) + 92 >> 2] = c[(c[f >> 2] | 0) + 108 >> 2];
      Dd(c[c[f >> 2] >> 2] | 0);

      if (!(c[(c[c[f >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        k = 17;
        break;
      }
    }

    if ((k | 0) == 5) {
      c[e >> 2] = 0;
      n = c[e >> 2] | 0;
      i = d;
      return n | 0;
    } else if ((k | 0) == 12) {
      c[e >> 2] = 0;
      n = c[e >> 2] | 0;
      i = d;
      return n | 0;
    } else if ((k | 0) == 17) {
      c[e >> 2] = 0;
      n = c[e >> 2] | 0;
      i = d;
      return n | 0;
    } else if ((k | 0) == 18) {
      if ((c[(c[f >> 2] | 0) + 92 >> 2] | 0) >= 0) o = (c[(c[f >> 2] | 0) + 56 >> 2] | 0) + (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0;else o = 0;
      wd(c[f >> 2] | 0, o, (c[(c[f >> 2] | 0) + 108 >> 2] | 0) - (c[(c[f >> 2] | 0) + 92 >> 2] | 0) | 0, (c[g >> 2] | 0) == 4 & 1);
      c[(c[f >> 2] | 0) + 92 >> 2] = c[(c[f >> 2] | 0) + 108 >> 2];
      Dd(c[c[f >> 2] >> 2] | 0);
      o = (c[g >> 2] | 0) == 4;

      if (!(c[(c[c[f >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        c[e >> 2] = o ? 2 : 0;
        n = c[e >> 2] | 0;
        i = d;
        return n | 0;
      } else {
        c[e >> 2] = o ? 3 : 1;
        n = c[e >> 2] | 0;
        i = d;
        return n | 0;
      }
    }

    return 0;
  }

  function $d(f, g) {
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0;
    h = i;
    i = i + 32 | 0;
    j = h + 16 | 0;
    k = h + 12 | 0;
    l = h + 8 | 0;
    m = h + 4 | 0;
    n = h;
    o = h + 23 | 0;
    p = h + 20 | 0;
    q = h + 22 | 0;
    c[k >> 2] = f;
    c[l >> 2] = g;

    while (1) {
      if ((c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 < 262) {
        Yd(c[k >> 2] | 0);

        if ((c[l >> 2] | 0) == 0 ? (c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 < 262 : 0) {
          r = 4;
          break;
        }

        if (!(c[(c[k >> 2] | 0) + 116 >> 2] | 0)) {
          r = 27;
          break;
        }
      }

      c[m >> 2] = 0;

      if ((c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 >= 3) {
        c[(c[k >> 2] | 0) + 72 >> 2] = (c[(c[k >> 2] | 0) + 72 >> 2] << c[(c[k >> 2] | 0) + 88 >> 2] ^ (d[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) + 2) >> 0] | 0)) & c[(c[k >> 2] | 0) + 84 >> 2];
        g = b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] | 0;
        b[(c[(c[k >> 2] | 0) + 64 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] & c[(c[k >> 2] | 0) + 52 >> 2]) << 1) >> 1] = g;
        c[m >> 2] = g & 65535;
        b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] = c[(c[k >> 2] | 0) + 108 >> 2];
      }

      if ((c[m >> 2] | 0) != 0 ? ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[m >> 2] | 0) | 0) >>> 0 <= ((c[(c[k >> 2] | 0) + 44 >> 2] | 0) - 262 | 0) >>> 0 : 0) {
        g = be(c[k >> 2] | 0, c[m >> 2] | 0) | 0;
        c[(c[k >> 2] | 0) + 96 >> 2] = g;
      }

      g = c[k >> 2] | 0;

      do if ((c[(c[k >> 2] | 0) + 96 >> 2] | 0) >>> 0 >= 3) {
        a[o >> 0] = (c[g + 96 >> 2] | 0) - 3;
        b[p >> 1] = (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 112 >> 2] | 0);
        b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = b[p >> 1] | 0;
        f = a[o >> 0] | 0;
        s = (c[k >> 2] | 0) + 5792 | 0;
        t = c[s >> 2] | 0;
        c[s >> 2] = t + 1;
        a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + t >> 0] = f;
        b[p >> 1] = (b[p >> 1] | 0) + -1 << 16 >> 16;
        f = (c[k >> 2] | 0) + 148 + ((d[14027 + (d[o >> 0] | 0) >> 0] | 0) + 256 + 1 << 2) | 0;
        b[f >> 1] = (b[f >> 1] | 0) + 1 << 16 >> 16;
        f = e[p >> 1] | 0;
        if ((e[p >> 1] | 0 | 0) < 256) u = a[13515 + f >> 0] | 0;else u = a[13515 + (256 + (f >> 7)) >> 0] | 0;
        f = (c[k >> 2] | 0) + 2440 + ((u & 255) << 2) | 0;
        b[f >> 1] = (b[f >> 1] | 0) + 1 << 16 >> 16;
        c[n >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
        f = (c[k >> 2] | 0) + 116 | 0;
        c[f >> 2] = (c[f >> 2] | 0) - (c[(c[k >> 2] | 0) + 96 >> 2] | 0);

        if ((c[(c[k >> 2] | 0) + 96 >> 2] | 0) >>> 0 <= (c[(c[k >> 2] | 0) + 128 >> 2] | 0) >>> 0 ? (c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 >= 3 : 0) {
          f = (c[k >> 2] | 0) + 96 | 0;
          c[f >> 2] = (c[f >> 2] | 0) + -1;

          do {
            f = (c[k >> 2] | 0) + 108 | 0;
            c[f >> 2] = (c[f >> 2] | 0) + 1;
            c[(c[k >> 2] | 0) + 72 >> 2] = (c[(c[k >> 2] | 0) + 72 >> 2] << c[(c[k >> 2] | 0) + 88 >> 2] ^ (d[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) + 2) >> 0] | 0)) & c[(c[k >> 2] | 0) + 84 >> 2];
            f = b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] | 0;
            b[(c[(c[k >> 2] | 0) + 64 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] & c[(c[k >> 2] | 0) + 52 >> 2]) << 1) >> 1] = f;
            c[m >> 2] = f & 65535;
            b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] = c[(c[k >> 2] | 0) + 108 >> 2];
            f = (c[k >> 2] | 0) + 96 | 0;
            t = (c[f >> 2] | 0) + -1 | 0;
            c[f >> 2] = t;
          } while ((t | 0) != 0);

          t = (c[k >> 2] | 0) + 108 | 0;
          c[t >> 2] = (c[t >> 2] | 0) + 1;
          break;
        }

        t = (c[k >> 2] | 0) + 108 | 0;
        c[t >> 2] = (c[t >> 2] | 0) + (c[(c[k >> 2] | 0) + 96 >> 2] | 0);
        c[(c[k >> 2] | 0) + 96 >> 2] = 0;
        c[(c[k >> 2] | 0) + 72 >> 2] = d[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 108 >> 2] | 0) >> 0];
        c[(c[k >> 2] | 0) + 72 >> 2] = (c[(c[k >> 2] | 0) + 72 >> 2] << c[(c[k >> 2] | 0) + 88 >> 2] ^ (d[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) + 1) >> 0] | 0)) & c[(c[k >> 2] | 0) + 84 >> 2];
      } else {
        a[q >> 0] = a[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[g + 108 >> 2] | 0) >> 0] | 0;
        b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = 0;
        t = a[q >> 0] | 0;
        f = (c[k >> 2] | 0) + 5792 | 0;
        s = c[f >> 2] | 0;
        c[f >> 2] = s + 1;
        a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + s >> 0] = t;
        t = (c[k >> 2] | 0) + 148 + ((d[q >> 0] | 0) << 2) | 0;
        b[t >> 1] = (b[t >> 1] | 0) + 1 << 16 >> 16;
        c[n >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
        t = (c[k >> 2] | 0) + 116 | 0;
        c[t >> 2] = (c[t >> 2] | 0) + -1;
        t = (c[k >> 2] | 0) + 108 | 0;
        c[t >> 2] = (c[t >> 2] | 0) + 1;
      } while (0);

      if (!(c[n >> 2] | 0)) continue;
      if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) v = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else v = 0;
      wd(c[k >> 2] | 0, v, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
      c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
      Dd(c[c[k >> 2] >> 2] | 0);

      if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        r = 26;
        break;
      }
    }

    if ((r | 0) == 4) {
      c[j >> 2] = 0;
      w = c[j >> 2] | 0;
      i = h;
      return w | 0;
    } else if ((r | 0) == 26) {
      c[j >> 2] = 0;
      w = c[j >> 2] | 0;
      i = h;
      return w | 0;
    } else if ((r | 0) == 27) {
      if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) x = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else x = 0;
      wd(c[k >> 2] | 0, x, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, (c[l >> 2] | 0) == 4 & 1);
      c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
      Dd(c[c[k >> 2] >> 2] | 0);
      x = (c[l >> 2] | 0) == 4;

      if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        c[j >> 2] = x ? 2 : 0;
        w = c[j >> 2] | 0;
        i = h;
        return w | 0;
      } else {
        c[j >> 2] = x ? 3 : 1;
        w = c[j >> 2] | 0;
        i = h;
        return w | 0;
      }
    }

    return 0;
  }

  function ae(f, g) {
    f = f | 0;
    g = g | 0;
    var h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0;
    h = i;
    i = i + 32 | 0;
    j = h + 20 | 0;
    k = h + 16 | 0;
    l = h + 12 | 0;
    m = h + 8 | 0;
    n = h + 4 | 0;
    o = h;
    p = h + 28 | 0;
    q = h + 24 | 0;
    r = h + 27 | 0;
    s = h + 26 | 0;
    c[k >> 2] = f;
    c[l >> 2] = g;

    while (1) {
      if ((c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 < 262) {
        Yd(c[k >> 2] | 0);

        if ((c[l >> 2] | 0) == 0 ? (c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 < 262 : 0) {
          t = 4;
          break;
        }

        if (!(c[(c[k >> 2] | 0) + 116 >> 2] | 0)) {
          t = 38;
          break;
        }
      }

      c[m >> 2] = 0;

      if ((c[(c[k >> 2] | 0) + 116 >> 2] | 0) >>> 0 >= 3) {
        c[(c[k >> 2] | 0) + 72 >> 2] = (c[(c[k >> 2] | 0) + 72 >> 2] << c[(c[k >> 2] | 0) + 88 >> 2] ^ (d[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) + 2) >> 0] | 0)) & c[(c[k >> 2] | 0) + 84 >> 2];
        g = b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] | 0;
        b[(c[(c[k >> 2] | 0) + 64 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] & c[(c[k >> 2] | 0) + 52 >> 2]) << 1) >> 1] = g;
        c[m >> 2] = g & 65535;
        b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] = c[(c[k >> 2] | 0) + 108 >> 2];
      }

      c[(c[k >> 2] | 0) + 120 >> 2] = c[(c[k >> 2] | 0) + 96 >> 2];
      c[(c[k >> 2] | 0) + 100 >> 2] = c[(c[k >> 2] | 0) + 112 >> 2];
      c[(c[k >> 2] | 0) + 96 >> 2] = 2;

      do if ((((c[m >> 2] | 0) != 0 ? (c[(c[k >> 2] | 0) + 120 >> 2] | 0) >>> 0 < (c[(c[k >> 2] | 0) + 128 >> 2] | 0) >>> 0 : 0) ? ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[m >> 2] | 0) | 0) >>> 0 <= ((c[(c[k >> 2] | 0) + 44 >> 2] | 0) - 262 | 0) >>> 0 : 0) ? (g = be(c[k >> 2] | 0, c[m >> 2] | 0) | 0, c[(c[k >> 2] | 0) + 96 >> 2] = g, (c[(c[k >> 2] | 0) + 96 >> 2] | 0) >>> 0 <= 5) : 0) {
        if ((c[(c[k >> 2] | 0) + 136 >> 2] | 0) != 1) {
          if ((c[(c[k >> 2] | 0) + 96 >> 2] | 0) != 3) break;
          if (((c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 112 >> 2] | 0) | 0) >>> 0 <= 4096) break;
        }

        c[(c[k >> 2] | 0) + 96 >> 2] = 2;
      } while (0);

      if ((c[(c[k >> 2] | 0) + 120 >> 2] | 0) >>> 0 >= 3 ? (c[(c[k >> 2] | 0) + 96 >> 2] | 0) >>> 0 <= (c[(c[k >> 2] | 0) + 120 >> 2] | 0) >>> 0 : 0) {
        c[o >> 2] = (c[(c[k >> 2] | 0) + 108 >> 2] | 0) + (c[(c[k >> 2] | 0) + 116 >> 2] | 0) - 3;
        a[p >> 0] = (c[(c[k >> 2] | 0) + 120 >> 2] | 0) - 3;
        b[q >> 1] = (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - 1 - (c[(c[k >> 2] | 0) + 100 >> 2] | 0);
        b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = b[q >> 1] | 0;
        g = a[p >> 0] | 0;
        f = (c[k >> 2] | 0) + 5792 | 0;
        u = c[f >> 2] | 0;
        c[f >> 2] = u + 1;
        a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + u >> 0] = g;
        b[q >> 1] = (b[q >> 1] | 0) + -1 << 16 >> 16;
        g = (c[k >> 2] | 0) + 148 + ((d[14027 + (d[p >> 0] | 0) >> 0] | 0) + 256 + 1 << 2) | 0;
        b[g >> 1] = (b[g >> 1] | 0) + 1 << 16 >> 16;
        g = e[q >> 1] | 0;
        if ((e[q >> 1] | 0 | 0) < 256) v = a[13515 + g >> 0] | 0;else v = a[13515 + (256 + (g >> 7)) >> 0] | 0;
        g = (c[k >> 2] | 0) + 2440 + ((v & 255) << 2) | 0;
        b[g >> 1] = (b[g >> 1] | 0) + 1 << 16 >> 16;
        c[n >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
        g = (c[k >> 2] | 0) + 116 | 0;
        c[g >> 2] = (c[g >> 2] | 0) - ((c[(c[k >> 2] | 0) + 120 >> 2] | 0) - 1);
        g = (c[k >> 2] | 0) + 120 | 0;
        c[g >> 2] = (c[g >> 2] | 0) - 2;

        do {
          g = (c[k >> 2] | 0) + 108 | 0;
          u = (c[g >> 2] | 0) + 1 | 0;
          c[g >> 2] = u;

          if (u >>> 0 <= (c[o >> 2] | 0) >>> 0) {
            c[(c[k >> 2] | 0) + 72 >> 2] = (c[(c[k >> 2] | 0) + 72 >> 2] << c[(c[k >> 2] | 0) + 88 >> 2] ^ (d[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) + 2) >> 0] | 0)) & c[(c[k >> 2] | 0) + 84 >> 2];
            u = b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] | 0;
            b[(c[(c[k >> 2] | 0) + 64 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] & c[(c[k >> 2] | 0) + 52 >> 2]) << 1) >> 1] = u;
            c[m >> 2] = u & 65535;
            b[(c[(c[k >> 2] | 0) + 68 >> 2] | 0) + (c[(c[k >> 2] | 0) + 72 >> 2] << 1) >> 1] = c[(c[k >> 2] | 0) + 108 >> 2];
          }

          u = (c[k >> 2] | 0) + 120 | 0;
          g = (c[u >> 2] | 0) + -1 | 0;
          c[u >> 2] = g;
        } while ((g | 0) != 0);

        c[(c[k >> 2] | 0) + 104 >> 2] = 0;
        c[(c[k >> 2] | 0) + 96 >> 2] = 2;
        g = (c[k >> 2] | 0) + 108 | 0;
        c[g >> 2] = (c[g >> 2] | 0) + 1;
        if (!(c[n >> 2] | 0)) continue;
        if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) w = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else w = 0;
        wd(c[k >> 2] | 0, w, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
        c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
        Dd(c[c[k >> 2] >> 2] | 0);

        if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
          t = 29;
          break;
        } else continue;
      }

      g = c[k >> 2] | 0;

      if (!(c[(c[k >> 2] | 0) + 104 >> 2] | 0)) {
        c[g + 104 >> 2] = 1;
        u = (c[k >> 2] | 0) + 108 | 0;
        c[u >> 2] = (c[u >> 2] | 0) + 1;
        u = (c[k >> 2] | 0) + 116 | 0;
        c[u >> 2] = (c[u >> 2] | 0) + -1;
        continue;
      }

      a[r >> 0] = a[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[g + 108 >> 2] | 0) - 1) >> 0] | 0;
      b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = 0;
      g = a[r >> 0] | 0;
      u = (c[k >> 2] | 0) + 5792 | 0;
      f = c[u >> 2] | 0;
      c[u >> 2] = f + 1;
      a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + f >> 0] = g;
      g = (c[k >> 2] | 0) + 148 + ((d[r >> 0] | 0) << 2) | 0;
      b[g >> 1] = (b[g >> 1] | 0) + 1 << 16 >> 16;
      c[n >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;

      if (c[n >> 2] | 0) {
        if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) x = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else x = 0;
        wd(c[k >> 2] | 0, x, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, 0);
        c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
        Dd(c[c[k >> 2] >> 2] | 0);
      }

      g = (c[k >> 2] | 0) + 108 | 0;
      c[g >> 2] = (c[g >> 2] | 0) + 1;
      g = (c[k >> 2] | 0) + 116 | 0;
      c[g >> 2] = (c[g >> 2] | 0) + -1;

      if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        t = 36;
        break;
      }
    }

    if ((t | 0) == 4) {
      c[j >> 2] = 0;
      y = c[j >> 2] | 0;
      i = h;
      return y | 0;
    } else if ((t | 0) == 29) {
      c[j >> 2] = 0;
      y = c[j >> 2] | 0;
      i = h;
      return y | 0;
    } else if ((t | 0) == 36) {
      c[j >> 2] = 0;
      y = c[j >> 2] | 0;
      i = h;
      return y | 0;
    } else if ((t | 0) == 38) {
      if (c[(c[k >> 2] | 0) + 104 >> 2] | 0) {
        a[s >> 0] = a[(c[(c[k >> 2] | 0) + 56 >> 2] | 0) + ((c[(c[k >> 2] | 0) + 108 >> 2] | 0) - 1) >> 0] | 0;
        b[(c[(c[k >> 2] | 0) + 5796 >> 2] | 0) + (c[(c[k >> 2] | 0) + 5792 >> 2] << 1) >> 1] = 0;
        t = a[s >> 0] | 0;
        x = (c[k >> 2] | 0) + 5792 | 0;
        r = c[x >> 2] | 0;
        c[x >> 2] = r + 1;
        a[(c[(c[k >> 2] | 0) + 5784 >> 2] | 0) + r >> 0] = t;
        t = (c[k >> 2] | 0) + 148 + ((d[s >> 0] | 0) << 2) | 0;
        b[t >> 1] = (b[t >> 1] | 0) + 1 << 16 >> 16;
        c[n >> 2] = (c[(c[k >> 2] | 0) + 5792 >> 2] | 0) == ((c[(c[k >> 2] | 0) + 5788 >> 2] | 0) - 1 | 0) & 1;
        c[(c[k >> 2] | 0) + 104 >> 2] = 0;
      }

      if ((c[(c[k >> 2] | 0) + 92 >> 2] | 0) >= 0) z = (c[(c[k >> 2] | 0) + 56 >> 2] | 0) + (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0;else z = 0;
      wd(c[k >> 2] | 0, z, (c[(c[k >> 2] | 0) + 108 >> 2] | 0) - (c[(c[k >> 2] | 0) + 92 >> 2] | 0) | 0, (c[l >> 2] | 0) == 4 & 1);
      c[(c[k >> 2] | 0) + 92 >> 2] = c[(c[k >> 2] | 0) + 108 >> 2];
      Dd(c[c[k >> 2] >> 2] | 0);
      z = (c[l >> 2] | 0) == 4;

      if (!(c[(c[c[k >> 2] >> 2] | 0) + 16 >> 2] | 0)) {
        c[j >> 2] = z ? 2 : 0;
        y = c[j >> 2] | 0;
        i = h;
        return y | 0;
      } else {
        c[j >> 2] = z ? 3 : 1;
        y = c[j >> 2] | 0;
        i = h;
        return y | 0;
      }
    }

    return 0;
  }

  function be(b, f) {
    b = b | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
    g = i;
    i = i + 64 | 0;
    h = g + 48 | 0;
    j = g + 44 | 0;
    k = g + 40 | 0;
    l = g + 36 | 0;
    m = g + 32 | 0;
    n = g + 28 | 0;
    o = g + 24 | 0;
    p = g + 20 | 0;
    q = g + 16 | 0;
    r = g + 12 | 0;
    s = g + 8 | 0;
    t = g + 4 | 0;
    u = g;
    v = g + 53 | 0;
    w = g + 52 | 0;
    c[j >> 2] = b;
    c[k >> 2] = f;
    c[l >> 2] = c[(c[j >> 2] | 0) + 124 >> 2];
    c[m >> 2] = (c[(c[j >> 2] | 0) + 56 >> 2] | 0) + (c[(c[j >> 2] | 0) + 108 >> 2] | 0);
    c[p >> 2] = c[(c[j >> 2] | 0) + 120 >> 2];
    c[q >> 2] = c[(c[j >> 2] | 0) + 144 >> 2];
    if ((c[(c[j >> 2] | 0) + 108 >> 2] | 0) >>> 0 > ((c[(c[j >> 2] | 0) + 44 >> 2] | 0) - 262 | 0) >>> 0) x = (c[(c[j >> 2] | 0) + 108 >> 2] | 0) - ((c[(c[j >> 2] | 0) + 44 >> 2] | 0) - 262) | 0;else x = 0;
    c[r >> 2] = x;
    c[s >> 2] = c[(c[j >> 2] | 0) + 64 >> 2];
    c[t >> 2] = c[(c[j >> 2] | 0) + 52 >> 2];
    c[u >> 2] = (c[(c[j >> 2] | 0) + 56 >> 2] | 0) + (c[(c[j >> 2] | 0) + 108 >> 2] | 0) + 258;
    a[v >> 0] = a[(c[m >> 2] | 0) + ((c[p >> 2] | 0) - 1) >> 0] | 0;
    a[w >> 0] = a[(c[m >> 2] | 0) + (c[p >> 2] | 0) >> 0] | 0;
    if ((c[(c[j >> 2] | 0) + 120 >> 2] | 0) >>> 0 >= (c[(c[j >> 2] | 0) + 140 >> 2] | 0) >>> 0) c[l >> 2] = (c[l >> 2] | 0) >>> 2;
    if ((c[q >> 2] | 0) >>> 0 > (c[(c[j >> 2] | 0) + 116 >> 2] | 0) >>> 0) c[q >> 2] = c[(c[j >> 2] | 0) + 116 >> 2];

    do {
      c[n >> 2] = (c[(c[j >> 2] | 0) + 56 >> 2] | 0) + (c[k >> 2] | 0);

      if ((((d[(c[n >> 2] | 0) + (c[p >> 2] | 0) >> 0] | 0 | 0) == (d[w >> 0] | 0 | 0) ? (d[(c[n >> 2] | 0) + ((c[p >> 2] | 0) - 1) >> 0] | 0 | 0) == (d[v >> 0] | 0 | 0) : 0) ? (d[c[n >> 2] >> 0] | 0 | 0) == (d[c[m >> 2] >> 0] | 0 | 0) : 0) ? (x = (c[n >> 2] | 0) + 1 | 0, c[n >> 2] = x, (d[x >> 0] | 0 | 0) == (d[(c[m >> 2] | 0) + 1 >> 0] | 0 | 0)) : 0) {
        c[m >> 2] = (c[m >> 2] | 0) + 2;
        c[n >> 2] = (c[n >> 2] | 0) + 1;

        do {
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
          x = (c[m >> 2] | 0) + 1 | 0;
          c[m >> 2] = x;
          f = d[x >> 0] | 0;
          x = (c[n >> 2] | 0) + 1 | 0;
          c[n >> 2] = x;
          if ((f | 0) != (d[x >> 0] | 0 | 0)) break;
        } while ((c[m >> 2] | 0) >>> 0 < (c[u >> 2] | 0) >>> 0);

        c[o >> 2] = 258 - ((c[u >> 2] | 0) - (c[m >> 2] | 0));
        c[m >> 2] = (c[u >> 2] | 0) + -258;

        if ((c[o >> 2] | 0) > (c[p >> 2] | 0)) {
          c[(c[j >> 2] | 0) + 112 >> 2] = c[k >> 2];
          c[p >> 2] = c[o >> 2];
          if ((c[o >> 2] | 0) >= (c[q >> 2] | 0)) break;
          a[v >> 0] = a[(c[m >> 2] | 0) + ((c[p >> 2] | 0) - 1) >> 0] | 0;
          a[w >> 0] = a[(c[m >> 2] | 0) + (c[p >> 2] | 0) >> 0] | 0;
        }
      }

      x = e[(c[s >> 2] | 0) + ((c[k >> 2] & c[t >> 2]) << 1) >> 1] | 0;
      c[k >> 2] = x;
      if (x >>> 0 <= (c[r >> 2] | 0) >>> 0) break;
      x = (c[l >> 2] | 0) + -1 | 0;
      c[l >> 2] = x;
    } while ((x | 0) != 0);

    if ((c[p >> 2] | 0) >>> 0 <= (c[(c[j >> 2] | 0) + 116 >> 2] | 0) >>> 0) {
      c[h >> 2] = c[p >> 2];
      y = c[h >> 2] | 0;
      i = g;
      return y | 0;
    } else {
      c[h >> 2] = c[(c[j >> 2] | 0) + 116 >> 2];
      y = c[h >> 2] | 0;
      i = g;
      return y | 0;
    }

    return 0;
  }

  function ce() {
    var a = 0;
    if (!(c[2242] | 0)) a = 9016;else a = c[(za() | 0) + 60 >> 2] | 0;
    return a | 0;
  }

  function de(b) {
    b = b | 0;
    var c = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
    c = 0;

    while (1) {
      if ((d[14886 + c >> 0] | 0) == (b | 0)) {
        e = c;
        f = 2;
        break;
      }

      c = c + 1 | 0;

      if ((c | 0) == 87) {
        g = 87;
        h = 14974;
        f = 5;
        break;
      }
    }

    if ((f | 0) == 2) if (!e) i = 14974;else {
      g = e;
      h = 14974;
      f = 5;
    }
    if ((f | 0) == 5) while (1) {
      f = 0;
      e = h;

      while (1) {
        c = e + 1 | 0;

        if (!(a[e >> 0] | 0)) {
          j = c;
          break;
        } else e = c;
      }

      g = g + -1 | 0;

      if (!g) {
        i = j;
        break;
      } else {
        h = j;
        f = 5;
      }
    }
    return i | 0;
  }

  function ee(a) {
    a = a | 0;
    var b = 0;

    if (a >>> 0 > 4294963200) {
      c[(ce() | 0) >> 2] = 0 - a;
      b = -1;
    } else b = a;

    return b | 0;
  }

  function fe(a, b) {
    a = +a;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        i = 0.0,
        j = 0.0,
        l = 0,
        m = 0.0;
    h[k >> 3] = a;
    d = c[k >> 2] | 0;
    e = c[k + 4 >> 2] | 0;
    f = _e(d | 0, e | 0, 52) | 0;
    g = f & 2047;

    switch (g | 0) {
      case 0:
        {
          if (a != 0.0) {
            i = +fe(a * 18446744073709551616.0, b);
            j = i;
            l = (c[b >> 2] | 0) + -64 | 0;
          } else {
            j = a;
            l = 0;
          }

          c[b >> 2] = l;
          m = j;
          break;
        }

      case 2047:
        {
          m = a;
          break;
        }

      default:
        {
          c[b >> 2] = g + -1022;
          c[k >> 2] = d;
          c[k + 4 >> 2] = e & -2146435073 | 1071644672;
          m = +h[k >> 3];
        }
    }

    return +m;
  }

  function ge(a, b) {
    a = +a;
    b = b | 0;
    return + +fe(a, b);
  }

  function he(b) {
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0;
    d = b + 74 | 0;
    e = a[d >> 0] | 0;
    a[d >> 0] = e + 255 | e;
    e = c[b >> 2] | 0;

    if (!(e & 8)) {
      c[b + 8 >> 2] = 0;
      c[b + 4 >> 2] = 0;
      d = c[b + 44 >> 2] | 0;
      c[b + 28 >> 2] = d;
      c[b + 20 >> 2] = d;
      c[b + 16 >> 2] = d + (c[b + 48 >> 2] | 0);
      f = 0;
    } else {
      c[b >> 2] = e | 32;
      f = -1;
    }

    return f | 0;
  }

  function ie(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0;
    f = i;
    i = i + 80 | 0;
    g = f;
    c[b + 36 >> 2] = 18;
    if ((c[b >> 2] & 64 | 0) == 0 ? (c[g >> 2] = c[b + 60 >> 2], c[g + 4 >> 2] = 21505, c[g + 8 >> 2] = f + 12, (Ha(54, g | 0) | 0) != 0) : 0) a[b + 75 >> 0] = -1;
    g = ne(b, d, e) | 0;
    i = f;
    return g | 0;
  }

  function je(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0;
    e = i;
    i = i + 32 | 0;
    f = e;
    g = e + 20 | 0;
    c[f >> 2] = c[a + 60 >> 2];
    c[f + 4 >> 2] = 0;
    c[f + 8 >> 2] = b;
    c[f + 12 >> 2] = g;
    c[f + 16 >> 2] = d;

    if ((ee(Ja(140, f | 0) | 0) | 0) < 0) {
      c[g >> 2] = -1;
      h = -1;
    } else h = c[g >> 2] | 0;

    i = e;
    return h | 0;
  }

  function ke(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;

    do if (a) {
      if ((c[a + 76 >> 2] | 0) <= -1) {
        b = Je(a) | 0;
        break;
      }

      d = (ye(a) | 0) == 0;
      e = Je(a) | 0;
      if (d) b = e;else {
        ze(a);
        b = e;
      }
    } else {
      if (!(c[2253] | 0)) f = 0;else f = ke(c[2253] | 0) | 0;
      xa(8996);
      e = c[2248] | 0;
      if (!e) g = f;else {
        d = e;
        e = f;

        while (1) {
          if ((c[d + 76 >> 2] | 0) > -1) h = ye(d) | 0;else h = 0;
          if ((c[d + 20 >> 2] | 0) >>> 0 > (c[d + 28 >> 2] | 0) >>> 0) i = Je(d) | 0 | e;else i = e;
          if (h) ze(d);
          d = c[d + 56 >> 2] | 0;

          if (!d) {
            g = i;
            break;
          } else e = i;
        }
      }
      Ia(8996);
      b = g;
    } while (0);

    return b | 0;
  }

  function le(b, d) {
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0;
    e = i;
    i = i + 32 | 0;
    f = e + 16 | 0;
    g = e;

    if (Ge(16778, a[d >> 0] | 0, 4) | 0) {
      h = se(d) | 0 | 32768;
      c[g >> 2] = b;
      c[g + 4 >> 2] = h;
      c[g + 8 >> 2] = 438;
      h = ee(Fa(5, g | 0) | 0) | 0;

      if ((h | 0) >= 0) {
        g = ue(h, d) | 0;

        if (!g) {
          c[f >> 2] = h;
          Ca(6, f | 0) | 0;
          j = 0;
        } else j = g;
      } else j = 0;
    } else {
      c[(ce() | 0) >> 2] = 22;
      j = 0;
    }

    i = e;
    return j | 0;
  }

  function me(a) {
    a = a | 0;
    var b = 0,
        d = 0;
    b = i;
    i = i + 16 | 0;
    d = b;
    c[d >> 2] = c[a + 60 >> 2];
    a = ee(Ca(6, d | 0) | 0) | 0;
    i = b;
    return a | 0;
  }

  function ne(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0;
    e = i;
    i = i + 48 | 0;
    f = e + 16 | 0;
    g = e;
    h = e + 32 | 0;
    j = a + 28 | 0;
    k = c[j >> 2] | 0;
    c[h >> 2] = k;
    l = a + 20 | 0;
    m = (c[l >> 2] | 0) - k | 0;
    c[h + 4 >> 2] = m;
    c[h + 8 >> 2] = b;
    c[h + 12 >> 2] = d;
    b = a + 60 | 0;
    k = a + 44 | 0;
    n = h;
    h = 2;
    o = m + d | 0;

    while (1) {
      if (!(c[2242] | 0)) {
        c[f >> 2] = c[b >> 2];
        c[f + 4 >> 2] = n;
        c[f + 8 >> 2] = h;
        p = ee(Na(146, f | 0) | 0) | 0;
      } else {
        Ka(12, a | 0);
        c[g >> 2] = c[b >> 2];
        c[g + 4 >> 2] = n;
        c[g + 8 >> 2] = h;
        m = ee(Na(146, g | 0) | 0) | 0;
        va(0);
        p = m;
      }

      if ((o | 0) == (p | 0)) {
        q = 6;
        break;
      }

      if ((p | 0) < 0) {
        r = n;
        s = h;
        q = 8;
        break;
      }

      m = o - p | 0;
      t = c[n + 4 >> 2] | 0;
      if (p >>> 0 <= t >>> 0) {
        if ((h | 0) == 2) {
          c[j >> 2] = (c[j >> 2] | 0) + p;
          u = t;
          v = p;
          w = n;
          x = 2;
        } else {
          u = t;
          v = p;
          w = n;
          x = h;
        }
      } else {
        y = c[k >> 2] | 0;
        c[j >> 2] = y;
        c[l >> 2] = y;
        u = c[n + 12 >> 2] | 0;
        v = p - t | 0;
        w = n + 8 | 0;
        x = h + -1 | 0;
      }
      c[w >> 2] = (c[w >> 2] | 0) + v;
      c[w + 4 >> 2] = u - v;
      n = w;
      h = x;
      o = m;
    }

    if ((q | 0) == 6) {
      o = c[k >> 2] | 0;
      c[a + 16 >> 2] = o + (c[a + 48 >> 2] | 0);
      k = o;
      c[j >> 2] = k;
      c[l >> 2] = k;
      z = d;
    } else if ((q | 0) == 8) {
      c[a + 16 >> 2] = 0;
      c[j >> 2] = 0;
      c[l >> 2] = 0;
      c[a >> 2] = c[a >> 2] | 32;
      if ((s | 0) == 2) z = 0;else z = d - (c[r + 4 >> 2] | 0) | 0;
    }

    i = e;
    return z | 0;
  }

  function oe(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    return xe(a, 2147483647, b, c) | 0;
  }

  function pe(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
    f = i;
    i = i + 224 | 0;
    g = f + 80 | 0;
    h = f + 96 | 0;
    j = f;
    k = f + 136 | 0;
    l = h;
    m = l + 40 | 0;

    do {
      c[l >> 2] = 0;
      l = l + 4 | 0;
    } while ((l | 0) < (m | 0));

    c[g >> 2] = c[e >> 2];
    if ((Le(0, d, g, j, h) | 0) < 0) n = -1;else {
      if ((c[b + 76 >> 2] | 0) > -1) o = ye(b) | 0;else o = 0;
      e = c[b >> 2] | 0;
      l = e & 32;
      if ((a[b + 74 >> 0] | 0) < 1) c[b >> 2] = e & -33;
      e = b + 48 | 0;

      if (!(c[e >> 2] | 0)) {
        m = b + 44 | 0;
        p = c[m >> 2] | 0;
        c[m >> 2] = k;
        q = b + 28 | 0;
        c[q >> 2] = k;
        r = b + 20 | 0;
        c[r >> 2] = k;
        c[e >> 2] = 80;
        s = b + 16 | 0;
        c[s >> 2] = k + 80;
        k = Le(b, d, g, j, h) | 0;
        if (!p) t = k;else {
          ea(c[b + 36 >> 2] | 0, b | 0, 0, 0) | 0;
          u = (c[r >> 2] | 0) == 0 ? -1 : k;
          c[m >> 2] = p;
          c[e >> 2] = 0;
          c[s >> 2] = 0;
          c[q >> 2] = 0;
          c[r >> 2] = 0;
          t = u;
        }
      } else t = Le(b, d, g, j, h) | 0;

      h = c[b >> 2] | 0;
      c[b >> 2] = h | l;
      if (o) ze(b);
      n = (h & 32 | 0) == 0 ? t : -1;
    }
    i = f;
    return n | 0;
  }

  function qe(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0;
    e = i;
    i = i + 16 | 0;
    f = e;
    c[f >> 2] = d;
    d = oe(a, b, f) | 0;
    i = e;
    return d | 0;
  }

  function re(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0;
    f = i;
    i = i + 16 | 0;
    g = f;
    c[g >> 2] = e;
    e = xe(a, b, d, g) | 0;
    i = f;
    return e | 0;
  }

  function se(b) {
    b = b | 0;
    var c = 0,
        d = 0,
        e = 0,
        f = 0;
    c = (Ee(b, 43) | 0) == 0;
    d = a[b >> 0] | 0;
    e = c ? d << 24 >> 24 != 114 & 1 : 2;
    c = (Ee(b, 120) | 0) == 0;
    f = c ? e : e | 128;
    e = (Ee(b, 101) | 0) == 0;
    b = e ? f : f | 524288;
    f = d << 24 >> 24 == 114 ? b : b | 64;
    b = d << 24 >> 24 == 119 ? f | 512 : f;
    return (d << 24 >> 24 == 97 ? b | 1024 : b) | 0;
  }

  function te(b, d, e, f) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
    g = _(e, d) | 0;
    if ((c[f + 76 >> 2] | 0) > -1) h = ye(f) | 0;else h = 0;
    i = f + 74 | 0;
    j = a[i >> 0] | 0;
    a[i >> 0] = j + 255 | j;
    j = f + 4 | 0;
    i = c[j >> 2] | 0;
    k = (c[f + 8 >> 2] | 0) - i | 0;

    if ((k | 0) > 0) {
      l = k >>> 0 < g >>> 0 ? k : g;
      af(b | 0, i | 0, l | 0) | 0;
      c[j >> 2] = i + l;
      m = b + l | 0;
      n = g - l | 0;
    } else {
      m = b;
      n = g;
    }

    a: do if (!n) o = 13;else {
      b = f + 32 | 0;
      l = m;
      i = n;

      while (1) {
        if (we(f) | 0) {
          p = i;
          break;
        }

        j = ea(c[b >> 2] | 0, f | 0, l | 0, i | 0) | 0;

        if ((j + 1 | 0) >>> 0 < 2) {
          p = i;
          break;
        }

        if ((i | 0) == (j | 0)) {
          o = 13;
          break a;
        } else {
          l = l + j | 0;
          i = i - j | 0;
        }
      }

      if (h) ze(f);
      q = ((g - p | 0) >>> 0) / (d >>> 0) | 0;
    } while (0);

    if ((o | 0) == 13) if (!h) q = e;else {
      ze(f);
      q = e;
    }
    return q | 0;
  }

  function ue(b, d) {
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0;
    e = i;
    i = i + 112 | 0;
    f = e + 40 | 0;
    g = e + 24 | 0;
    h = e + 16 | 0;
    j = e;
    k = e + 52 | 0;
    l = a[d >> 0] | 0;

    if (Ge(16778, l << 24 >> 24, 4) | 0) {
      m = Re(1144) | 0;
      if (!m) n = 0;else {
        o = m;
        p = o + 112 | 0;

        do {
          c[o >> 2] = 0;
          o = o + 4 | 0;
        } while ((o | 0) < (p | 0));

        if (!(Ee(d, 43) | 0)) c[m >> 2] = l << 24 >> 24 == 114 ? 8 : 4;
        if (!(Ee(d, 101) | 0)) q = l;else {
          c[j >> 2] = b;
          c[j + 4 >> 2] = 2;
          c[j + 8 >> 2] = 1;
          wa(221, j | 0) | 0;
          q = a[d >> 0] | 0;
        }

        if (q << 24 >> 24 == 97) {
          c[h >> 2] = b;
          c[h + 4 >> 2] = 3;
          q = wa(221, h | 0) | 0;

          if (!(q & 1024)) {
            c[g >> 2] = b;
            c[g + 4 >> 2] = 4;
            c[g + 8 >> 2] = q | 1024;
            wa(221, g | 0) | 0;
          }

          g = c[m >> 2] | 128;
          c[m >> 2] = g;
          r = g;
        } else r = c[m >> 2] | 0;

        c[m + 60 >> 2] = b;
        c[m + 44 >> 2] = m + 120;
        c[m + 48 >> 2] = 1024;
        g = m + 75 | 0;
        a[g >> 0] = -1;
        if ((r & 8 | 0) == 0 ? (c[f >> 2] = b, c[f + 4 >> 2] = 21505, c[f + 8 >> 2] = k, (Ha(54, f | 0) | 0) == 0) : 0) a[g >> 0] = 10;
        c[m + 32 >> 2] = 19;
        c[m + 36 >> 2] = 18;
        c[m + 40 >> 2] = 3;
        c[m + 12 >> 2] = 1;
        if (!(c[2243] | 0)) c[m + 76 >> 2] = -1;
        xa(8996);
        g = c[2248] | 0;
        c[m + 56 >> 2] = g;
        if (g) c[g + 52 >> 2] = m;
        c[2248] = m;
        Ia(8996);
        n = m;
      }
    } else {
      c[(ce() | 0) >> 2] = 22;
      n = 0;
    }

    i = e;
    return n | 0;
  }

  function ve(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
    f = i;
    i = i + 48 | 0;
    g = f + 16 | 0;
    h = f;
    j = f + 32 | 0;
    c[j >> 2] = d;
    k = j + 4 | 0;
    l = b + 48 | 0;
    m = c[l >> 2] | 0;
    c[k >> 2] = e - ((m | 0) != 0 & 1);
    n = b + 44 | 0;
    c[j + 8 >> 2] = c[n >> 2];
    c[j + 12 >> 2] = m;

    if (!(c[2242] | 0)) {
      c[g >> 2] = c[b + 60 >> 2];
      c[g + 4 >> 2] = j;
      c[g + 8 >> 2] = 2;
      o = ee(Ma(145, g | 0) | 0) | 0;
    } else {
      Ka(13, b | 0);
      c[h >> 2] = c[b + 60 >> 2];
      c[h + 4 >> 2] = j;
      c[h + 8 >> 2] = 2;
      j = ee(Ma(145, h | 0) | 0) | 0;
      va(0);
      o = j;
    }

    if ((o | 0) >= 1) {
      j = c[k >> 2] | 0;

      if (o >>> 0 > j >>> 0) {
        k = c[n >> 2] | 0;
        n = b + 4 | 0;
        c[n >> 2] = k;
        h = k;
        c[b + 8 >> 2] = h + (o - j);
        if (!(c[l >> 2] | 0)) p = e;else {
          c[n >> 2] = h + 1;
          a[d + (e + -1) >> 0] = a[h >> 0] | 0;
          p = e;
        }
      } else p = o;
    } else {
      c[b >> 2] = c[b >> 2] | o & 48 ^ 16;
      c[b + 8 >> 2] = 0;
      c[b + 4 >> 2] = 0;
      p = o;
    }

    i = f;
    return p | 0;
  }

  function we(b) {
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0;
    d = b + 74 | 0;
    e = a[d >> 0] | 0;
    a[d >> 0] = e + 255 | e;
    e = b + 20 | 0;
    d = b + 44 | 0;
    if ((c[e >> 2] | 0) >>> 0 > (c[d >> 2] | 0) >>> 0) ea(c[b + 36 >> 2] | 0, b | 0, 0, 0) | 0;
    c[b + 16 >> 2] = 0;
    c[b + 28 >> 2] = 0;
    c[e >> 2] = 0;
    e = c[b >> 2] | 0;
    if (e & 20) {
      if (!(e & 4)) f = -1;else {
        c[b >> 2] = e | 32;
        f = -1;
      }
    } else {
      e = c[d >> 2] | 0;
      c[b + 8 >> 2] = e;
      c[b + 4 >> 2] = e;
      f = 0;
    }
    return f | 0;
  }

  function xe(b, d, e, f) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
    g = i;
    i = i + 128 | 0;
    h = g + 112 | 0;
    j = g;
    k = j;
    l = 9020;
    m = k + 112 | 0;

    do {
      c[k >> 2] = c[l >> 2];
      k = k + 4 | 0;
      l = l + 4 | 0;
    } while ((k | 0) < (m | 0));

    if ((d + -1 | 0) >>> 0 > 2147483646) {
      if (!d) {
        n = h;
        o = 1;
        p = 4;
      } else {
        c[(ce() | 0) >> 2] = 75;
        q = -1;
      }
    } else {
      n = b;
      o = d;
      p = 4;
    }

    if ((p | 0) == 4) {
      p = -2 - n | 0;
      d = o >>> 0 > p >>> 0 ? p : o;
      c[j + 48 >> 2] = d;
      o = j + 20 | 0;
      c[o >> 2] = n;
      c[j + 44 >> 2] = n;
      p = n + d | 0;
      n = j + 16 | 0;
      c[n >> 2] = p;
      c[j + 28 >> 2] = p;
      p = pe(j, e, f) | 0;
      if (!d) q = p;else {
        d = c[o >> 2] | 0;
        a[d + (((d | 0) == (c[n >> 2] | 0)) << 31 >> 31) >> 0] = 0;
        q = p;
      }
    }

    i = g;
    return q | 0;
  }

  function ye(a) {
    a = a | 0;
    return 0;
  }

  function ze(a) {
    a = a | 0;
    return;
  }

  function Ae(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
    f = e + 16 | 0;
    g = c[f >> 2] | 0;
    if (!g) {
      if (!(he(e) | 0)) {
        h = c[f >> 2] | 0;
        i = 4;
      } else j = 0;
    } else {
      h = g;
      i = 4;
    }

    a: do if ((i | 0) == 4) {
      g = e + 20 | 0;
      f = c[g >> 2] | 0;

      if ((h - f | 0) >>> 0 < d >>> 0) {
        j = ea(c[e + 36 >> 2] | 0, e | 0, b | 0, d | 0) | 0;
        break;
      }

      b: do if ((a[e + 75 >> 0] | 0) > -1) {
        k = d;

        while (1) {
          if (!k) {
            l = d;
            m = b;
            n = f;
            o = 0;
            break b;
          }

          p = k + -1 | 0;

          if ((a[b + p >> 0] | 0) == 10) {
            q = k;
            break;
          } else k = p;
        }

        if ((ea(c[e + 36 >> 2] | 0, e | 0, b | 0, q | 0) | 0) >>> 0 < q >>> 0) {
          j = q;
          break a;
        }

        l = d - q | 0;
        m = b + q | 0;
        n = c[g >> 2] | 0;
        o = q;
      } else {
        l = d;
        m = b;
        n = f;
        o = 0;
      } while (0);

      af(n | 0, m | 0, l | 0) | 0;
      c[g >> 2] = (c[g >> 2] | 0) + l;
      j = o + l | 0;
    } while (0);

    return j | 0;
  }

  function Be(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
    f = _(d, b) | 0;

    if ((c[e + 76 >> 2] | 0) > -1) {
      g = (ye(e) | 0) == 0;
      h = Ae(a, f, e) | 0;
      if (g) i = h;else {
        ze(e);
        i = h;
      }
    } else i = Ae(a, f, e) | 0;

    if ((i | 0) == (f | 0)) j = d;else j = (i >>> 0) / (b >>> 0) | 0;
    return j | 0;
  }

  function Ce(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0;
    b = (c[a >> 2] & 1 | 0) != 0;

    if (!b) {
      xa(8996);
      d = c[a + 52 >> 2] | 0;
      e = a + 56 | 0;
      if (d) c[d + 56 >> 2] = c[e >> 2];
      f = c[e >> 2] | 0;
      if (f) c[f + 52 >> 2] = d;
      if ((c[2248] | 0) == (a | 0)) c[2248] = f;
      Ia(8996);
    }

    f = ke(a) | 0;
    d = ma(c[a + 12 >> 2] | 0, a | 0) | 0 | f;
    f = c[a + 92 >> 2] | 0;
    if (f) Se(f);
    if (!b) Se(a);
    return d | 0;
  }

  function De(b, d) {
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
    e = d & 255;

    a: do if (!e) f = b + (Fe(b) | 0) | 0;else {
      if (!(b & 3)) g = b;else {
        h = d & 255;
        i = b;

        while (1) {
          j = a[i >> 0] | 0;

          if (j << 24 >> 24 == 0 ? 1 : j << 24 >> 24 == h << 24 >> 24) {
            f = i;
            break a;
          }

          j = i + 1 | 0;

          if (!(j & 3)) {
            g = j;
            break;
          } else i = j;
        }
      }
      i = _(e, 16843009) | 0;
      h = c[g >> 2] | 0;

      b: do if (!((h & -2139062144 ^ -2139062144) & h + -16843009)) {
        j = h;
        k = g;

        while (1) {
          l = j ^ i;

          if ((l & -2139062144 ^ -2139062144) & l + -16843009) {
            m = k;
            break b;
          }

          l = k + 4 | 0;
          j = c[l >> 2] | 0;

          if ((j & -2139062144 ^ -2139062144) & j + -16843009) {
            m = l;
            break;
          } else k = l;
        }
      } else m = g; while (0);

      i = d & 255;
      h = m;

      while (1) {
        k = a[h >> 0] | 0;

        if (k << 24 >> 24 == 0 ? 1 : k << 24 >> 24 == i << 24 >> 24) {
          f = h;
          break;
        } else h = h + 1 | 0;
      }
    } while (0);

    return f | 0;
  }

  function Ee(b, c) {
    b = b | 0;
    c = c | 0;
    var d = 0;
    d = De(b, c) | 0;
    return ((a[d >> 0] | 0) == (c & 255) << 24 >> 24 ? d : 0) | 0;
  }

  function Fe(b) {
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
    d = b;

    a: do if (!(d & 3)) {
      e = b;
      f = 4;
    } else {
      g = b;
      h = d;

      while (1) {
        if (!(a[g >> 0] | 0)) {
          i = h;
          break a;
        }

        j = g + 1 | 0;
        h = j;

        if (!(h & 3)) {
          e = j;
          f = 4;
          break;
        } else g = j;
      }
    } while (0);

    if ((f | 0) == 4) {
      f = e;

      while (1) {
        e = c[f >> 2] | 0;
        if (!((e & -2139062144 ^ -2139062144) & e + -16843009)) f = f + 4 | 0;else {
          k = e;
          l = f;
          break;
        }
      }

      if (!((k & 255) << 24 >> 24)) m = l;else {
        k = l;

        while (1) {
          l = k + 1 | 0;

          if (!(a[l >> 0] | 0)) {
            m = l;
            break;
          } else k = l;
        }
      }
      i = m;
    }

    return i - d | 0;
  }

  function Ge(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0;
    f = d & 255;
    g = (e | 0) != 0;

    a: do if (g & (b & 3 | 0) != 0) {
      h = d & 255;
      i = e;
      j = b;

      while (1) {
        if ((a[j >> 0] | 0) == h << 24 >> 24) {
          k = i;
          l = j;
          m = 6;
          break a;
        }

        n = j + 1 | 0;
        o = i + -1 | 0;
        p = (o | 0) != 0;

        if (p & (n & 3 | 0) != 0) {
          i = o;
          j = n;
        } else {
          q = o;
          r = p;
          s = n;
          m = 5;
          break;
        }
      }
    } else {
      q = e;
      r = g;
      s = b;
      m = 5;
    } while (0);

    if ((m | 0) == 5) if (r) {
      k = q;
      l = s;
      m = 6;
    } else {
      t = 0;
      u = s;
    }

    b: do if ((m | 0) == 6) {
      s = d & 255;

      if ((a[l >> 0] | 0) == s << 24 >> 24) {
        t = k;
        u = l;
      } else {
        q = _(f, 16843009) | 0;

        c: do if (k >>> 0 > 3) {
          r = k;
          b = l;

          while (1) {
            g = c[b >> 2] ^ q;

            if ((g & -2139062144 ^ -2139062144) & g + -16843009) {
              v = r;
              w = b;
              break;
            }

            g = b + 4 | 0;
            e = r + -4 | 0;

            if (e >>> 0 > 3) {
              r = e;
              b = g;
            } else {
              x = e;
              y = g;
              m = 11;
              break c;
            }
          }

          z = v;
          A = w;
        } else {
          x = k;
          y = l;
          m = 11;
        } while (0);

        if ((m | 0) == 11) if (!x) {
          t = 0;
          u = y;
          break;
        } else {
          z = x;
          A = y;
        }

        while (1) {
          if ((a[A >> 0] | 0) == s << 24 >> 24) {
            t = z;
            u = A;
            break b;
          }

          q = A + 1 | 0;
          z = z + -1 | 0;

          if (!z) {
            t = 0;
            u = q;
            break;
          } else A = q;
        }
      }
    } while (0);

    return ((t | 0) != 0 ? u : 0) | 0;
  }

  function He(a, b) {
    a = a | 0;
    b = b | 0;
    var c = 0;
    if (!a) c = 0;else c = Ie(a, b, 0) | 0;
    return c | 0;
  }

  function Ie(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;

    do if (b) {
      if (d >>> 0 < 128) {
        a[b >> 0] = d;
        f = 1;
        break;
      }

      if (d >>> 0 < 2048) {
        a[b >> 0] = d >>> 6 | 192;
        a[b + 1 >> 0] = d & 63 | 128;
        f = 2;
        break;
      }

      if (d >>> 0 < 55296 | (d & -8192 | 0) == 57344) {
        a[b >> 0] = d >>> 12 | 224;
        a[b + 1 >> 0] = d >>> 6 & 63 | 128;
        a[b + 2 >> 0] = d & 63 | 128;
        f = 3;
        break;
      }

      if ((d + -65536 | 0) >>> 0 < 1048576) {
        a[b >> 0] = d >>> 18 | 240;
        a[b + 1 >> 0] = d >>> 12 & 63 | 128;
        a[b + 2 >> 0] = d >>> 6 & 63 | 128;
        a[b + 3 >> 0] = d & 63 | 128;
        f = 4;
        break;
      } else {
        c[(ce() | 0) >> 2] = 84;
        f = -1;
        break;
      }
    } else f = 1; while (0);

    return f | 0;
  }

  function Je(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
    b = a + 20 | 0;
    d = a + 28 | 0;
    if ((c[b >> 2] | 0) >>> 0 > (c[d >> 2] | 0) >>> 0 ? (ea(c[a + 36 >> 2] | 0, a | 0, 0, 0) | 0, (c[b >> 2] | 0) == 0) : 0) e = -1;else {
      f = a + 4 | 0;
      g = c[f >> 2] | 0;
      h = a + 8 | 0;
      i = c[h >> 2] | 0;
      if (g >>> 0 < i >>> 0) ea(c[a + 40 >> 2] | 0, a | 0, g - i | 0, 1) | 0;
      c[a + 16 >> 2] = 0;
      c[d >> 2] = 0;
      c[b >> 2] = 0;
      c[h >> 2] = 0;
      c[f >> 2] = 0;
      e = 0;
    }
    return e | 0;
  }

  function Ke(a) {
    a = a | 0;
    if (!(c[a + 68 >> 2] | 0)) ze(a);
    return;
  }

  function Le(e, f, g, j, l) {
    e = e | 0;
    f = f | 0;
    g = g | 0;
    j = j | 0;
    l = l | 0;
    var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 0,
        na = 0,
        oa = 0,
        pa = 0,
        qa = 0,
        ra = 0,
        sa = 0,
        ta = 0,
        ua = 0,
        va = 0,
        wa = 0,
        xa = 0,
        ya = 0,
        za = 0,
        Aa = 0,
        Ba = 0,
        Ca = 0,
        Da = 0,
        Ea = 0,
        Fa = 0,
        Ga = 0,
        Ha = 0,
        Ia = 0,
        Ja = 0,
        Ka = 0,
        La = 0,
        Ma = 0,
        Na = 0,
        Oa = 0,
        Pa = 0,
        Qa = 0,
        Ra = 0,
        Sa = 0,
        Ta = 0,
        Ua = 0,
        Va = 0,
        Wa = 0,
        Xa = 0,
        Ya = 0,
        Za = 0,
        _a = 0,
        $a = 0,
        ab = 0.0,
        bb = 0.0,
        cb = 0,
        db = 0,
        eb = 0,
        fb = 0,
        gb = 0,
        hb = 0.0,
        ib = 0.0,
        jb = 0.0,
        kb = 0.0,
        lb = 0,
        mb = 0,
        nb = 0,
        ob = 0,
        pb = 0,
        qb = 0,
        rb = 0,
        sb = 0,
        tb = 0.0,
        ub = 0,
        vb = 0,
        wb = 0,
        xb = 0,
        yb = 0,
        zb = 0,
        Ab = 0,
        Bb = 0,
        Cb = 0,
        Db = 0,
        Eb = 0,
        Fb = 0,
        Gb = 0,
        Hb = 0,
        Ib = 0,
        Jb = 0,
        Kb = 0,
        Lb = 0,
        Mb = 0,
        Nb = 0,
        Ob = 0,
        Pb = 0,
        Qb = 0,
        Rb = 0,
        Sb = 0,
        Tb = 0,
        Ub = 0,
        Vb = 0.0,
        Wb = 0.0,
        Xb = 0.0,
        Yb = 0,
        Zb = 0,
        _b = 0,
        $b = 0,
        ac = 0,
        bc = 0,
        cc = 0,
        dc = 0,
        ec = 0,
        fc = 0,
        gc = 0,
        hc = 0,
        ic = 0,
        jc = 0,
        kc = 0,
        lc = 0,
        mc = 0,
        nc = 0,
        oc = 0,
        pc = 0,
        qc = 0,
        rc = 0,
        sc = 0,
        tc = 0,
        uc = 0,
        vc = 0,
        wc = 0,
        xc = 0,
        yc = 0,
        zc = 0,
        Ac = 0,
        Bc = 0,
        Cc = 0,
        Dc = 0,
        Ec = 0;
    m = i;
    i = i + 624 | 0;
    n = m + 24 | 0;
    o = m + 16 | 0;
    p = m + 588 | 0;
    q = m + 576 | 0;
    r = m;
    s = m + 536 | 0;
    t = m + 8 | 0;
    u = m + 528 | 0;
    v = (e | 0) != 0;
    w = s + 40 | 0;
    x = w;
    y = s + 39 | 0;
    s = t + 4 | 0;
    z = q + 12 | 0;
    A = q + 11 | 0;
    q = p;
    B = z;
    D = B - q | 0;
    E = -2 - q | 0;
    F = B + 2 | 0;
    G = n + 288 | 0;
    H = p + 9 | 0;
    I = H;
    J = p + 8 | 0;
    K = 0;
    L = f;
    f = 0;
    M = 0;

    a: while (1) {
      do if ((K | 0) > -1) {
        if ((f | 0) > (2147483647 - K | 0)) {
          c[(ce() | 0) >> 2] = 75;
          N = -1;
          break;
        } else {
          N = f + K | 0;
          break;
        }
      } else N = K; while (0);

      O = a[L >> 0] | 0;

      if (!(O << 24 >> 24)) {
        P = N;
        Q = M;
        R = 245;
        break;
      } else {
        S = O;
        T = L;
      }

      b: while (1) {
        switch (S << 24 >> 24) {
          case 37:
            {
              U = T;
              V = T;
              R = 9;
              break b;
              break;
            }

          case 0:
            {
              W = T;
              X = T;
              break b;
              break;
            }

          default:
            {}
        }

        O = T + 1 | 0;
        S = a[O >> 0] | 0;
        T = O;
      }

      c: do if ((R | 0) == 9) while (1) {
        R = 0;

        if ((a[U + 1 >> 0] | 0) != 37) {
          W = U;
          X = V;
          break c;
        }

        O = V + 1 | 0;
        Y = U + 2 | 0;

        if ((a[Y >> 0] | 0) == 37) {
          U = Y;
          V = O;
          R = 9;
        } else {
          W = Y;
          X = O;
          break;
        }
      } while (0);

      O = X - L | 0;
      if (v ? (c[e >> 2] & 32 | 0) == 0 : 0) Ae(L, O, e) | 0;

      if ((X | 0) != (L | 0)) {
        K = N;
        L = W;
        f = O;
        continue;
      }

      Y = W + 1 | 0;
      Z = a[Y >> 0] | 0;
      $ = (Z << 24 >> 24) + -48 | 0;

      if ($ >>> 0 < 10) {
        aa = (a[W + 2 >> 0] | 0) == 36;
        ba = aa ? W + 3 | 0 : Y;
        ca = a[ba >> 0] | 0;
        da = aa ? $ : -1;
        ea = aa ? 1 : M;
        fa = ba;
      } else {
        ca = Z;
        da = -1;
        ea = M;
        fa = Y;
      }

      Y = ca << 24 >> 24;

      d: do if ((Y & -32 | 0) == 32) {
        Z = Y;
        ba = ca;
        aa = 0;
        $ = fa;

        while (1) {
          if (!(1 << Z + -32 & 75913)) {
            ga = ba;
            ha = aa;
            ia = $;
            break d;
          }

          ja = 1 << (ba << 24 >> 24) + -32 | aa;
          ka = $ + 1 | 0;
          la = a[ka >> 0] | 0;
          Z = la << 24 >> 24;

          if ((Z & -32 | 0) != 32) {
            ga = la;
            ha = ja;
            ia = ka;
            break;
          } else {
            ba = la;
            aa = ja;
            $ = ka;
          }
        }
      } else {
        ga = ca;
        ha = 0;
        ia = fa;
      } while (0);

      do if (ga << 24 >> 24 == 42) {
        Y = ia + 1 | 0;
        $ = (a[Y >> 0] | 0) + -48 | 0;

        if ($ >>> 0 < 10 ? (a[ia + 2 >> 0] | 0) == 36 : 0) {
          c[l + ($ << 2) >> 2] = 10;
          ma = 1;
          na = ia + 3 | 0;
          oa = c[j + ((a[Y >> 0] | 0) + -48 << 3) >> 2] | 0;
        } else {
          if (ea) {
            pa = -1;
            break a;
          }

          if (!v) {
            qa = ha;
            ra = Y;
            sa = 0;
            ta = 0;
            break;
          }

          $ = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
          aa = c[$ >> 2] | 0;
          c[g >> 2] = $ + 4;
          ma = 0;
          na = Y;
          oa = aa;
        }

        if ((oa | 0) < 0) {
          qa = ha | 8192;
          ra = na;
          sa = ma;
          ta = 0 - oa | 0;
        } else {
          qa = ha;
          ra = na;
          sa = ma;
          ta = oa;
        }
      } else {
        aa = (ga << 24 >> 24) + -48 | 0;

        if (aa >>> 0 < 10) {
          Y = ia;
          $ = 0;
          ba = aa;

          while (1) {
            aa = ($ * 10 | 0) + ba | 0;
            Z = Y + 1 | 0;
            ba = (a[Z >> 0] | 0) + -48 | 0;

            if (ba >>> 0 >= 10) {
              ua = aa;
              va = Z;
              break;
            } else {
              Y = Z;
              $ = aa;
            }
          }

          if ((ua | 0) < 0) {
            pa = -1;
            break a;
          } else {
            qa = ha;
            ra = va;
            sa = ea;
            ta = ua;
          }
        } else {
          qa = ha;
          ra = ia;
          sa = ea;
          ta = 0;
        }
      } while (0);

      e: do if ((a[ra >> 0] | 0) == 46) {
        $ = ra + 1 | 0;
        Y = a[$ >> 0] | 0;

        if (Y << 24 >> 24 != 42) {
          ba = (Y << 24 >> 24) + -48 | 0;

          if (ba >>> 0 < 10) {
            wa = $;
            xa = 0;
            ya = ba;
          } else {
            za = $;
            Aa = 0;
            break;
          }

          while (1) {
            $ = (xa * 10 | 0) + ya | 0;
            ba = wa + 1 | 0;
            ya = (a[ba >> 0] | 0) + -48 | 0;

            if (ya >>> 0 >= 10) {
              za = ba;
              Aa = $;
              break e;
            } else {
              wa = ba;
              xa = $;
            }
          }
        }

        $ = ra + 2 | 0;
        ba = (a[$ >> 0] | 0) + -48 | 0;

        if (ba >>> 0 < 10 ? (a[ra + 3 >> 0] | 0) == 36 : 0) {
          c[l + (ba << 2) >> 2] = 10;
          za = ra + 4 | 0;
          Aa = c[j + ((a[$ >> 0] | 0) + -48 << 3) >> 2] | 0;
          break;
        }

        if (sa) {
          pa = -1;
          break a;
        }

        if (v) {
          ba = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
          Y = c[ba >> 2] | 0;
          c[g >> 2] = ba + 4;
          za = $;
          Aa = Y;
        } else {
          za = $;
          Aa = 0;
        }
      } else {
        za = ra;
        Aa = -1;
      } while (0);

      $ = za;
      Y = 0;

      while (1) {
        ba = (a[$ >> 0] | 0) + -65 | 0;

        if (ba >>> 0 > 57) {
          pa = -1;
          break a;
        }

        aa = $ + 1 | 0;
        Z = a[17814 + (Y * 58 | 0) + ba >> 0] | 0;
        ba = Z & 255;

        if ((ba + -1 | 0) >>> 0 < 8) {
          $ = aa;
          Y = ba;
        } else {
          Ba = aa;
          Ca = Z;
          Da = ba;
          Ea = $;
          Fa = Y;
          break;
        }
      }

      if (!(Ca << 24 >> 24)) {
        pa = -1;
        break;
      }

      Y = (da | 0) > -1;

      do if (Ca << 24 >> 24 == 19) {
        if (Y) {
          pa = -1;
          break a;
        } else R = 52;
      } else {
        if (Y) {
          c[l + (da << 2) >> 2] = Da;
          $ = j + (da << 3) | 0;
          ba = c[$ + 4 >> 2] | 0;
          Z = r;
          c[Z >> 2] = c[$ >> 2];
          c[Z + 4 >> 2] = ba;
          R = 52;
          break;
        }

        if (!v) {
          pa = 0;
          break a;
        }

        Oe(r, Da, g);
      } while (0);

      if ((R | 0) == 52 ? (R = 0, !v) : 0) {
        K = N;
        L = Ba;
        f = O;
        M = sa;
        continue;
      }

      Y = a[Ea >> 0] | 0;
      ba = (Fa | 0) != 0 & (Y & 15 | 0) == 3 ? Y & -33 : Y;
      Y = qa & -65537;
      Z = (qa & 8192 | 0) == 0 ? qa : Y;

      f: do switch (ba | 0) {
        case 110:
          {
            switch (Fa | 0) {
              case 0:
                {
                  c[c[r >> 2] >> 2] = N;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              case 1:
                {
                  c[c[r >> 2] >> 2] = N;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              case 2:
                {
                  $ = c[r >> 2] | 0;
                  c[$ >> 2] = N;
                  c[$ + 4 >> 2] = ((N | 0) < 0) << 31 >> 31;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              case 3:
                {
                  b[c[r >> 2] >> 1] = N;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              case 4:
                {
                  a[c[r >> 2] >> 0] = N;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              case 6:
                {
                  c[c[r >> 2] >> 2] = N;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              case 7:
                {
                  $ = c[r >> 2] | 0;
                  c[$ >> 2] = N;
                  c[$ + 4 >> 2] = ((N | 0) < 0) << 31 >> 31;
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                  break;
                }

              default:
                {
                  K = N;
                  L = Ba;
                  f = O;
                  M = sa;
                  continue a;
                }
            }

            break;
          }

        case 112:
          {
            Ga = Z | 8;
            Ha = Aa >>> 0 > 8 ? Aa : 8;
            Ia = 120;
            R = 64;
            break;
          }

        case 88:
        case 120:
          {
            Ga = Z;
            Ha = Aa;
            Ia = ba;
            R = 64;
            break;
          }

        case 111:
          {
            $ = r;
            aa = c[$ >> 2] | 0;
            ka = c[$ + 4 >> 2] | 0;
            if ((aa | 0) == 0 & (ka | 0) == 0) Ja = w;else {
              $ = w;
              ja = aa;
              aa = ka;

              while (1) {
                ka = $ + -1 | 0;
                a[ka >> 0] = ja & 7 | 48;
                ja = _e(ja | 0, aa | 0, 3) | 0;
                aa = C;

                if ((ja | 0) == 0 & (aa | 0) == 0) {
                  Ja = ka;
                  break;
                } else $ = ka;
              }
            }

            if (!(Z & 8)) {
              Ka = Ja;
              La = Z;
              Ma = Aa;
              Na = 0;
              Oa = 18294;
              R = 77;
            } else {
              $ = x - Ja + 1 | 0;
              Ka = Ja;
              La = Z;
              Ma = (Aa | 0) < ($ | 0) ? $ : Aa;
              Na = 0;
              Oa = 18294;
              R = 77;
            }

            break;
          }

        case 105:
        case 100:
          {
            $ = r;
            aa = c[$ >> 2] | 0;
            ja = c[$ + 4 >> 2] | 0;

            if ((ja | 0) < 0) {
              $ = Xe(0, 0, aa | 0, ja | 0) | 0;
              ka = C;
              la = r;
              c[la >> 2] = $;
              c[la + 4 >> 2] = ka;
              Pa = $;
              Qa = ka;
              Ra = 1;
              Sa = 18294;
              R = 76;
              break f;
            }

            if (!(Z & 2048)) {
              ka = Z & 1;
              Pa = aa;
              Qa = ja;
              Ra = ka;
              Sa = (ka | 0) == 0 ? 18294 : 18296;
              R = 76;
            } else {
              Pa = aa;
              Qa = ja;
              Ra = 1;
              Sa = 18295;
              R = 76;
            }

            break;
          }

        case 117:
          {
            ja = r;
            Pa = c[ja >> 2] | 0;
            Qa = c[ja + 4 >> 2] | 0;
            Ra = 0;
            Sa = 18294;
            R = 76;
            break;
          }

        case 99:
          {
            a[y >> 0] = c[r >> 2];
            Ta = y;
            Ua = Y;
            Va = 1;
            Wa = 0;
            Xa = 18294;
            Ya = w;
            break;
          }

        case 109:
          {
            Za = de(c[(ce() | 0) >> 2] | 0) | 0;
            R = 82;
            break;
          }

        case 115:
          {
            ja = c[r >> 2] | 0;
            Za = (ja | 0) != 0 ? ja : 18304;
            R = 82;
            break;
          }

        case 67:
          {
            c[t >> 2] = c[r >> 2];
            c[s >> 2] = 0;
            c[r >> 2] = t;
            _a = -1;
            R = 86;
            break;
          }

        case 83:
          {
            if (!Aa) {
              Qe(e, 32, ta, 0, Z);
              $a = 0;
              R = 98;
            } else {
              _a = Aa;
              R = 86;
            }

            break;
          }

        case 65:
        case 71:
        case 70:
        case 69:
        case 97:
        case 103:
        case 102:
        case 101:
          {
            ab = +h[r >> 3];
            c[o >> 2] = 0;
            h[k >> 3] = ab;
            if ((c[k + 4 >> 2] | 0) >= 0) {
              if (!(Z & 2048)) {
                ja = Z & 1;
                bb = ab;
                cb = ja;
                db = (ja | 0) == 0 ? 18312 : 18317;
              } else {
                bb = ab;
                cb = 1;
                db = 18314;
              }
            } else {
              bb = -ab;
              cb = 1;
              db = 18311;
            }
            h[k >> 3] = bb;
            ja = c[k + 4 >> 2] & 2146435072;

            do if (ja >>> 0 < 2146435072 | (ja | 0) == 2146435072 & 0 < 0) {
              ab = +ge(bb, o) * 2.0;
              aa = ab != 0.0;
              if (aa) c[o >> 2] = (c[o >> 2] | 0) + -1;
              ka = ba | 32;

              if ((ka | 0) == 97) {
                $ = ba & 32;
                la = ($ | 0) == 0 ? db : db + 9 | 0;
                eb = cb | 2;
                fb = 12 - Aa | 0;

                do if (!(Aa >>> 0 > 11 | (fb | 0) == 0)) {
                  gb = fb;
                  hb = 8.0;

                  while (1) {
                    gb = gb + -1 | 0;
                    ib = hb * 16.0;

                    if (!gb) {
                      jb = ib;
                      break;
                    } else hb = ib;
                  }

                  if ((a[la >> 0] | 0) == 45) {
                    kb = -(jb + (-ab - jb));
                    break;
                  } else {
                    kb = ab + jb - jb;
                    break;
                  }
                } else kb = ab; while (0);

                fb = c[o >> 2] | 0;
                gb = (fb | 0) < 0 ? 0 - fb | 0 : fb;
                lb = Pe(gb, ((gb | 0) < 0) << 31 >> 31, z) | 0;

                if ((lb | 0) == (z | 0)) {
                  a[A >> 0] = 48;
                  mb = A;
                } else mb = lb;

                a[mb + -1 >> 0] = (fb >> 31 & 2) + 43;
                fb = mb + -2 | 0;
                a[fb >> 0] = ba + 15;
                lb = (Aa | 0) < 1;
                gb = (Z & 8 | 0) == 0;
                hb = kb;
                nb = p;

                while (1) {
                  ob = ~~hb;
                  pb = nb + 1 | 0;
                  a[nb >> 0] = d[18278 + ob >> 0] | $;
                  hb = (hb - +(ob | 0)) * 16.0;

                  do if ((pb - q | 0) == 1) {
                    if (gb & (lb & hb == 0.0)) {
                      qb = pb;
                      break;
                    }

                    a[pb >> 0] = 46;
                    qb = nb + 2 | 0;
                  } else qb = pb; while (0);

                  if (!(hb != 0.0)) {
                    rb = qb;
                    break;
                  } else nb = qb;
                }

                nb = rb;
                lb = (Aa | 0) != 0 & (E + nb | 0) < (Aa | 0) ? F + Aa - fb | 0 : D - fb + nb | 0;
                gb = lb + eb | 0;
                Qe(e, 32, ta, gb, Z);
                if (!(c[e >> 2] & 32)) Ae(la, eb, e) | 0;
                Qe(e, 48, ta, gb, Z ^ 65536);
                $ = nb - q | 0;
                if (!(c[e >> 2] & 32)) Ae(p, $, e) | 0;
                nb = B - fb | 0;
                Qe(e, 48, lb - ($ + nb) | 0, 0, 0);
                if (!(c[e >> 2] & 32)) Ae(fb, nb, e) | 0;
                Qe(e, 32, ta, gb, Z ^ 8192);
                sb = (gb | 0) < (ta | 0) ? ta : gb;
                break;
              }

              gb = (Aa | 0) < 0 ? 6 : Aa;

              if (aa) {
                nb = (c[o >> 2] | 0) + -28 | 0;
                c[o >> 2] = nb;
                tb = ab * 268435456.0;
                ub = nb;
              } else {
                tb = ab;
                ub = c[o >> 2] | 0;
              }

              nb = (ub | 0) < 0 ? n : G;
              $ = nb;
              hb = tb;
              lb = nb;

              while (1) {
                pb = ~~hb >>> 0;
                c[lb >> 2] = pb;
                ob = lb + 4 | 0;
                hb = (hb - +(pb >>> 0)) * 1.0e9;

                if (!(hb != 0.0)) {
                  vb = ob;
                  break;
                } else lb = ob;
              }

              lb = c[o >> 2] | 0;

              if ((lb | 0) > 0) {
                aa = lb;
                fb = nb;
                eb = vb;

                while (1) {
                  la = (aa | 0) > 29 ? 29 : aa;
                  ob = eb + -4 | 0;

                  do if (ob >>> 0 < fb >>> 0) wb = fb;else {
                    pb = 0;
                    xb = ob;

                    while (1) {
                      yb = $e(c[xb >> 2] | 0, 0, la | 0) | 0;
                      zb = Ye(yb | 0, C | 0, pb | 0, 0) | 0;
                      yb = C;
                      Ab = kf(zb | 0, yb | 0, 1e9, 0) | 0;
                      c[xb >> 2] = Ab;
                      Ab = jf(zb | 0, yb | 0, 1e9, 0) | 0;
                      xb = xb + -4 | 0;

                      if (xb >>> 0 < fb >>> 0) {
                        Bb = Ab;
                        break;
                      } else pb = Ab;
                    }

                    if (!Bb) {
                      wb = fb;
                      break;
                    }

                    pb = fb + -4 | 0;
                    c[pb >> 2] = Bb;
                    wb = pb;
                  } while (0);

                  ob = eb;

                  while (1) {
                    if (ob >>> 0 <= wb >>> 0) {
                      Cb = ob;
                      break;
                    }

                    pb = ob + -4 | 0;
                    if (!(c[pb >> 2] | 0)) ob = pb;else {
                      Cb = ob;
                      break;
                    }
                  }

                  ob = (c[o >> 2] | 0) - la | 0;
                  c[o >> 2] = ob;

                  if ((ob | 0) > 0) {
                    aa = ob;
                    fb = wb;
                    eb = Cb;
                  } else {
                    Db = ob;
                    Eb = wb;
                    Fb = Cb;
                    break;
                  }
                }
              } else {
                Db = lb;
                Eb = nb;
                Fb = vb;
              }

              if ((Db | 0) < 0) {
                eb = ((gb + 25 | 0) / 9 | 0) + 1 | 0;
                fb = (ka | 0) == 102;
                aa = Db;
                ob = Eb;
                pb = Fb;

                while (1) {
                  xb = 0 - aa | 0;
                  Ab = (xb | 0) > 9 ? 9 : xb;

                  do if (ob >>> 0 < pb >>> 0) {
                    xb = (1 << Ab) + -1 | 0;
                    yb = 1e9 >>> Ab;
                    zb = 0;
                    Gb = ob;

                    while (1) {
                      Hb = c[Gb >> 2] | 0;
                      c[Gb >> 2] = (Hb >>> Ab) + zb;
                      Ib = _(Hb & xb, yb) | 0;
                      Gb = Gb + 4 | 0;

                      if (Gb >>> 0 >= pb >>> 0) {
                        Jb = Ib;
                        break;
                      } else zb = Ib;
                    }

                    zb = (c[ob >> 2] | 0) == 0 ? ob + 4 | 0 : ob;

                    if (!Jb) {
                      Kb = zb;
                      Lb = pb;
                      break;
                    }

                    c[pb >> 2] = Jb;
                    Kb = zb;
                    Lb = pb + 4 | 0;
                  } else {
                    Kb = (c[ob >> 2] | 0) == 0 ? ob + 4 | 0 : ob;
                    Lb = pb;
                  } while (0);

                  la = fb ? nb : Kb;
                  zb = (Lb - la >> 2 | 0) > (eb | 0) ? la + (eb << 2) | 0 : Lb;
                  aa = (c[o >> 2] | 0) + Ab | 0;
                  c[o >> 2] = aa;

                  if ((aa | 0) >= 0) {
                    Mb = Kb;
                    Nb = zb;
                    break;
                  } else {
                    ob = Kb;
                    pb = zb;
                  }
                }
              } else {
                Mb = Eb;
                Nb = Fb;
              }

              do if (Mb >>> 0 < Nb >>> 0) {
                pb = ($ - Mb >> 2) * 9 | 0;
                ob = c[Mb >> 2] | 0;

                if (ob >>> 0 < 10) {
                  Ob = pb;
                  break;
                } else {
                  Pb = pb;
                  Qb = 10;
                }

                while (1) {
                  Qb = Qb * 10 | 0;
                  pb = Pb + 1 | 0;

                  if (ob >>> 0 < Qb >>> 0) {
                    Ob = pb;
                    break;
                  } else Pb = pb;
                }
              } else Ob = 0; while (0);

              ob = (ka | 0) == 103;
              Ab = (gb | 0) != 0;
              pb = gb - ((ka | 0) != 102 ? Ob : 0) + ((Ab & ob) << 31 >> 31) | 0;

              if ((pb | 0) < (((Nb - $ >> 2) * 9 | 0) + -9 | 0)) {
                aa = pb + 9216 | 0;
                pb = (aa | 0) / 9 | 0;
                eb = nb + (pb + -1023 << 2) | 0;
                fb = ((aa | 0) % 9 | 0) + 1 | 0;

                if ((fb | 0) < 9) {
                  aa = 10;
                  lb = fb;

                  while (1) {
                    fb = aa * 10 | 0;
                    lb = lb + 1 | 0;

                    if ((lb | 0) == 9) {
                      Rb = fb;
                      break;
                    } else aa = fb;
                  }
                } else Rb = 10;

                aa = c[eb >> 2] | 0;
                lb = (aa >>> 0) % (Rb >>> 0) | 0;

                if ((lb | 0) == 0 ? (nb + (pb + -1022 << 2) | 0) == (Nb | 0) : 0) {
                  Sb = Mb;
                  Tb = eb;
                  Ub = Ob;
                } else R = 163;

                do if ((R | 0) == 163) {
                  R = 0;
                  hb = (((aa >>> 0) / (Rb >>> 0) | 0) & 1 | 0) == 0 ? 9007199254740992.0 : 9007199254740994.0;
                  ka = (Rb | 0) / 2 | 0;

                  do if (lb >>> 0 < ka >>> 0) Vb = .5;else {
                    if ((lb | 0) == (ka | 0) ? (nb + (pb + -1022 << 2) | 0) == (Nb | 0) : 0) {
                      Vb = 1.0;
                      break;
                    }

                    Vb = 1.5;
                  } while (0);

                  do if (!cb) {
                    Wb = hb;
                    Xb = Vb;
                  } else {
                    if ((a[db >> 0] | 0) != 45) {
                      Wb = hb;
                      Xb = Vb;
                      break;
                    }

                    Wb = -hb;
                    Xb = -Vb;
                  } while (0);

                  ka = aa - lb | 0;
                  c[eb >> 2] = ka;

                  if (!(Wb + Xb != Wb)) {
                    Sb = Mb;
                    Tb = eb;
                    Ub = Ob;
                    break;
                  }

                  fb = ka + Rb | 0;
                  c[eb >> 2] = fb;

                  if (fb >>> 0 > 999999999) {
                    fb = Mb;
                    ka = eb;

                    while (1) {
                      zb = ka + -4 | 0;
                      c[ka >> 2] = 0;

                      if (zb >>> 0 < fb >>> 0) {
                        la = fb + -4 | 0;
                        c[la >> 2] = 0;
                        Yb = la;
                      } else Yb = fb;

                      la = (c[zb >> 2] | 0) + 1 | 0;
                      c[zb >> 2] = la;

                      if (la >>> 0 > 999999999) {
                        fb = Yb;
                        ka = zb;
                      } else {
                        Zb = Yb;
                        _b = zb;
                        break;
                      }
                    }
                  } else {
                    Zb = Mb;
                    _b = eb;
                  }

                  ka = ($ - Zb >> 2) * 9 | 0;
                  fb = c[Zb >> 2] | 0;

                  if (fb >>> 0 < 10) {
                    Sb = Zb;
                    Tb = _b;
                    Ub = ka;
                    break;
                  } else {
                    $b = ka;
                    ac = 10;
                  }

                  while (1) {
                    ac = ac * 10 | 0;
                    ka = $b + 1 | 0;

                    if (fb >>> 0 < ac >>> 0) {
                      Sb = Zb;
                      Tb = _b;
                      Ub = ka;
                      break;
                    } else $b = ka;
                  }
                } while (0);

                eb = Tb + 4 | 0;
                bc = Sb;
                cc = Ub;
                dc = Nb >>> 0 > eb >>> 0 ? eb : Nb;
              } else {
                bc = Mb;
                cc = Ob;
                dc = Nb;
              }

              eb = 0 - cc | 0;
              lb = dc;

              while (1) {
                if (lb >>> 0 <= bc >>> 0) {
                  ec = 0;
                  fc = lb;
                  break;
                }

                aa = lb + -4 | 0;
                if (!(c[aa >> 2] | 0)) lb = aa;else {
                  ec = 1;
                  fc = lb;
                  break;
                }
              }

              do if (ob) {
                lb = (Ab & 1 ^ 1) + gb | 0;

                if ((lb | 0) > (cc | 0) & (cc | 0) > -5) {
                  gc = ba + -1 | 0;
                  hc = lb + -1 - cc | 0;
                } else {
                  gc = ba + -2 | 0;
                  hc = lb + -1 | 0;
                }

                lb = Z & 8;

                if (lb) {
                  ic = gc;
                  jc = hc;
                  kc = lb;
                  break;
                }

                do if (ec) {
                  lb = c[fc + -4 >> 2] | 0;

                  if (!lb) {
                    lc = 9;
                    break;
                  }

                  if (!((lb >>> 0) % 10 | 0)) {
                    mc = 10;
                    nc = 0;
                  } else {
                    lc = 0;
                    break;
                  }

                  while (1) {
                    mc = mc * 10 | 0;
                    aa = nc + 1 | 0;

                    if ((lb >>> 0) % (mc >>> 0) | 0) {
                      lc = aa;
                      break;
                    } else nc = aa;
                  }
                } else lc = 9; while (0);

                lb = ((fc - $ >> 2) * 9 | 0) + -9 | 0;

                if ((gc | 32 | 0) == 102) {
                  aa = lb - lc | 0;
                  pb = (aa | 0) < 0 ? 0 : aa;
                  ic = gc;
                  jc = (hc | 0) < (pb | 0) ? hc : pb;
                  kc = 0;
                  break;
                } else {
                  pb = lb + cc - lc | 0;
                  lb = (pb | 0) < 0 ? 0 : pb;
                  ic = gc;
                  jc = (hc | 0) < (lb | 0) ? hc : lb;
                  kc = 0;
                  break;
                }
              } else {
                ic = ba;
                jc = gb;
                kc = Z & 8;
              } while (0);

              gb = jc | kc;
              $ = (gb | 0) != 0 & 1;
              Ab = (ic | 32 | 0) == 102;

              if (Ab) {
                oc = (cc | 0) > 0 ? cc : 0;
                pc = 0;
              } else {
                ob = (cc | 0) < 0 ? eb : cc;
                lb = Pe(ob, ((ob | 0) < 0) << 31 >> 31, z) | 0;

                if ((B - lb | 0) < 2) {
                  ob = lb;

                  while (1) {
                    pb = ob + -1 | 0;
                    a[pb >> 0] = 48;
                    if ((B - pb | 0) < 2) ob = pb;else {
                      qc = pb;
                      break;
                    }
                  }
                } else qc = lb;

                a[qc + -1 >> 0] = (cc >> 31 & 2) + 43;
                ob = qc + -2 | 0;
                a[ob >> 0] = ic;
                oc = B - ob | 0;
                pc = ob;
              }

              ob = cb + 1 + jc + $ + oc | 0;
              Qe(e, 32, ta, ob, Z);
              if (!(c[e >> 2] & 32)) Ae(db, cb, e) | 0;
              Qe(e, 48, ta, ob, Z ^ 65536);

              do if (Ab) {
                eb = bc >>> 0 > nb >>> 0 ? nb : bc;
                pb = eb;

                while (1) {
                  aa = Pe(c[pb >> 2] | 0, 0, H) | 0;

                  do if ((pb | 0) == (eb | 0)) {
                    if ((aa | 0) != (H | 0)) {
                      rc = aa;
                      break;
                    }

                    a[J >> 0] = 48;
                    rc = J;
                  } else {
                    if (aa >>> 0 > p >>> 0) sc = aa;else {
                      rc = aa;
                      break;
                    }

                    while (1) {
                      fb = sc + -1 | 0;
                      a[fb >> 0] = 48;
                      if (fb >>> 0 > p >>> 0) sc = fb;else {
                        rc = fb;
                        break;
                      }
                    }
                  } while (0);

                  if (!(c[e >> 2] & 32)) Ae(rc, I - rc | 0, e) | 0;
                  aa = pb + 4 | 0;

                  if (aa >>> 0 > nb >>> 0) {
                    tc = aa;
                    break;
                  } else pb = aa;
                }

                do if (gb) {
                  if (c[e >> 2] & 32) break;
                  Ae(18346, 1, e) | 0;
                } while (0);

                if ((jc | 0) > 0 & tc >>> 0 < fc >>> 0) {
                  pb = jc;
                  eb = tc;

                  while (1) {
                    aa = Pe(c[eb >> 2] | 0, 0, H) | 0;

                    if (aa >>> 0 > p >>> 0) {
                      fb = aa;

                      while (1) {
                        ka = fb + -1 | 0;
                        a[ka >> 0] = 48;
                        if (ka >>> 0 > p >>> 0) fb = ka;else {
                          uc = ka;
                          break;
                        }
                      }
                    } else uc = aa;

                    if (!(c[e >> 2] & 32)) Ae(uc, (pb | 0) > 9 ? 9 : pb, e) | 0;
                    eb = eb + 4 | 0;
                    fb = pb + -9 | 0;

                    if (!((pb | 0) > 9 & eb >>> 0 < fc >>> 0)) {
                      vc = fb;
                      break;
                    } else pb = fb;
                  }
                } else vc = jc;

                Qe(e, 48, vc + 9 | 0, 9, 0);
              } else {
                pb = ec ? fc : bc + 4 | 0;

                if ((jc | 0) > -1) {
                  eb = (kc | 0) == 0;
                  fb = jc;
                  ka = bc;

                  while (1) {
                    zb = Pe(c[ka >> 2] | 0, 0, H) | 0;

                    if ((zb | 0) == (H | 0)) {
                      a[J >> 0] = 48;
                      wc = J;
                    } else wc = zb;

                    do if ((ka | 0) == (bc | 0)) {
                      zb = wc + 1 | 0;
                      if (!(c[e >> 2] & 32)) Ae(wc, 1, e) | 0;

                      if (eb & (fb | 0) < 1) {
                        xc = zb;
                        break;
                      }

                      if (c[e >> 2] & 32) {
                        xc = zb;
                        break;
                      }

                      Ae(18346, 1, e) | 0;
                      xc = zb;
                    } else {
                      if (wc >>> 0 > p >>> 0) yc = wc;else {
                        xc = wc;
                        break;
                      }

                      while (1) {
                        zb = yc + -1 | 0;
                        a[zb >> 0] = 48;
                        if (zb >>> 0 > p >>> 0) yc = zb;else {
                          xc = zb;
                          break;
                        }
                      }
                    } while (0);

                    aa = I - xc | 0;
                    if (!(c[e >> 2] & 32)) Ae(xc, (fb | 0) > (aa | 0) ? aa : fb, e) | 0;
                    zb = fb - aa | 0;
                    ka = ka + 4 | 0;

                    if (!(ka >>> 0 < pb >>> 0 & (zb | 0) > -1)) {
                      zc = zb;
                      break;
                    } else fb = zb;
                  }
                } else zc = jc;

                Qe(e, 48, zc + 18 | 0, 18, 0);
                if (c[e >> 2] & 32) break;
                Ae(pc, B - pc | 0, e) | 0;
              } while (0);

              Qe(e, 32, ta, ob, Z ^ 8192);
              sb = (ob | 0) < (ta | 0) ? ta : ob;
            } else {
              gb = (ba & 32 | 0) != 0;
              nb = bb != bb | 0.0 != 0.0;
              Ab = nb ? 0 : cb;
              $ = Ab + 3 | 0;
              Qe(e, 32, ta, $, Y);
              lb = c[e >> 2] | 0;

              if (!(lb & 32)) {
                Ae(db, Ab, e) | 0;
                Ac = c[e >> 2] | 0;
              } else Ac = lb;

              if (!(Ac & 32)) Ae(nb ? gb ? 18338 : 18342 : gb ? 18330 : 18334, 3, e) | 0;
              Qe(e, 32, ta, $, Z ^ 8192);
              sb = ($ | 0) < (ta | 0) ? ta : $;
            } while (0);

            K = N;
            L = Ba;
            f = sb;
            M = sa;
            continue a;
            break;
          }

        default:
          {
            Ta = L;
            Ua = Z;
            Va = Aa;
            Wa = 0;
            Xa = 18294;
            Ya = w;
          }
      } while (0);

      g: do if ((R | 0) == 64) {
        R = 0;
        ba = r;
        O = c[ba >> 2] | 0;
        ja = c[ba + 4 >> 2] | 0;
        ba = Ia & 32;

        if (!((O | 0) == 0 & (ja | 0) == 0)) {
          $ = w;
          gb = O;
          O = ja;

          while (1) {
            ja = $ + -1 | 0;
            a[ja >> 0] = d[18278 + (gb & 15) >> 0] | ba;
            gb = _e(gb | 0, O | 0, 4) | 0;
            O = C;

            if ((gb | 0) == 0 & (O | 0) == 0) {
              Bc = ja;
              break;
            } else $ = ja;
          }

          $ = r;

          if ((Ga & 8 | 0) == 0 | (c[$ >> 2] | 0) == 0 & (c[$ + 4 >> 2] | 0) == 0) {
            Ka = Bc;
            La = Ga;
            Ma = Ha;
            Na = 0;
            Oa = 18294;
            R = 77;
          } else {
            Ka = Bc;
            La = Ga;
            Ma = Ha;
            Na = 2;
            Oa = 18294 + (Ia >> 4) | 0;
            R = 77;
          }
        } else {
          Ka = w;
          La = Ga;
          Ma = Ha;
          Na = 0;
          Oa = 18294;
          R = 77;
        }
      } else if ((R | 0) == 76) {
        R = 0;
        Ka = Pe(Pa, Qa, w) | 0;
        La = Z;
        Ma = Aa;
        Na = Ra;
        Oa = Sa;
        R = 77;
      } else if ((R | 0) == 82) {
        R = 0;
        $ = Ge(Za, 0, Aa) | 0;
        O = ($ | 0) == 0;
        Ta = Za;
        Ua = Y;
        Va = O ? Aa : $ - Za | 0;
        Wa = 0;
        Xa = 18294;
        Ya = O ? Za + Aa | 0 : $;
      } else if ((R | 0) == 86) {
        R = 0;
        $ = 0;
        O = 0;
        gb = c[r >> 2] | 0;

        while (1) {
          ba = c[gb >> 2] | 0;

          if (!ba) {
            Cc = $;
            Dc = O;
            break;
          }

          ja = He(u, ba) | 0;

          if ((ja | 0) < 0 | ja >>> 0 > (_a - $ | 0) >>> 0) {
            Cc = $;
            Dc = ja;
            break;
          }

          ba = ja + $ | 0;

          if (_a >>> 0 > ba >>> 0) {
            $ = ba;
            O = ja;
            gb = gb + 4 | 0;
          } else {
            Cc = ba;
            Dc = ja;
            break;
          }
        }

        if ((Dc | 0) < 0) {
          pa = -1;
          break a;
        }

        Qe(e, 32, ta, Cc, Z);

        if (!Cc) {
          $a = 0;
          R = 98;
        } else {
          gb = 0;
          O = c[r >> 2] | 0;

          while (1) {
            $ = c[O >> 2] | 0;

            if (!$) {
              $a = Cc;
              R = 98;
              break g;
            }

            ja = He(u, $) | 0;
            gb = ja + gb | 0;

            if ((gb | 0) > (Cc | 0)) {
              $a = Cc;
              R = 98;
              break g;
            }

            if (!(c[e >> 2] & 32)) Ae(u, ja, e) | 0;

            if (gb >>> 0 >= Cc >>> 0) {
              $a = Cc;
              R = 98;
              break;
            } else O = O + 4 | 0;
          }
        }
      } while (0);

      if ((R | 0) == 98) {
        R = 0;
        Qe(e, 32, ta, $a, Z ^ 8192);
        K = N;
        L = Ba;
        f = (ta | 0) > ($a | 0) ? ta : $a;
        M = sa;
        continue;
      }

      if ((R | 0) == 77) {
        R = 0;
        Y = (Ma | 0) > -1 ? La & -65537 : La;
        O = r;
        gb = (c[O >> 2] | 0) != 0 | (c[O + 4 >> 2] | 0) != 0;

        if ((Ma | 0) != 0 | gb) {
          O = (gb & 1 ^ 1) + (x - Ka) | 0;
          Ta = Ka;
          Ua = Y;
          Va = (Ma | 0) > (O | 0) ? Ma : O;
          Wa = Na;
          Xa = Oa;
          Ya = w;
        } else {
          Ta = w;
          Ua = Y;
          Va = 0;
          Wa = Na;
          Xa = Oa;
          Ya = w;
        }
      }

      Y = Ya - Ta | 0;
      O = (Va | 0) < (Y | 0) ? Y : Va;
      gb = Wa + O | 0;
      ja = (ta | 0) < (gb | 0) ? gb : ta;
      Qe(e, 32, ja, gb, Ua);
      if (!(c[e >> 2] & 32)) Ae(Xa, Wa, e) | 0;
      Qe(e, 48, ja, gb, Ua ^ 65536);
      Qe(e, 48, O, Y, 0);
      if (!(c[e >> 2] & 32)) Ae(Ta, Y, e) | 0;
      Qe(e, 32, ja, gb, Ua ^ 8192);
      K = N;
      L = Ba;
      f = ja;
      M = sa;
    }

    h: do if ((R | 0) == 245) if (!e) {
      if (Q) {
        sa = 1;

        while (1) {
          M = c[l + (sa << 2) >> 2] | 0;

          if (!M) {
            Ec = sa;
            break;
          }

          Oe(j + (sa << 3) | 0, M, g);
          sa = sa + 1 | 0;

          if ((sa | 0) >= 10) {
            pa = 1;
            break h;
          }
        }

        if ((Ec | 0) < 10) {
          sa = Ec;

          while (1) {
            if (c[l + (sa << 2) >> 2] | 0) {
              pa = -1;
              break h;
            }

            sa = sa + 1 | 0;

            if ((sa | 0) >= 10) {
              pa = 1;
              break;
            }
          }
        } else pa = 1;
      } else pa = 0;
    } else pa = P; while (0);

    i = m;
    return pa | 0;
  }

  function Me(a) {
    a = a | 0;
    if (!(c[a + 68 >> 2] | 0)) ze(a);
    return;
  }

  function Ne(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0;
    e = a + 20 | 0;
    f = c[e >> 2] | 0;
    g = (c[a + 16 >> 2] | 0) - f | 0;
    a = g >>> 0 > d >>> 0 ? d : g;
    af(f | 0, b | 0, a | 0) | 0;
    c[e >> 2] = (c[e >> 2] | 0) + a;
    return d | 0;
  }

  function Oe(a, b, d) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        i = 0,
        j = 0.0;

    a: do if (b >>> 0 <= 20) do switch (b | 0) {
      case 9:
        {
          e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          f = c[e >> 2] | 0;
          c[d >> 2] = e + 4;
          c[a >> 2] = f;
          break a;
          break;
        }

      case 10:
        {
          f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          e = c[f >> 2] | 0;
          c[d >> 2] = f + 4;
          f = a;
          c[f >> 2] = e;
          c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
          break a;
          break;
        }

      case 11:
        {
          e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          f = c[e >> 2] | 0;
          c[d >> 2] = e + 4;
          e = a;
          c[e >> 2] = f;
          c[e + 4 >> 2] = 0;
          break a;
          break;
        }

      case 12:
        {
          e = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
          f = e;
          g = c[f >> 2] | 0;
          i = c[f + 4 >> 2] | 0;
          c[d >> 2] = e + 8;
          e = a;
          c[e >> 2] = g;
          c[e + 4 >> 2] = i;
          break a;
          break;
        }

      case 13:
        {
          i = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          e = c[i >> 2] | 0;
          c[d >> 2] = i + 4;
          i = (e & 65535) << 16 >> 16;
          e = a;
          c[e >> 2] = i;
          c[e + 4 >> 2] = ((i | 0) < 0) << 31 >> 31;
          break a;
          break;
        }

      case 14:
        {
          i = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          e = c[i >> 2] | 0;
          c[d >> 2] = i + 4;
          i = a;
          c[i >> 2] = e & 65535;
          c[i + 4 >> 2] = 0;
          break a;
          break;
        }

      case 15:
        {
          i = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          e = c[i >> 2] | 0;
          c[d >> 2] = i + 4;
          i = (e & 255) << 24 >> 24;
          e = a;
          c[e >> 2] = i;
          c[e + 4 >> 2] = ((i | 0) < 0) << 31 >> 31;
          break a;
          break;
        }

      case 16:
        {
          i = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
          e = c[i >> 2] | 0;
          c[d >> 2] = i + 4;
          i = a;
          c[i >> 2] = e & 255;
          c[i + 4 >> 2] = 0;
          break a;
          break;
        }

      case 17:
        {
          i = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
          j = +h[i >> 3];
          c[d >> 2] = i + 8;
          h[a >> 3] = j;
          break a;
          break;
        }

      case 18:
        {
          i = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
          j = +h[i >> 3];
          c[d >> 2] = i + 8;
          h[a >> 3] = j;
          break a;
          break;
        }

      default:
        break a;
    } while (0); while (0);

    return;
  }

  function Pe(b, c, d) {
    b = b | 0;
    c = c | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;

    if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295) {
      e = d;
      f = b;
      g = c;

      while (1) {
        c = kf(f | 0, g | 0, 10, 0) | 0;
        h = e + -1 | 0;
        a[h >> 0] = c | 48;
        c = jf(f | 0, g | 0, 10, 0) | 0;

        if (g >>> 0 > 9 | (g | 0) == 9 & f >>> 0 > 4294967295) {
          e = h;
          f = c;
          g = C;
        } else {
          i = h;
          j = c;
          break;
        }
      }

      k = i;
      l = j;
    } else {
      k = d;
      l = b;
    }

    if (!l) m = k;else {
      b = k;
      k = l;

      while (1) {
        l = b + -1 | 0;
        a[l >> 0] = (k >>> 0) % 10 | 0 | 48;

        if (k >>> 0 < 10) {
          m = l;
          break;
        } else {
          b = l;
          k = (k >>> 0) / 10 | 0;
        }
      }
    }
    return m | 0;
  }

  function Qe(a, b, d, e, f) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
    g = i;
    i = i + 256 | 0;
    h = g;

    do if ((d | 0) > (e | 0) & (f & 73728 | 0) == 0) {
      j = d - e | 0;
      Ze(h | 0, b | 0, (j >>> 0 > 256 ? 256 : j) | 0) | 0;
      k = c[a >> 2] | 0;
      l = (k & 32 | 0) == 0;

      if (j >>> 0 > 255) {
        m = d - e | 0;
        n = j;
        o = k;
        k = l;

        while (1) {
          if (k) {
            Ae(h, 256, a) | 0;
            p = c[a >> 2] | 0;
          } else p = o;

          n = n + -256 | 0;
          k = (p & 32 | 0) == 0;
          if (n >>> 0 <= 255) break;else o = p;
        }

        if (k) q = m & 255;else break;
      } else if (l) q = j;else break;

      Ae(h, q, a) | 0;
    } while (0);

    i = g;
    return;
  }

  function Re(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 0,
        na = 0,
        oa = 0,
        pa = 0,
        qa = 0,
        ra = 0,
        sa = 0,
        ta = 0,
        ua = 0,
        va = 0,
        wa = 0,
        xa = 0,
        ya = 0,
        za = 0,
        Ba = 0,
        Ca = 0,
        Fa = 0,
        Ga = 0,
        Ha = 0,
        Ia = 0,
        Ja = 0,
        Ka = 0,
        Ma = 0,
        Na = 0,
        Oa = 0,
        Pa = 0,
        Qa = 0,
        Ra = 0,
        Sa = 0,
        Ta = 0,
        Ua = 0,
        Va = 0,
        Wa = 0;

    do if (a >>> 0 < 245) {
      b = a >>> 0 < 11 ? 16 : a + 11 & -8;
      d = b >>> 3;
      e = c[2311] | 0;
      f = e >>> d;

      if (f & 3) {
        g = (f & 1 ^ 1) + d | 0;
        h = g << 1;
        i = 9284 + (h << 2) | 0;
        j = 9284 + (h + 2 << 2) | 0;
        h = c[j >> 2] | 0;
        k = h + 8 | 0;
        l = c[k >> 2] | 0;

        do if ((i | 0) != (l | 0)) {
          if (l >>> 0 < (c[2315] | 0) >>> 0) Aa();
          m = l + 12 | 0;

          if ((c[m >> 2] | 0) == (h | 0)) {
            c[m >> 2] = i;
            c[j >> 2] = l;
            break;
          } else Aa();
        } else c[2311] = e & ~(1 << g); while (0);

        l = g << 3;
        c[h + 4 >> 2] = l | 3;
        j = h + (l | 4) | 0;
        c[j >> 2] = c[j >> 2] | 1;
        n = k;
        return n | 0;
      }

      j = c[2313] | 0;

      if (b >>> 0 > j >>> 0) {
        if (f) {
          l = 2 << d;
          i = f << d & (l | 0 - l);
          l = (i & 0 - i) + -1 | 0;
          i = l >>> 12 & 16;
          m = l >>> i;
          l = m >>> 5 & 8;
          o = m >>> l;
          m = o >>> 2 & 4;
          p = o >>> m;
          o = p >>> 1 & 2;
          q = p >>> o;
          p = q >>> 1 & 1;
          r = (l | i | m | o | p) + (q >>> p) | 0;
          p = r << 1;
          q = 9284 + (p << 2) | 0;
          o = 9284 + (p + 2 << 2) | 0;
          p = c[o >> 2] | 0;
          m = p + 8 | 0;
          i = c[m >> 2] | 0;

          do if ((q | 0) != (i | 0)) {
            if (i >>> 0 < (c[2315] | 0) >>> 0) Aa();
            l = i + 12 | 0;

            if ((c[l >> 2] | 0) == (p | 0)) {
              c[l >> 2] = q;
              c[o >> 2] = i;
              s = c[2313] | 0;
              break;
            } else Aa();
          } else {
            c[2311] = e & ~(1 << r);
            s = j;
          } while (0);

          j = r << 3;
          e = j - b | 0;
          c[p + 4 >> 2] = b | 3;
          i = p + b | 0;
          c[p + (b | 4) >> 2] = e | 1;
          c[p + j >> 2] = e;

          if (s) {
            j = c[2316] | 0;
            o = s >>> 3;
            q = o << 1;
            d = 9284 + (q << 2) | 0;
            f = c[2311] | 0;
            k = 1 << o;

            if (f & k) {
              o = 9284 + (q + 2 << 2) | 0;
              h = c[o >> 2] | 0;
              if (h >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                t = o;
                u = h;
              }
            } else {
              c[2311] = f | k;
              t = 9284 + (q + 2 << 2) | 0;
              u = d;
            }

            c[t >> 2] = j;
            c[u + 12 >> 2] = j;
            c[j + 8 >> 2] = u;
            c[j + 12 >> 2] = d;
          }

          c[2313] = e;
          c[2316] = i;
          n = m;
          return n | 0;
        }

        i = c[2312] | 0;

        if (i) {
          e = (i & 0 - i) + -1 | 0;
          i = e >>> 12 & 16;
          d = e >>> i;
          e = d >>> 5 & 8;
          j = d >>> e;
          d = j >>> 2 & 4;
          q = j >>> d;
          j = q >>> 1 & 2;
          k = q >>> j;
          q = k >>> 1 & 1;
          f = c[9548 + ((e | i | d | j | q) + (k >>> q) << 2) >> 2] | 0;
          q = (c[f + 4 >> 2] & -8) - b | 0;
          k = f;
          j = f;

          while (1) {
            f = c[k + 16 >> 2] | 0;

            if (!f) {
              d = c[k + 20 >> 2] | 0;

              if (!d) {
                v = q;
                w = j;
                break;
              } else x = d;
            } else x = f;

            f = (c[x + 4 >> 2] & -8) - b | 0;
            d = f >>> 0 < q >>> 0;
            q = d ? f : q;
            k = x;
            j = d ? x : j;
          }

          j = c[2315] | 0;
          if (w >>> 0 < j >>> 0) Aa();
          k = w + b | 0;
          if (w >>> 0 >= k >>> 0) Aa();
          q = c[w + 24 >> 2] | 0;
          m = c[w + 12 >> 2] | 0;

          do if ((m | 0) == (w | 0)) {
            p = w + 20 | 0;
            r = c[p >> 2] | 0;

            if (!r) {
              d = w + 16 | 0;
              f = c[d >> 2] | 0;

              if (!f) {
                y = 0;
                break;
              } else {
                z = f;
                A = d;
              }
            } else {
              z = r;
              A = p;
            }

            while (1) {
              p = z + 20 | 0;
              r = c[p >> 2] | 0;

              if (r) {
                z = r;
                A = p;
                continue;
              }

              p = z + 16 | 0;
              r = c[p >> 2] | 0;

              if (!r) {
                B = z;
                C = A;
                break;
              } else {
                z = r;
                A = p;
              }
            }

            if (C >>> 0 < j >>> 0) Aa();else {
              c[C >> 2] = 0;
              y = B;
              break;
            }
          } else {
            p = c[w + 8 >> 2] | 0;
            if (p >>> 0 < j >>> 0) Aa();
            r = p + 12 | 0;
            if ((c[r >> 2] | 0) != (w | 0)) Aa();
            d = m + 8 | 0;

            if ((c[d >> 2] | 0) == (w | 0)) {
              c[r >> 2] = m;
              c[d >> 2] = p;
              y = m;
              break;
            } else Aa();
          } while (0);

          do if (q) {
            m = c[w + 28 >> 2] | 0;
            j = 9548 + (m << 2) | 0;

            if ((w | 0) == (c[j >> 2] | 0)) {
              c[j >> 2] = y;

              if (!y) {
                c[2312] = c[2312] & ~(1 << m);
                break;
              }
            } else {
              if (q >>> 0 < (c[2315] | 0) >>> 0) Aa();
              m = q + 16 | 0;
              if ((c[m >> 2] | 0) == (w | 0)) c[m >> 2] = y;else c[q + 20 >> 2] = y;
              if (!y) break;
            }

            m = c[2315] | 0;
            if (y >>> 0 < m >>> 0) Aa();
            c[y + 24 >> 2] = q;
            j = c[w + 16 >> 2] | 0;

            do if (j) if (j >>> 0 < m >>> 0) Aa();else {
              c[y + 16 >> 2] = j;
              c[j + 24 >> 2] = y;
              break;
            } while (0);

            j = c[w + 20 >> 2] | 0;
            if (j) if (j >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
              c[y + 20 >> 2] = j;
              c[j + 24 >> 2] = y;
              break;
            }
          } while (0);

          if (v >>> 0 < 16) {
            q = v + b | 0;
            c[w + 4 >> 2] = q | 3;
            j = w + (q + 4) | 0;
            c[j >> 2] = c[j >> 2] | 1;
          } else {
            c[w + 4 >> 2] = b | 3;
            c[w + (b | 4) >> 2] = v | 1;
            c[w + (v + b) >> 2] = v;
            j = c[2313] | 0;

            if (j) {
              q = c[2316] | 0;
              m = j >>> 3;
              j = m << 1;
              p = 9284 + (j << 2) | 0;
              d = c[2311] | 0;
              r = 1 << m;

              if (d & r) {
                m = 9284 + (j + 2 << 2) | 0;
                f = c[m >> 2] | 0;
                if (f >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                  D = m;
                  E = f;
                }
              } else {
                c[2311] = d | r;
                D = 9284 + (j + 2 << 2) | 0;
                E = p;
              }

              c[D >> 2] = q;
              c[E + 12 >> 2] = q;
              c[q + 8 >> 2] = E;
              c[q + 12 >> 2] = p;
            }

            c[2313] = v;
            c[2316] = k;
          }

          n = w + 8 | 0;
          return n | 0;
        } else F = b;
      } else F = b;
    } else if (a >>> 0 <= 4294967231) {
      p = a + 11 | 0;
      q = p & -8;
      j = c[2312] | 0;

      if (j) {
        r = 0 - q | 0;
        d = p >>> 8;
        if (d) {
          if (q >>> 0 > 16777215) G = 31;else {
            p = (d + 1048320 | 0) >>> 16 & 8;
            f = d << p;
            d = (f + 520192 | 0) >>> 16 & 4;
            m = f << d;
            f = (m + 245760 | 0) >>> 16 & 2;
            i = 14 - (d | p | f) + (m << f >>> 15) | 0;
            G = q >>> (i + 7 | 0) & 1 | i << 1;
          }
        } else G = 0;
        i = c[9548 + (G << 2) >> 2] | 0;

        a: do if (!i) {
          H = r;
          I = 0;
          J = 0;
          K = 86;
        } else {
          f = r;
          m = 0;
          p = q << ((G | 0) == 31 ? 0 : 25 - (G >>> 1) | 0);
          d = i;
          e = 0;

          while (1) {
            h = c[d + 4 >> 2] & -8;
            o = h - q | 0;
            if (o >>> 0 < f >>> 0) {
              if ((h | 0) == (q | 0)) {
                L = o;
                M = d;
                N = d;
                K = 90;
                break a;
              } else {
                O = o;
                P = d;
              }
            } else {
              O = f;
              P = e;
            }
            o = c[d + 20 >> 2] | 0;
            d = c[d + 16 + (p >>> 31 << 2) >> 2] | 0;
            h = (o | 0) == 0 | (o | 0) == (d | 0) ? m : o;

            if (!d) {
              H = O;
              I = h;
              J = P;
              K = 86;
              break;
            } else {
              f = O;
              m = h;
              p = p << 1;
              e = P;
            }
          }
        } while (0);

        if ((K | 0) == 86) {
          if ((I | 0) == 0 & (J | 0) == 0) {
            i = 2 << G;
            r = j & (i | 0 - i);

            if (!r) {
              F = q;
              break;
            }

            i = (r & 0 - r) + -1 | 0;
            r = i >>> 12 & 16;
            b = i >>> r;
            i = b >>> 5 & 8;
            k = b >>> i;
            b = k >>> 2 & 4;
            e = k >>> b;
            k = e >>> 1 & 2;
            p = e >>> k;
            e = p >>> 1 & 1;
            Q = c[9548 + ((i | r | b | k | e) + (p >>> e) << 2) >> 2] | 0;
            R = 0;
          } else {
            Q = I;
            R = J;
          }

          if (!Q) {
            S = H;
            T = R;
          } else {
            L = H;
            M = Q;
            N = R;
            K = 90;
          }
        }

        if ((K | 0) == 90) while (1) {
          K = 0;
          e = (c[M + 4 >> 2] & -8) - q | 0;
          p = e >>> 0 < L >>> 0;
          k = p ? e : L;
          e = p ? M : N;
          p = c[M + 16 >> 2] | 0;

          if (p) {
            L = k;
            M = p;
            N = e;
            K = 90;
            continue;
          }

          M = c[M + 20 >> 2] | 0;

          if (!M) {
            S = k;
            T = e;
            break;
          } else {
            L = k;
            N = e;
            K = 90;
          }
        }

        if ((T | 0) != 0 ? S >>> 0 < ((c[2313] | 0) - q | 0) >>> 0 : 0) {
          j = c[2315] | 0;
          if (T >>> 0 < j >>> 0) Aa();
          e = T + q | 0;
          if (T >>> 0 >= e >>> 0) Aa();
          k = c[T + 24 >> 2] | 0;
          p = c[T + 12 >> 2] | 0;

          do if ((p | 0) == (T | 0)) {
            b = T + 20 | 0;
            r = c[b >> 2] | 0;

            if (!r) {
              i = T + 16 | 0;
              m = c[i >> 2] | 0;

              if (!m) {
                U = 0;
                break;
              } else {
                V = m;
                W = i;
              }
            } else {
              V = r;
              W = b;
            }

            while (1) {
              b = V + 20 | 0;
              r = c[b >> 2] | 0;

              if (r) {
                V = r;
                W = b;
                continue;
              }

              b = V + 16 | 0;
              r = c[b >> 2] | 0;

              if (!r) {
                X = V;
                Y = W;
                break;
              } else {
                V = r;
                W = b;
              }
            }

            if (Y >>> 0 < j >>> 0) Aa();else {
              c[Y >> 2] = 0;
              U = X;
              break;
            }
          } else {
            b = c[T + 8 >> 2] | 0;
            if (b >>> 0 < j >>> 0) Aa();
            r = b + 12 | 0;
            if ((c[r >> 2] | 0) != (T | 0)) Aa();
            i = p + 8 | 0;

            if ((c[i >> 2] | 0) == (T | 0)) {
              c[r >> 2] = p;
              c[i >> 2] = b;
              U = p;
              break;
            } else Aa();
          } while (0);

          do if (k) {
            p = c[T + 28 >> 2] | 0;
            j = 9548 + (p << 2) | 0;

            if ((T | 0) == (c[j >> 2] | 0)) {
              c[j >> 2] = U;

              if (!U) {
                c[2312] = c[2312] & ~(1 << p);
                break;
              }
            } else {
              if (k >>> 0 < (c[2315] | 0) >>> 0) Aa();
              p = k + 16 | 0;
              if ((c[p >> 2] | 0) == (T | 0)) c[p >> 2] = U;else c[k + 20 >> 2] = U;
              if (!U) break;
            }

            p = c[2315] | 0;
            if (U >>> 0 < p >>> 0) Aa();
            c[U + 24 >> 2] = k;
            j = c[T + 16 >> 2] | 0;

            do if (j) if (j >>> 0 < p >>> 0) Aa();else {
              c[U + 16 >> 2] = j;
              c[j + 24 >> 2] = U;
              break;
            } while (0);

            j = c[T + 20 >> 2] | 0;
            if (j) if (j >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
              c[U + 20 >> 2] = j;
              c[j + 24 >> 2] = U;
              break;
            }
          } while (0);

          b: do if (S >>> 0 >= 16) {
            c[T + 4 >> 2] = q | 3;
            c[T + (q | 4) >> 2] = S | 1;
            c[T + (S + q) >> 2] = S;
            k = S >>> 3;

            if (S >>> 0 < 256) {
              j = k << 1;
              p = 9284 + (j << 2) | 0;
              b = c[2311] | 0;
              i = 1 << k;

              if (b & i) {
                k = 9284 + (j + 2 << 2) | 0;
                r = c[k >> 2] | 0;
                if (r >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                  Z = k;
                  _ = r;
                }
              } else {
                c[2311] = b | i;
                Z = 9284 + (j + 2 << 2) | 0;
                _ = p;
              }

              c[Z >> 2] = e;
              c[_ + 12 >> 2] = e;
              c[T + (q + 8) >> 2] = _;
              c[T + (q + 12) >> 2] = p;
              break;
            }

            p = S >>> 8;
            if (p) {
              if (S >>> 0 > 16777215) $ = 31;else {
                j = (p + 1048320 | 0) >>> 16 & 8;
                i = p << j;
                p = (i + 520192 | 0) >>> 16 & 4;
                b = i << p;
                i = (b + 245760 | 0) >>> 16 & 2;
                r = 14 - (p | j | i) + (b << i >>> 15) | 0;
                $ = S >>> (r + 7 | 0) & 1 | r << 1;
              }
            } else $ = 0;
            r = 9548 + ($ << 2) | 0;
            c[T + (q + 28) >> 2] = $;
            c[T + (q + 20) >> 2] = 0;
            c[T + (q + 16) >> 2] = 0;
            i = c[2312] | 0;
            b = 1 << $;

            if (!(i & b)) {
              c[2312] = i | b;
              c[r >> 2] = e;
              c[T + (q + 24) >> 2] = r;
              c[T + (q + 12) >> 2] = e;
              c[T + (q + 8) >> 2] = e;
              break;
            }

            b = c[r >> 2] | 0;

            c: do if ((c[b + 4 >> 2] & -8 | 0) != (S | 0)) {
              r = S << (($ | 0) == 31 ? 0 : 25 - ($ >>> 1) | 0);
              i = b;

              while (1) {
                j = i + 16 + (r >>> 31 << 2) | 0;
                p = c[j >> 2] | 0;

                if (!p) {
                  aa = j;
                  ba = i;
                  break;
                }

                if ((c[p + 4 >> 2] & -8 | 0) == (S | 0)) {
                  ca = p;
                  break c;
                } else {
                  r = r << 1;
                  i = p;
                }
              }

              if (aa >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                c[aa >> 2] = e;
                c[T + (q + 24) >> 2] = ba;
                c[T + (q + 12) >> 2] = e;
                c[T + (q + 8) >> 2] = e;
                break b;
              }
            } else ca = b; while (0);

            b = ca + 8 | 0;
            i = c[b >> 2] | 0;
            r = c[2315] | 0;

            if (i >>> 0 >= r >>> 0 & ca >>> 0 >= r >>> 0) {
              c[i + 12 >> 2] = e;
              c[b >> 2] = e;
              c[T + (q + 8) >> 2] = i;
              c[T + (q + 12) >> 2] = ca;
              c[T + (q + 24) >> 2] = 0;
              break;
            } else Aa();
          } else {
            i = S + q | 0;
            c[T + 4 >> 2] = i | 3;
            b = T + (i + 4) | 0;
            c[b >> 2] = c[b >> 2] | 1;
          } while (0);

          n = T + 8 | 0;
          return n | 0;
        } else F = q;
      } else F = q;
    } else F = -1; while (0);

    T = c[2313] | 0;

    if (T >>> 0 >= F >>> 0) {
      S = T - F | 0;
      ca = c[2316] | 0;

      if (S >>> 0 > 15) {
        c[2316] = ca + F;
        c[2313] = S;
        c[ca + (F + 4) >> 2] = S | 1;
        c[ca + T >> 2] = S;
        c[ca + 4 >> 2] = F | 3;
      } else {
        c[2313] = 0;
        c[2316] = 0;
        c[ca + 4 >> 2] = T | 3;
        S = ca + (T + 4) | 0;
        c[S >> 2] = c[S >> 2] | 1;
      }

      n = ca + 8 | 0;
      return n | 0;
    }

    ca = c[2314] | 0;

    if (ca >>> 0 > F >>> 0) {
      S = ca - F | 0;
      c[2314] = S;
      ca = c[2317] | 0;
      c[2317] = ca + F;
      c[ca + (F + 4) >> 2] = S | 1;
      c[ca + 4 >> 2] = F | 3;
      n = ca + 8 | 0;
      return n | 0;
    }

    do if (!(c[2429] | 0)) {
      ca = La(30) | 0;

      if (!(ca + -1 & ca)) {
        c[2431] = ca;
        c[2430] = ca;
        c[2432] = -1;
        c[2433] = -1;
        c[2434] = 0;
        c[2422] = 0;
        c[2429] = (Ea(0) | 0) & -16 ^ 1431655768;
        break;
      } else Aa();
    } while (0);

    ca = F + 48 | 0;
    S = c[2431] | 0;
    T = F + 47 | 0;
    ba = S + T | 0;
    aa = 0 - S | 0;
    S = ba & aa;

    if (S >>> 0 <= F >>> 0) {
      n = 0;
      return n | 0;
    }

    $ = c[2421] | 0;

    if (($ | 0) != 0 ? (_ = c[2419] | 0, Z = _ + S | 0, Z >>> 0 <= _ >>> 0 | Z >>> 0 > $ >>> 0) : 0) {
      n = 0;
      return n | 0;
    }

    d: do if (!(c[2422] & 4)) {
      $ = c[2317] | 0;

      e: do if ($) {
        Z = 9692;

        while (1) {
          _ = c[Z >> 2] | 0;

          if (_ >>> 0 <= $ >>> 0 ? (U = Z + 4 | 0, (_ + (c[U >> 2] | 0) | 0) >>> 0 > $ >>> 0) : 0) {
            da = Z;
            ea = U;
            break;
          }

          Z = c[Z + 8 >> 2] | 0;

          if (!Z) {
            K = 174;
            break e;
          }
        }

        Z = ba - (c[2314] | 0) & aa;

        if (Z >>> 0 < 2147483647) {
          U = Da(Z | 0) | 0;
          _ = (U | 0) == ((c[da >> 2] | 0) + (c[ea >> 2] | 0) | 0);
          X = _ ? Z : 0;
          if (_) {
            if ((U | 0) == (-1 | 0)) fa = X;else {
              ga = U;
              ha = X;
              K = 194;
              break d;
            }
          } else {
            ia = U;
            ja = Z;
            ka = X;
            K = 184;
          }
        } else fa = 0;
      } else K = 174; while (0);

      do if ((K | 0) == 174) {
        $ = Da(0) | 0;

        if (($ | 0) != (-1 | 0)) {
          q = $;
          X = c[2430] | 0;
          Z = X + -1 | 0;
          if (!(Z & q)) la = S;else la = S - q + (Z + q & 0 - X) | 0;
          X = c[2419] | 0;
          q = X + la | 0;

          if (la >>> 0 > F >>> 0 & la >>> 0 < 2147483647) {
            Z = c[2421] | 0;

            if ((Z | 0) != 0 ? q >>> 0 <= X >>> 0 | q >>> 0 > Z >>> 0 : 0) {
              fa = 0;
              break;
            }

            Z = Da(la | 0) | 0;
            q = (Z | 0) == ($ | 0);
            X = q ? la : 0;

            if (q) {
              ga = $;
              ha = X;
              K = 194;
              break d;
            } else {
              ia = Z;
              ja = la;
              ka = X;
              K = 184;
            }
          } else fa = 0;
        } else fa = 0;
      } while (0);

      f: do if ((K | 0) == 184) {
        X = 0 - ja | 0;

        do if (ca >>> 0 > ja >>> 0 & (ja >>> 0 < 2147483647 & (ia | 0) != (-1 | 0)) ? (Z = c[2431] | 0, $ = T - ja + Z & 0 - Z, $ >>> 0 < 2147483647) : 0) {
          if ((Da($ | 0) | 0) == (-1 | 0)) {
            Da(X | 0) | 0;
            fa = ka;
            break f;
          } else {
            ma = $ + ja | 0;
            break;
          }
        } else ma = ja; while (0);

        if ((ia | 0) == (-1 | 0)) fa = ka;else {
          ga = ia;
          ha = ma;
          K = 194;
          break d;
        }
      } while (0);

      c[2422] = c[2422] | 4;
      na = fa;
      K = 191;
    } else {
      na = 0;
      K = 191;
    } while (0);

    if ((((K | 0) == 191 ? S >>> 0 < 2147483647 : 0) ? (fa = Da(S | 0) | 0, S = Da(0) | 0, fa >>> 0 < S >>> 0 & ((fa | 0) != (-1 | 0) & (S | 0) != (-1 | 0))) : 0) ? (ma = S - fa | 0, S = ma >>> 0 > (F + 40 | 0) >>> 0, S) : 0) {
      ga = fa;
      ha = S ? ma : na;
      K = 194;
    }

    if ((K | 0) == 194) {
      na = (c[2419] | 0) + ha | 0;
      c[2419] = na;
      if (na >>> 0 > (c[2420] | 0) >>> 0) c[2420] = na;
      na = c[2317] | 0;

      g: do if (na) {
        ma = 9692;

        do {
          S = c[ma >> 2] | 0;
          fa = ma + 4 | 0;
          ia = c[fa >> 2] | 0;

          if ((ga | 0) == (S + ia | 0)) {
            oa = S;
            pa = fa;
            qa = ia;
            ra = ma;
            K = 204;
            break;
          }

          ma = c[ma + 8 >> 2] | 0;
        } while ((ma | 0) != 0);

        if (((K | 0) == 204 ? (c[ra + 12 >> 2] & 8 | 0) == 0 : 0) ? na >>> 0 < ga >>> 0 & na >>> 0 >= oa >>> 0 : 0) {
          c[pa >> 2] = qa + ha;
          ma = (c[2314] | 0) + ha | 0;
          ia = na + 8 | 0;
          fa = (ia & 7 | 0) == 0 ? 0 : 0 - ia & 7;
          ia = ma - fa | 0;
          c[2317] = na + fa;
          c[2314] = ia;
          c[na + (fa + 4) >> 2] = ia | 1;
          c[na + (ma + 4) >> 2] = 40;
          c[2318] = c[2433];
          break;
        }

        ma = c[2315] | 0;

        if (ga >>> 0 < ma >>> 0) {
          c[2315] = ga;
          sa = ga;
        } else sa = ma;

        ma = ga + ha | 0;
        ia = 9692;

        while (1) {
          if ((c[ia >> 2] | 0) == (ma | 0)) {
            ta = ia;
            ua = ia;
            K = 212;
            break;
          }

          ia = c[ia + 8 >> 2] | 0;

          if (!ia) {
            va = 9692;
            break;
          }
        }

        if ((K | 0) == 212) if (!(c[ua + 12 >> 2] & 8)) {
          c[ta >> 2] = ga;
          ia = ua + 4 | 0;
          c[ia >> 2] = (c[ia >> 2] | 0) + ha;
          ia = ga + 8 | 0;
          ma = (ia & 7 | 0) == 0 ? 0 : 0 - ia & 7;
          ia = ga + (ha + 8) | 0;
          fa = (ia & 7 | 0) == 0 ? 0 : 0 - ia & 7;
          ia = ga + (fa + ha) | 0;
          S = ma + F | 0;
          ka = ga + S | 0;
          ja = ia - (ga + ma) - F | 0;
          c[ga + (ma + 4) >> 2] = F | 3;

          h: do if ((ia | 0) != (na | 0)) {
            if ((ia | 0) == (c[2316] | 0)) {
              T = (c[2313] | 0) + ja | 0;
              c[2313] = T;
              c[2316] = ka;
              c[ga + (S + 4) >> 2] = T | 1;
              c[ga + (T + S) >> 2] = T;
              break;
            }

            T = ha + 4 | 0;
            ca = c[ga + (T + fa) >> 2] | 0;

            if ((ca & 3 | 0) == 1) {
              la = ca & -8;
              ea = ca >>> 3;

              i: do if (ca >>> 0 >= 256) {
                da = c[ga + ((fa | 24) + ha) >> 2] | 0;
                aa = c[ga + (ha + 12 + fa) >> 2] | 0;

                do if ((aa | 0) == (ia | 0)) {
                  ba = fa | 16;
                  X = ga + (T + ba) | 0;
                  $ = c[X >> 2] | 0;

                  if (!$) {
                    Z = ga + (ba + ha) | 0;
                    ba = c[Z >> 2] | 0;

                    if (!ba) {
                      wa = 0;
                      break;
                    } else {
                      xa = ba;
                      ya = Z;
                    }
                  } else {
                    xa = $;
                    ya = X;
                  }

                  while (1) {
                    X = xa + 20 | 0;
                    $ = c[X >> 2] | 0;

                    if ($) {
                      xa = $;
                      ya = X;
                      continue;
                    }

                    X = xa + 16 | 0;
                    $ = c[X >> 2] | 0;

                    if (!$) {
                      za = xa;
                      Ba = ya;
                      break;
                    } else {
                      xa = $;
                      ya = X;
                    }
                  }

                  if (Ba >>> 0 < sa >>> 0) Aa();else {
                    c[Ba >> 2] = 0;
                    wa = za;
                    break;
                  }
                } else {
                  X = c[ga + ((fa | 8) + ha) >> 2] | 0;
                  if (X >>> 0 < sa >>> 0) Aa();
                  $ = X + 12 | 0;
                  if ((c[$ >> 2] | 0) != (ia | 0)) Aa();
                  Z = aa + 8 | 0;

                  if ((c[Z >> 2] | 0) == (ia | 0)) {
                    c[$ >> 2] = aa;
                    c[Z >> 2] = X;
                    wa = aa;
                    break;
                  } else Aa();
                } while (0);

                if (!da) break;
                aa = c[ga + (ha + 28 + fa) >> 2] | 0;
                X = 9548 + (aa << 2) | 0;

                do if ((ia | 0) != (c[X >> 2] | 0)) {
                  if (da >>> 0 < (c[2315] | 0) >>> 0) Aa();
                  Z = da + 16 | 0;
                  if ((c[Z >> 2] | 0) == (ia | 0)) c[Z >> 2] = wa;else c[da + 20 >> 2] = wa;
                  if (!wa) break i;
                } else {
                  c[X >> 2] = wa;
                  if (wa) break;
                  c[2312] = c[2312] & ~(1 << aa);
                  break i;
                } while (0);

                aa = c[2315] | 0;
                if (wa >>> 0 < aa >>> 0) Aa();
                c[wa + 24 >> 2] = da;
                X = fa | 16;
                Z = c[ga + (X + ha) >> 2] | 0;

                do if (Z) if (Z >>> 0 < aa >>> 0) Aa();else {
                  c[wa + 16 >> 2] = Z;
                  c[Z + 24 >> 2] = wa;
                  break;
                } while (0);

                Z = c[ga + (T + X) >> 2] | 0;
                if (!Z) break;
                if (Z >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                  c[wa + 20 >> 2] = Z;
                  c[Z + 24 >> 2] = wa;
                  break;
                }
              } else {
                Z = c[ga + ((fa | 8) + ha) >> 2] | 0;
                aa = c[ga + (ha + 12 + fa) >> 2] | 0;
                da = 9284 + (ea << 1 << 2) | 0;

                do if ((Z | 0) != (da | 0)) {
                  if (Z >>> 0 < sa >>> 0) Aa();
                  if ((c[Z + 12 >> 2] | 0) == (ia | 0)) break;
                  Aa();
                } while (0);

                if ((aa | 0) == (Z | 0)) {
                  c[2311] = c[2311] & ~(1 << ea);
                  break;
                }

                do if ((aa | 0) == (da | 0)) Ca = aa + 8 | 0;else {
                  if (aa >>> 0 < sa >>> 0) Aa();
                  X = aa + 8 | 0;

                  if ((c[X >> 2] | 0) == (ia | 0)) {
                    Ca = X;
                    break;
                  }

                  Aa();
                } while (0);

                c[Z + 12 >> 2] = aa;
                c[Ca >> 2] = Z;
              } while (0);

              Fa = ga + ((la | fa) + ha) | 0;
              Ga = la + ja | 0;
            } else {
              Fa = ia;
              Ga = ja;
            }

            ea = Fa + 4 | 0;
            c[ea >> 2] = c[ea >> 2] & -2;
            c[ga + (S + 4) >> 2] = Ga | 1;
            c[ga + (Ga + S) >> 2] = Ga;
            ea = Ga >>> 3;

            if (Ga >>> 0 < 256) {
              T = ea << 1;
              ca = 9284 + (T << 2) | 0;
              da = c[2311] | 0;
              X = 1 << ea;

              do if (!(da & X)) {
                c[2311] = da | X;
                Ha = 9284 + (T + 2 << 2) | 0;
                Ia = ca;
              } else {
                ea = 9284 + (T + 2 << 2) | 0;
                $ = c[ea >> 2] | 0;

                if ($ >>> 0 >= (c[2315] | 0) >>> 0) {
                  Ha = ea;
                  Ia = $;
                  break;
                }

                Aa();
              } while (0);

              c[Ha >> 2] = ka;
              c[Ia + 12 >> 2] = ka;
              c[ga + (S + 8) >> 2] = Ia;
              c[ga + (S + 12) >> 2] = ca;
              break;
            }

            T = Ga >>> 8;

            do if (!T) Ja = 0;else {
              if (Ga >>> 0 > 16777215) {
                Ja = 31;
                break;
              }

              X = (T + 1048320 | 0) >>> 16 & 8;
              da = T << X;
              la = (da + 520192 | 0) >>> 16 & 4;
              $ = da << la;
              da = ($ + 245760 | 0) >>> 16 & 2;
              ea = 14 - (la | X | da) + ($ << da >>> 15) | 0;
              Ja = Ga >>> (ea + 7 | 0) & 1 | ea << 1;
            } while (0);

            T = 9548 + (Ja << 2) | 0;
            c[ga + (S + 28) >> 2] = Ja;
            c[ga + (S + 20) >> 2] = 0;
            c[ga + (S + 16) >> 2] = 0;
            ca = c[2312] | 0;
            ea = 1 << Ja;

            if (!(ca & ea)) {
              c[2312] = ca | ea;
              c[T >> 2] = ka;
              c[ga + (S + 24) >> 2] = T;
              c[ga + (S + 12) >> 2] = ka;
              c[ga + (S + 8) >> 2] = ka;
              break;
            }

            ea = c[T >> 2] | 0;

            j: do if ((c[ea + 4 >> 2] & -8 | 0) != (Ga | 0)) {
              T = Ga << ((Ja | 0) == 31 ? 0 : 25 - (Ja >>> 1) | 0);
              ca = ea;

              while (1) {
                da = ca + 16 + (T >>> 31 << 2) | 0;
                $ = c[da >> 2] | 0;

                if (!$) {
                  Ka = da;
                  Ma = ca;
                  break;
                }

                if ((c[$ + 4 >> 2] & -8 | 0) == (Ga | 0)) {
                  Na = $;
                  break j;
                } else {
                  T = T << 1;
                  ca = $;
                }
              }

              if (Ka >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                c[Ka >> 2] = ka;
                c[ga + (S + 24) >> 2] = Ma;
                c[ga + (S + 12) >> 2] = ka;
                c[ga + (S + 8) >> 2] = ka;
                break h;
              }
            } else Na = ea; while (0);

            ea = Na + 8 | 0;
            ca = c[ea >> 2] | 0;
            T = c[2315] | 0;

            if (ca >>> 0 >= T >>> 0 & Na >>> 0 >= T >>> 0) {
              c[ca + 12 >> 2] = ka;
              c[ea >> 2] = ka;
              c[ga + (S + 8) >> 2] = ca;
              c[ga + (S + 12) >> 2] = Na;
              c[ga + (S + 24) >> 2] = 0;
              break;
            } else Aa();
          } else {
            ca = (c[2314] | 0) + ja | 0;
            c[2314] = ca;
            c[2317] = ka;
            c[ga + (S + 4) >> 2] = ca | 1;
          } while (0);

          n = ga + (ma | 8) | 0;
          return n | 0;
        } else va = 9692;

        while (1) {
          S = c[va >> 2] | 0;

          if (S >>> 0 <= na >>> 0 ? (ka = c[va + 4 >> 2] | 0, ja = S + ka | 0, ja >>> 0 > na >>> 0) : 0) {
            Oa = S;
            Pa = ka;
            Qa = ja;
            break;
          }

          va = c[va + 8 >> 2] | 0;
        }

        ma = Oa + (Pa + -39) | 0;
        ja = Oa + (Pa + -47 + ((ma & 7 | 0) == 0 ? 0 : 0 - ma & 7)) | 0;
        ma = na + 16 | 0;
        ka = ja >>> 0 < ma >>> 0 ? na : ja;
        ja = ka + 8 | 0;
        S = ga + 8 | 0;
        ia = (S & 7 | 0) == 0 ? 0 : 0 - S & 7;
        S = ha + -40 - ia | 0;
        c[2317] = ga + ia;
        c[2314] = S;
        c[ga + (ia + 4) >> 2] = S | 1;
        c[ga + (ha + -36) >> 2] = 40;
        c[2318] = c[2433];
        S = ka + 4 | 0;
        c[S >> 2] = 27;
        c[ja >> 2] = c[2423];
        c[ja + 4 >> 2] = c[2424];
        c[ja + 8 >> 2] = c[2425];
        c[ja + 12 >> 2] = c[2426];
        c[2423] = ga;
        c[2424] = ha;
        c[2426] = 0;
        c[2425] = ja;
        ja = ka + 28 | 0;
        c[ja >> 2] = 7;

        if ((ka + 32 | 0) >>> 0 < Qa >>> 0) {
          ia = ja;

          do {
            ja = ia;
            ia = ia + 4 | 0;
            c[ia >> 2] = 7;
          } while ((ja + 8 | 0) >>> 0 < Qa >>> 0);
        }

        if ((ka | 0) != (na | 0)) {
          ia = ka - na | 0;
          c[S >> 2] = c[S >> 2] & -2;
          c[na + 4 >> 2] = ia | 1;
          c[ka >> 2] = ia;
          ja = ia >>> 3;

          if (ia >>> 0 < 256) {
            fa = ja << 1;
            ca = 9284 + (fa << 2) | 0;
            ea = c[2311] | 0;
            T = 1 << ja;

            if (ea & T) {
              ja = 9284 + (fa + 2 << 2) | 0;
              Z = c[ja >> 2] | 0;
              if (Z >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
                Ra = ja;
                Sa = Z;
              }
            } else {
              c[2311] = ea | T;
              Ra = 9284 + (fa + 2 << 2) | 0;
              Sa = ca;
            }

            c[Ra >> 2] = na;
            c[Sa + 12 >> 2] = na;
            c[na + 8 >> 2] = Sa;
            c[na + 12 >> 2] = ca;
            break;
          }

          ca = ia >>> 8;
          if (ca) {
            if (ia >>> 0 > 16777215) Ta = 31;else {
              fa = (ca + 1048320 | 0) >>> 16 & 8;
              T = ca << fa;
              ca = (T + 520192 | 0) >>> 16 & 4;
              ea = T << ca;
              T = (ea + 245760 | 0) >>> 16 & 2;
              Z = 14 - (ca | fa | T) + (ea << T >>> 15) | 0;
              Ta = ia >>> (Z + 7 | 0) & 1 | Z << 1;
            }
          } else Ta = 0;
          Z = 9548 + (Ta << 2) | 0;
          c[na + 28 >> 2] = Ta;
          c[na + 20 >> 2] = 0;
          c[ma >> 2] = 0;
          T = c[2312] | 0;
          ea = 1 << Ta;

          if (!(T & ea)) {
            c[2312] = T | ea;
            c[Z >> 2] = na;
            c[na + 24 >> 2] = Z;
            c[na + 12 >> 2] = na;
            c[na + 8 >> 2] = na;
            break;
          }

          ea = c[Z >> 2] | 0;

          k: do if ((c[ea + 4 >> 2] & -8 | 0) != (ia | 0)) {
            Z = ia << ((Ta | 0) == 31 ? 0 : 25 - (Ta >>> 1) | 0);
            T = ea;

            while (1) {
              fa = T + 16 + (Z >>> 31 << 2) | 0;
              ca = c[fa >> 2] | 0;

              if (!ca) {
                Ua = fa;
                Va = T;
                break;
              }

              if ((c[ca + 4 >> 2] & -8 | 0) == (ia | 0)) {
                Wa = ca;
                break k;
              } else {
                Z = Z << 1;
                T = ca;
              }
            }

            if (Ua >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
              c[Ua >> 2] = na;
              c[na + 24 >> 2] = Va;
              c[na + 12 >> 2] = na;
              c[na + 8 >> 2] = na;
              break g;
            }
          } else Wa = ea; while (0);

          ea = Wa + 8 | 0;
          ia = c[ea >> 2] | 0;
          ma = c[2315] | 0;

          if (ia >>> 0 >= ma >>> 0 & Wa >>> 0 >= ma >>> 0) {
            c[ia + 12 >> 2] = na;
            c[ea >> 2] = na;
            c[na + 8 >> 2] = ia;
            c[na + 12 >> 2] = Wa;
            c[na + 24 >> 2] = 0;
            break;
          } else Aa();
        }
      } else {
        ia = c[2315] | 0;
        if ((ia | 0) == 0 | ga >>> 0 < ia >>> 0) c[2315] = ga;
        c[2423] = ga;
        c[2424] = ha;
        c[2426] = 0;
        c[2320] = c[2429];
        c[2319] = -1;
        ia = 0;

        do {
          ea = ia << 1;
          ma = 9284 + (ea << 2) | 0;
          c[9284 + (ea + 3 << 2) >> 2] = ma;
          c[9284 + (ea + 2 << 2) >> 2] = ma;
          ia = ia + 1 | 0;
        } while ((ia | 0) != 32);

        ia = ga + 8 | 0;
        ma = (ia & 7 | 0) == 0 ? 0 : 0 - ia & 7;
        ia = ha + -40 - ma | 0;
        c[2317] = ga + ma;
        c[2314] = ia;
        c[ga + (ma + 4) >> 2] = ia | 1;
        c[ga + (ha + -36) >> 2] = 40;
        c[2318] = c[2433];
      } while (0);

      ha = c[2314] | 0;

      if (ha >>> 0 > F >>> 0) {
        ga = ha - F | 0;
        c[2314] = ga;
        ha = c[2317] | 0;
        c[2317] = ha + F;
        c[ha + (F + 4) >> 2] = ga | 1;
        c[ha + 4 >> 2] = F | 3;
        n = ha + 8 | 0;
        return n | 0;
      }
    }

    c[(ce() | 0) >> 2] = 12;
    n = 0;
    return n | 0;
  }

  function Se(a) {
    a = a | 0;
    var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0;
    if (!a) return;
    b = a + -8 | 0;
    d = c[2315] | 0;
    if (b >>> 0 < d >>> 0) Aa();
    e = c[a + -4 >> 2] | 0;
    f = e & 3;
    if ((f | 0) == 1) Aa();
    g = e & -8;
    h = a + (g + -8) | 0;

    do if (!(e & 1)) {
      i = c[b >> 2] | 0;
      if (!f) return;
      j = -8 - i | 0;
      k = a + j | 0;
      l = i + g | 0;
      if (k >>> 0 < d >>> 0) Aa();

      if ((k | 0) == (c[2316] | 0)) {
        m = a + (g + -4) | 0;
        n = c[m >> 2] | 0;

        if ((n & 3 | 0) != 3) {
          o = k;
          p = l;
          break;
        }

        c[2313] = l;
        c[m >> 2] = n & -2;
        c[a + (j + 4) >> 2] = l | 1;
        c[h >> 2] = l;
        return;
      }

      n = i >>> 3;

      if (i >>> 0 < 256) {
        i = c[a + (j + 8) >> 2] | 0;
        m = c[a + (j + 12) >> 2] | 0;
        q = 9284 + (n << 1 << 2) | 0;

        if ((i | 0) != (q | 0)) {
          if (i >>> 0 < d >>> 0) Aa();
          if ((c[i + 12 >> 2] | 0) != (k | 0)) Aa();
        }

        if ((m | 0) == (i | 0)) {
          c[2311] = c[2311] & ~(1 << n);
          o = k;
          p = l;
          break;
        }

        if ((m | 0) != (q | 0)) {
          if (m >>> 0 < d >>> 0) Aa();
          q = m + 8 | 0;
          if ((c[q >> 2] | 0) == (k | 0)) r = q;else Aa();
        } else r = m + 8 | 0;

        c[i + 12 >> 2] = m;
        c[r >> 2] = i;
        o = k;
        p = l;
        break;
      }

      i = c[a + (j + 24) >> 2] | 0;
      m = c[a + (j + 12) >> 2] | 0;

      do if ((m | 0) == (k | 0)) {
        q = a + (j + 20) | 0;
        n = c[q >> 2] | 0;

        if (!n) {
          s = a + (j + 16) | 0;
          t = c[s >> 2] | 0;

          if (!t) {
            u = 0;
            break;
          } else {
            v = t;
            w = s;
          }
        } else {
          v = n;
          w = q;
        }

        while (1) {
          q = v + 20 | 0;
          n = c[q >> 2] | 0;

          if (n) {
            v = n;
            w = q;
            continue;
          }

          q = v + 16 | 0;
          n = c[q >> 2] | 0;

          if (!n) {
            x = v;
            y = w;
            break;
          } else {
            v = n;
            w = q;
          }
        }

        if (y >>> 0 < d >>> 0) Aa();else {
          c[y >> 2] = 0;
          u = x;
          break;
        }
      } else {
        q = c[a + (j + 8) >> 2] | 0;
        if (q >>> 0 < d >>> 0) Aa();
        n = q + 12 | 0;
        if ((c[n >> 2] | 0) != (k | 0)) Aa();
        s = m + 8 | 0;

        if ((c[s >> 2] | 0) == (k | 0)) {
          c[n >> 2] = m;
          c[s >> 2] = q;
          u = m;
          break;
        } else Aa();
      } while (0);

      if (i) {
        m = c[a + (j + 28) >> 2] | 0;
        q = 9548 + (m << 2) | 0;

        if ((k | 0) == (c[q >> 2] | 0)) {
          c[q >> 2] = u;

          if (!u) {
            c[2312] = c[2312] & ~(1 << m);
            o = k;
            p = l;
            break;
          }
        } else {
          if (i >>> 0 < (c[2315] | 0) >>> 0) Aa();
          m = i + 16 | 0;
          if ((c[m >> 2] | 0) == (k | 0)) c[m >> 2] = u;else c[i + 20 >> 2] = u;

          if (!u) {
            o = k;
            p = l;
            break;
          }
        }

        m = c[2315] | 0;
        if (u >>> 0 < m >>> 0) Aa();
        c[u + 24 >> 2] = i;
        q = c[a + (j + 16) >> 2] | 0;

        do if (q) if (q >>> 0 < m >>> 0) Aa();else {
          c[u + 16 >> 2] = q;
          c[q + 24 >> 2] = u;
          break;
        } while (0);

        q = c[a + (j + 20) >> 2] | 0;
        if (q) {
          if (q >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
            c[u + 20 >> 2] = q;
            c[q + 24 >> 2] = u;
            o = k;
            p = l;
            break;
          }
        } else {
          o = k;
          p = l;
        }
      } else {
        o = k;
        p = l;
      }
    } else {
      o = b;
      p = g;
    } while (0);

    if (o >>> 0 >= h >>> 0) Aa();
    b = a + (g + -4) | 0;
    u = c[b >> 2] | 0;
    if (!(u & 1)) Aa();

    if (!(u & 2)) {
      if ((h | 0) == (c[2317] | 0)) {
        d = (c[2314] | 0) + p | 0;
        c[2314] = d;
        c[2317] = o;
        c[o + 4 >> 2] = d | 1;
        if ((o | 0) != (c[2316] | 0)) return;
        c[2316] = 0;
        c[2313] = 0;
        return;
      }

      if ((h | 0) == (c[2316] | 0)) {
        d = (c[2313] | 0) + p | 0;
        c[2313] = d;
        c[2316] = o;
        c[o + 4 >> 2] = d | 1;
        c[o + d >> 2] = d;
        return;
      }

      d = (u & -8) + p | 0;
      x = u >>> 3;

      do if (u >>> 0 >= 256) {
        y = c[a + (g + 16) >> 2] | 0;
        w = c[a + (g | 4) >> 2] | 0;

        do if ((w | 0) == (h | 0)) {
          v = a + (g + 12) | 0;
          r = c[v >> 2] | 0;

          if (!r) {
            f = a + (g + 8) | 0;
            e = c[f >> 2] | 0;

            if (!e) {
              z = 0;
              break;
            } else {
              A = e;
              B = f;
            }
          } else {
            A = r;
            B = v;
          }

          while (1) {
            v = A + 20 | 0;
            r = c[v >> 2] | 0;

            if (r) {
              A = r;
              B = v;
              continue;
            }

            v = A + 16 | 0;
            r = c[v >> 2] | 0;

            if (!r) {
              C = A;
              D = B;
              break;
            } else {
              A = r;
              B = v;
            }
          }

          if (D >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
            c[D >> 2] = 0;
            z = C;
            break;
          }
        } else {
          v = c[a + g >> 2] | 0;
          if (v >>> 0 < (c[2315] | 0) >>> 0) Aa();
          r = v + 12 | 0;
          if ((c[r >> 2] | 0) != (h | 0)) Aa();
          f = w + 8 | 0;

          if ((c[f >> 2] | 0) == (h | 0)) {
            c[r >> 2] = w;
            c[f >> 2] = v;
            z = w;
            break;
          } else Aa();
        } while (0);

        if (y) {
          w = c[a + (g + 20) >> 2] | 0;
          l = 9548 + (w << 2) | 0;

          if ((h | 0) == (c[l >> 2] | 0)) {
            c[l >> 2] = z;

            if (!z) {
              c[2312] = c[2312] & ~(1 << w);
              break;
            }
          } else {
            if (y >>> 0 < (c[2315] | 0) >>> 0) Aa();
            w = y + 16 | 0;
            if ((c[w >> 2] | 0) == (h | 0)) c[w >> 2] = z;else c[y + 20 >> 2] = z;
            if (!z) break;
          }

          w = c[2315] | 0;
          if (z >>> 0 < w >>> 0) Aa();
          c[z + 24 >> 2] = y;
          l = c[a + (g + 8) >> 2] | 0;

          do if (l) if (l >>> 0 < w >>> 0) Aa();else {
            c[z + 16 >> 2] = l;
            c[l + 24 >> 2] = z;
            break;
          } while (0);

          l = c[a + (g + 12) >> 2] | 0;
          if (l) if (l >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
            c[z + 20 >> 2] = l;
            c[l + 24 >> 2] = z;
            break;
          }
        }
      } else {
        l = c[a + g >> 2] | 0;
        w = c[a + (g | 4) >> 2] | 0;
        y = 9284 + (x << 1 << 2) | 0;

        if ((l | 0) != (y | 0)) {
          if (l >>> 0 < (c[2315] | 0) >>> 0) Aa();
          if ((c[l + 12 >> 2] | 0) != (h | 0)) Aa();
        }

        if ((w | 0) == (l | 0)) {
          c[2311] = c[2311] & ~(1 << x);
          break;
        }

        if ((w | 0) != (y | 0)) {
          if (w >>> 0 < (c[2315] | 0) >>> 0) Aa();
          y = w + 8 | 0;
          if ((c[y >> 2] | 0) == (h | 0)) E = y;else Aa();
        } else E = w + 8 | 0;

        c[l + 12 >> 2] = w;
        c[E >> 2] = l;
      } while (0);

      c[o + 4 >> 2] = d | 1;
      c[o + d >> 2] = d;

      if ((o | 0) == (c[2316] | 0)) {
        c[2313] = d;
        return;
      } else F = d;
    } else {
      c[b >> 2] = u & -2;
      c[o + 4 >> 2] = p | 1;
      c[o + p >> 2] = p;
      F = p;
    }

    p = F >>> 3;

    if (F >>> 0 < 256) {
      u = p << 1;
      b = 9284 + (u << 2) | 0;
      d = c[2311] | 0;
      E = 1 << p;

      if (d & E) {
        p = 9284 + (u + 2 << 2) | 0;
        h = c[p >> 2] | 0;
        if (h >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
          G = p;
          H = h;
        }
      } else {
        c[2311] = d | E;
        G = 9284 + (u + 2 << 2) | 0;
        H = b;
      }

      c[G >> 2] = o;
      c[H + 12 >> 2] = o;
      c[o + 8 >> 2] = H;
      c[o + 12 >> 2] = b;
      return;
    }

    b = F >>> 8;
    if (b) {
      if (F >>> 0 > 16777215) I = 31;else {
        H = (b + 1048320 | 0) >>> 16 & 8;
        G = b << H;
        b = (G + 520192 | 0) >>> 16 & 4;
        u = G << b;
        G = (u + 245760 | 0) >>> 16 & 2;
        E = 14 - (b | H | G) + (u << G >>> 15) | 0;
        I = F >>> (E + 7 | 0) & 1 | E << 1;
      }
    } else I = 0;
    E = 9548 + (I << 2) | 0;
    c[o + 28 >> 2] = I;
    c[o + 20 >> 2] = 0;
    c[o + 16 >> 2] = 0;
    G = c[2312] | 0;
    u = 1 << I;

    a: do if (G & u) {
      H = c[E >> 2] | 0;

      b: do if ((c[H + 4 >> 2] & -8 | 0) != (F | 0)) {
        b = F << ((I | 0) == 31 ? 0 : 25 - (I >>> 1) | 0);
        d = H;

        while (1) {
          h = d + 16 + (b >>> 31 << 2) | 0;
          p = c[h >> 2] | 0;

          if (!p) {
            J = h;
            K = d;
            break;
          }

          if ((c[p + 4 >> 2] & -8 | 0) == (F | 0)) {
            L = p;
            break b;
          } else {
            b = b << 1;
            d = p;
          }
        }

        if (J >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
          c[J >> 2] = o;
          c[o + 24 >> 2] = K;
          c[o + 12 >> 2] = o;
          c[o + 8 >> 2] = o;
          break a;
        }
      } else L = H; while (0);

      H = L + 8 | 0;
      d = c[H >> 2] | 0;
      b = c[2315] | 0;

      if (d >>> 0 >= b >>> 0 & L >>> 0 >= b >>> 0) {
        c[d + 12 >> 2] = o;
        c[H >> 2] = o;
        c[o + 8 >> 2] = d;
        c[o + 12 >> 2] = L;
        c[o + 24 >> 2] = 0;
        break;
      } else Aa();
    } else {
      c[2312] = G | u;
      c[E >> 2] = o;
      c[o + 24 >> 2] = E;
      c[o + 12 >> 2] = o;
      c[o + 8 >> 2] = o;
    } while (0);

    o = (c[2319] | 0) + -1 | 0;
    c[2319] = o;
    if (!o) M = 9700;else return;

    while (1) {
      o = c[M >> 2] | 0;
      if (!o) break;else M = o + 8 | 0;
    }

    c[2319] = -1;
    return;
  }

  function Te(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0;

    if (!a) {
      d = Re(b) | 0;
      return d | 0;
    }

    if (b >>> 0 > 4294967231) {
      c[(ce() | 0) >> 2] = 12;
      d = 0;
      return d | 0;
    }

    e = Ue(a + -8 | 0, b >>> 0 < 11 ? 16 : b + 11 & -8) | 0;

    if (e) {
      d = e + 8 | 0;
      return d | 0;
    }

    e = Re(b) | 0;

    if (!e) {
      d = 0;
      return d | 0;
    }

    f = c[a + -4 >> 2] | 0;
    g = (f & -8) - ((f & 3 | 0) == 0 ? 8 : 4) | 0;
    af(e | 0, a | 0, (g >>> 0 < b >>> 0 ? g : b) | 0) | 0;
    Se(a);
    d = e;
    return d | 0;
  }

  function Ue(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
    d = a + 4 | 0;
    e = c[d >> 2] | 0;
    f = e & -8;
    g = a + f | 0;
    h = c[2315] | 0;
    i = e & 3;
    if (!((i | 0) != 1 & a >>> 0 >= h >>> 0 & a >>> 0 < g >>> 0)) Aa();
    j = a + (f | 4) | 0;
    k = c[j >> 2] | 0;
    if (!(k & 1)) Aa();

    if (!i) {
      if (b >>> 0 < 256) {
        l = 0;
        return l | 0;
      }

      if (f >>> 0 >= (b + 4 | 0) >>> 0 ? (f - b | 0) >>> 0 <= c[2431] << 1 >>> 0 : 0) {
        l = a;
        return l | 0;
      }

      l = 0;
      return l | 0;
    }

    if (f >>> 0 >= b >>> 0) {
      i = f - b | 0;

      if (i >>> 0 <= 15) {
        l = a;
        return l | 0;
      }

      c[d >> 2] = e & 1 | b | 2;
      c[a + (b + 4) >> 2] = i | 3;
      c[j >> 2] = c[j >> 2] | 1;
      Ve(a + b | 0, i);
      l = a;
      return l | 0;
    }

    if ((g | 0) == (c[2317] | 0)) {
      i = (c[2314] | 0) + f | 0;

      if (i >>> 0 <= b >>> 0) {
        l = 0;
        return l | 0;
      }

      j = i - b | 0;
      c[d >> 2] = e & 1 | b | 2;
      c[a + (b + 4) >> 2] = j | 1;
      c[2317] = a + b;
      c[2314] = j;
      l = a;
      return l | 0;
    }

    if ((g | 0) == (c[2316] | 0)) {
      j = (c[2313] | 0) + f | 0;

      if (j >>> 0 < b >>> 0) {
        l = 0;
        return l | 0;
      }

      i = j - b | 0;

      if (i >>> 0 > 15) {
        c[d >> 2] = e & 1 | b | 2;
        c[a + (b + 4) >> 2] = i | 1;
        c[a + j >> 2] = i;
        m = a + (j + 4) | 0;
        c[m >> 2] = c[m >> 2] & -2;
        n = a + b | 0;
        o = i;
      } else {
        c[d >> 2] = e & 1 | j | 2;
        i = a + (j + 4) | 0;
        c[i >> 2] = c[i >> 2] | 1;
        n = 0;
        o = 0;
      }

      c[2313] = o;
      c[2316] = n;
      l = a;
      return l | 0;
    }

    if (k & 2) {
      l = 0;
      return l | 0;
    }

    n = (k & -8) + f | 0;

    if (n >>> 0 < b >>> 0) {
      l = 0;
      return l | 0;
    }

    o = n - b | 0;
    i = k >>> 3;

    do if (k >>> 0 >= 256) {
      j = c[a + (f + 24) >> 2] | 0;
      m = c[a + (f + 12) >> 2] | 0;

      do if ((m | 0) == (g | 0)) {
        p = a + (f + 20) | 0;
        q = c[p >> 2] | 0;

        if (!q) {
          r = a + (f + 16) | 0;
          s = c[r >> 2] | 0;

          if (!s) {
            t = 0;
            break;
          } else {
            u = s;
            v = r;
          }
        } else {
          u = q;
          v = p;
        }

        while (1) {
          p = u + 20 | 0;
          q = c[p >> 2] | 0;

          if (q) {
            u = q;
            v = p;
            continue;
          }

          p = u + 16 | 0;
          q = c[p >> 2] | 0;

          if (!q) {
            w = u;
            x = v;
            break;
          } else {
            u = q;
            v = p;
          }
        }

        if (x >>> 0 < h >>> 0) Aa();else {
          c[x >> 2] = 0;
          t = w;
          break;
        }
      } else {
        p = c[a + (f + 8) >> 2] | 0;
        if (p >>> 0 < h >>> 0) Aa();
        q = p + 12 | 0;
        if ((c[q >> 2] | 0) != (g | 0)) Aa();
        r = m + 8 | 0;

        if ((c[r >> 2] | 0) == (g | 0)) {
          c[q >> 2] = m;
          c[r >> 2] = p;
          t = m;
          break;
        } else Aa();
      } while (0);

      if (j) {
        m = c[a + (f + 28) >> 2] | 0;
        p = 9548 + (m << 2) | 0;

        if ((g | 0) == (c[p >> 2] | 0)) {
          c[p >> 2] = t;

          if (!t) {
            c[2312] = c[2312] & ~(1 << m);
            break;
          }
        } else {
          if (j >>> 0 < (c[2315] | 0) >>> 0) Aa();
          m = j + 16 | 0;
          if ((c[m >> 2] | 0) == (g | 0)) c[m >> 2] = t;else c[j + 20 >> 2] = t;
          if (!t) break;
        }

        m = c[2315] | 0;
        if (t >>> 0 < m >>> 0) Aa();
        c[t + 24 >> 2] = j;
        p = c[a + (f + 16) >> 2] | 0;

        do if (p) if (p >>> 0 < m >>> 0) Aa();else {
          c[t + 16 >> 2] = p;
          c[p + 24 >> 2] = t;
          break;
        } while (0);

        p = c[a + (f + 20) >> 2] | 0;
        if (p) if (p >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
          c[t + 20 >> 2] = p;
          c[p + 24 >> 2] = t;
          break;
        }
      }
    } else {
      p = c[a + (f + 8) >> 2] | 0;
      m = c[a + (f + 12) >> 2] | 0;
      j = 9284 + (i << 1 << 2) | 0;

      if ((p | 0) != (j | 0)) {
        if (p >>> 0 < h >>> 0) Aa();
        if ((c[p + 12 >> 2] | 0) != (g | 0)) Aa();
      }

      if ((m | 0) == (p | 0)) {
        c[2311] = c[2311] & ~(1 << i);
        break;
      }

      if ((m | 0) != (j | 0)) {
        if (m >>> 0 < h >>> 0) Aa();
        j = m + 8 | 0;
        if ((c[j >> 2] | 0) == (g | 0)) y = j;else Aa();
      } else y = m + 8 | 0;

      c[p + 12 >> 2] = m;
      c[y >> 2] = p;
    } while (0);

    if (o >>> 0 < 16) {
      c[d >> 2] = n | e & 1 | 2;
      y = a + (n | 4) | 0;
      c[y >> 2] = c[y >> 2] | 1;
      l = a;
      return l | 0;
    } else {
      c[d >> 2] = e & 1 | b | 2;
      c[a + (b + 4) >> 2] = o | 3;
      e = a + (n | 4) | 0;
      c[e >> 2] = c[e >> 2] | 1;
      Ve(a + b | 0, o);
      l = a;
      return l | 0;
    }

    return 0;
  }

  function Ve(a, b) {
    a = a | 0;
    b = b | 0;
    var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0;
    d = a + b | 0;
    e = c[a + 4 >> 2] | 0;

    do if (!(e & 1)) {
      f = c[a >> 2] | 0;
      if (!(e & 3)) return;
      g = a + (0 - f) | 0;
      h = f + b | 0;
      i = c[2315] | 0;
      if (g >>> 0 < i >>> 0) Aa();

      if ((g | 0) == (c[2316] | 0)) {
        j = a + (b + 4) | 0;
        k = c[j >> 2] | 0;

        if ((k & 3 | 0) != 3) {
          l = g;
          m = h;
          break;
        }

        c[2313] = h;
        c[j >> 2] = k & -2;
        c[a + (4 - f) >> 2] = h | 1;
        c[d >> 2] = h;
        return;
      }

      k = f >>> 3;

      if (f >>> 0 < 256) {
        j = c[a + (8 - f) >> 2] | 0;
        n = c[a + (12 - f) >> 2] | 0;
        o = 9284 + (k << 1 << 2) | 0;

        if ((j | 0) != (o | 0)) {
          if (j >>> 0 < i >>> 0) Aa();
          if ((c[j + 12 >> 2] | 0) != (g | 0)) Aa();
        }

        if ((n | 0) == (j | 0)) {
          c[2311] = c[2311] & ~(1 << k);
          l = g;
          m = h;
          break;
        }

        if ((n | 0) != (o | 0)) {
          if (n >>> 0 < i >>> 0) Aa();
          o = n + 8 | 0;
          if ((c[o >> 2] | 0) == (g | 0)) p = o;else Aa();
        } else p = n + 8 | 0;

        c[j + 12 >> 2] = n;
        c[p >> 2] = j;
        l = g;
        m = h;
        break;
      }

      j = c[a + (24 - f) >> 2] | 0;
      n = c[a + (12 - f) >> 2] | 0;

      do if ((n | 0) == (g | 0)) {
        o = 16 - f | 0;
        k = a + (o + 4) | 0;
        q = c[k >> 2] | 0;

        if (!q) {
          r = a + o | 0;
          o = c[r >> 2] | 0;

          if (!o) {
            s = 0;
            break;
          } else {
            t = o;
            u = r;
          }
        } else {
          t = q;
          u = k;
        }

        while (1) {
          k = t + 20 | 0;
          q = c[k >> 2] | 0;

          if (q) {
            t = q;
            u = k;
            continue;
          }

          k = t + 16 | 0;
          q = c[k >> 2] | 0;

          if (!q) {
            v = t;
            w = u;
            break;
          } else {
            t = q;
            u = k;
          }
        }

        if (w >>> 0 < i >>> 0) Aa();else {
          c[w >> 2] = 0;
          s = v;
          break;
        }
      } else {
        k = c[a + (8 - f) >> 2] | 0;
        if (k >>> 0 < i >>> 0) Aa();
        q = k + 12 | 0;
        if ((c[q >> 2] | 0) != (g | 0)) Aa();
        r = n + 8 | 0;

        if ((c[r >> 2] | 0) == (g | 0)) {
          c[q >> 2] = n;
          c[r >> 2] = k;
          s = n;
          break;
        } else Aa();
      } while (0);

      if (j) {
        n = c[a + (28 - f) >> 2] | 0;
        i = 9548 + (n << 2) | 0;

        if ((g | 0) == (c[i >> 2] | 0)) {
          c[i >> 2] = s;

          if (!s) {
            c[2312] = c[2312] & ~(1 << n);
            l = g;
            m = h;
            break;
          }
        } else {
          if (j >>> 0 < (c[2315] | 0) >>> 0) Aa();
          n = j + 16 | 0;
          if ((c[n >> 2] | 0) == (g | 0)) c[n >> 2] = s;else c[j + 20 >> 2] = s;

          if (!s) {
            l = g;
            m = h;
            break;
          }
        }

        n = c[2315] | 0;
        if (s >>> 0 < n >>> 0) Aa();
        c[s + 24 >> 2] = j;
        i = 16 - f | 0;
        k = c[a + i >> 2] | 0;

        do if (k) if (k >>> 0 < n >>> 0) Aa();else {
          c[s + 16 >> 2] = k;
          c[k + 24 >> 2] = s;
          break;
        } while (0);

        k = c[a + (i + 4) >> 2] | 0;
        if (k) {
          if (k >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
            c[s + 20 >> 2] = k;
            c[k + 24 >> 2] = s;
            l = g;
            m = h;
            break;
          }
        } else {
          l = g;
          m = h;
        }
      } else {
        l = g;
        m = h;
      }
    } else {
      l = a;
      m = b;
    } while (0);

    s = c[2315] | 0;
    if (d >>> 0 < s >>> 0) Aa();
    v = a + (b + 4) | 0;
    w = c[v >> 2] | 0;

    if (!(w & 2)) {
      if ((d | 0) == (c[2317] | 0)) {
        u = (c[2314] | 0) + m | 0;
        c[2314] = u;
        c[2317] = l;
        c[l + 4 >> 2] = u | 1;
        if ((l | 0) != (c[2316] | 0)) return;
        c[2316] = 0;
        c[2313] = 0;
        return;
      }

      if ((d | 0) == (c[2316] | 0)) {
        u = (c[2313] | 0) + m | 0;
        c[2313] = u;
        c[2316] = l;
        c[l + 4 >> 2] = u | 1;
        c[l + u >> 2] = u;
        return;
      }

      u = (w & -8) + m | 0;
      t = w >>> 3;

      do if (w >>> 0 >= 256) {
        p = c[a + (b + 24) >> 2] | 0;
        e = c[a + (b + 12) >> 2] | 0;

        do if ((e | 0) == (d | 0)) {
          k = a + (b + 20) | 0;
          n = c[k >> 2] | 0;

          if (!n) {
            f = a + (b + 16) | 0;
            j = c[f >> 2] | 0;

            if (!j) {
              x = 0;
              break;
            } else {
              y = j;
              z = f;
            }
          } else {
            y = n;
            z = k;
          }

          while (1) {
            k = y + 20 | 0;
            n = c[k >> 2] | 0;

            if (n) {
              y = n;
              z = k;
              continue;
            }

            k = y + 16 | 0;
            n = c[k >> 2] | 0;

            if (!n) {
              A = y;
              B = z;
              break;
            } else {
              y = n;
              z = k;
            }
          }

          if (B >>> 0 < s >>> 0) Aa();else {
            c[B >> 2] = 0;
            x = A;
            break;
          }
        } else {
          k = c[a + (b + 8) >> 2] | 0;
          if (k >>> 0 < s >>> 0) Aa();
          n = k + 12 | 0;
          if ((c[n >> 2] | 0) != (d | 0)) Aa();
          f = e + 8 | 0;

          if ((c[f >> 2] | 0) == (d | 0)) {
            c[n >> 2] = e;
            c[f >> 2] = k;
            x = e;
            break;
          } else Aa();
        } while (0);

        if (p) {
          e = c[a + (b + 28) >> 2] | 0;
          h = 9548 + (e << 2) | 0;

          if ((d | 0) == (c[h >> 2] | 0)) {
            c[h >> 2] = x;

            if (!x) {
              c[2312] = c[2312] & ~(1 << e);
              break;
            }
          } else {
            if (p >>> 0 < (c[2315] | 0) >>> 0) Aa();
            e = p + 16 | 0;
            if ((c[e >> 2] | 0) == (d | 0)) c[e >> 2] = x;else c[p + 20 >> 2] = x;
            if (!x) break;
          }

          e = c[2315] | 0;
          if (x >>> 0 < e >>> 0) Aa();
          c[x + 24 >> 2] = p;
          h = c[a + (b + 16) >> 2] | 0;

          do if (h) if (h >>> 0 < e >>> 0) Aa();else {
            c[x + 16 >> 2] = h;
            c[h + 24 >> 2] = x;
            break;
          } while (0);

          h = c[a + (b + 20) >> 2] | 0;
          if (h) if (h >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
            c[x + 20 >> 2] = h;
            c[h + 24 >> 2] = x;
            break;
          }
        }
      } else {
        h = c[a + (b + 8) >> 2] | 0;
        e = c[a + (b + 12) >> 2] | 0;
        p = 9284 + (t << 1 << 2) | 0;

        if ((h | 0) != (p | 0)) {
          if (h >>> 0 < s >>> 0) Aa();
          if ((c[h + 12 >> 2] | 0) != (d | 0)) Aa();
        }

        if ((e | 0) == (h | 0)) {
          c[2311] = c[2311] & ~(1 << t);
          break;
        }

        if ((e | 0) != (p | 0)) {
          if (e >>> 0 < s >>> 0) Aa();
          p = e + 8 | 0;
          if ((c[p >> 2] | 0) == (d | 0)) C = p;else Aa();
        } else C = e + 8 | 0;

        c[h + 12 >> 2] = e;
        c[C >> 2] = h;
      } while (0);

      c[l + 4 >> 2] = u | 1;
      c[l + u >> 2] = u;

      if ((l | 0) == (c[2316] | 0)) {
        c[2313] = u;
        return;
      } else D = u;
    } else {
      c[v >> 2] = w & -2;
      c[l + 4 >> 2] = m | 1;
      c[l + m >> 2] = m;
      D = m;
    }

    m = D >>> 3;

    if (D >>> 0 < 256) {
      w = m << 1;
      v = 9284 + (w << 2) | 0;
      u = c[2311] | 0;
      C = 1 << m;

      if (u & C) {
        m = 9284 + (w + 2 << 2) | 0;
        d = c[m >> 2] | 0;
        if (d >>> 0 < (c[2315] | 0) >>> 0) Aa();else {
          E = m;
          F = d;
        }
      } else {
        c[2311] = u | C;
        E = 9284 + (w + 2 << 2) | 0;
        F = v;
      }

      c[E >> 2] = l;
      c[F + 12 >> 2] = l;
      c[l + 8 >> 2] = F;
      c[l + 12 >> 2] = v;
      return;
    }

    v = D >>> 8;
    if (v) {
      if (D >>> 0 > 16777215) G = 31;else {
        F = (v + 1048320 | 0) >>> 16 & 8;
        E = v << F;
        v = (E + 520192 | 0) >>> 16 & 4;
        w = E << v;
        E = (w + 245760 | 0) >>> 16 & 2;
        C = 14 - (v | F | E) + (w << E >>> 15) | 0;
        G = D >>> (C + 7 | 0) & 1 | C << 1;
      }
    } else G = 0;
    C = 9548 + (G << 2) | 0;
    c[l + 28 >> 2] = G;
    c[l + 20 >> 2] = 0;
    c[l + 16 >> 2] = 0;
    E = c[2312] | 0;
    w = 1 << G;

    if (!(E & w)) {
      c[2312] = E | w;
      c[C >> 2] = l;
      c[l + 24 >> 2] = C;
      c[l + 12 >> 2] = l;
      c[l + 8 >> 2] = l;
      return;
    }

    w = c[C >> 2] | 0;

    a: do if ((c[w + 4 >> 2] & -8 | 0) == (D | 0)) H = w;else {
      C = D << ((G | 0) == 31 ? 0 : 25 - (G >>> 1) | 0);
      E = w;

      while (1) {
        F = E + 16 + (C >>> 31 << 2) | 0;
        v = c[F >> 2] | 0;

        if (!v) {
          I = F;
          J = E;
          break;
        }

        if ((c[v + 4 >> 2] & -8 | 0) == (D | 0)) {
          H = v;
          break a;
        } else {
          C = C << 1;
          E = v;
        }
      }

      if (I >>> 0 < (c[2315] | 0) >>> 0) Aa();
      c[I >> 2] = l;
      c[l + 24 >> 2] = J;
      c[l + 12 >> 2] = l;
      c[l + 8 >> 2] = l;
      return;
    } while (0);

    J = H + 8 | 0;
    I = c[J >> 2] | 0;
    D = c[2315] | 0;
    if (!(I >>> 0 >= D >>> 0 & H >>> 0 >= D >>> 0)) Aa();
    c[I + 12 >> 2] = l;
    c[J >> 2] = l;
    c[l + 8 >> 2] = I;
    c[l + 12 >> 2] = H;
    c[l + 24 >> 2] = 0;
    return;
  }

  function We() {}

  function Xe(a, b, c, d) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    var e = 0;
    e = b - d >>> 0;
    e = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
    return (C = e, a - c >>> 0 | 0) | 0;
  }

  function Ye(a, b, c, d) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    var e = 0;
    e = a + c >>> 0;
    return (C = b + d + (e >>> 0 < a >>> 0 | 0) >>> 0, e | 0) | 0;
  }

  function Ze(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        i = 0;
    f = b + e | 0;

    if ((e | 0) >= 20) {
      d = d & 255;
      g = b & 3;
      h = d | d << 8 | d << 16 | d << 24;
      i = f & ~3;

      if (g) {
        g = b + 4 - g | 0;

        while ((b | 0) < (g | 0)) {
          a[b >> 0] = d;
          b = b + 1 | 0;
        }
      }

      while ((b | 0) < (i | 0)) {
        c[b >> 2] = h;
        b = b + 4 | 0;
      }
    }

    while ((b | 0) < (f | 0)) {
      a[b >> 0] = d;
      b = b + 1 | 0;
    }

    return b - e | 0;
  }

  function _e(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;

    if ((c | 0) < 32) {
      C = b >>> c;
      return a >>> c | (b & (1 << c) - 1) << 32 - c;
    }

    C = 0;
    return b >>> c - 32 | 0;
  }

  function $e(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;

    if ((c | 0) < 32) {
      C = b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c;
      return a << c;
    }

    C = a << c - 32;
    return 0;
  }

  function af(b, d, e) {
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0;
    if ((e | 0) >= 4096) return Ga(b | 0, d | 0, e | 0) | 0;
    f = b | 0;

    if ((b & 3) == (d & 3)) {
      while (b & 3) {
        if (!e) return f | 0;
        a[b >> 0] = a[d >> 0] | 0;
        b = b + 1 | 0;
        d = d + 1 | 0;
        e = e - 1 | 0;
      }

      while ((e | 0) >= 4) {
        c[b >> 2] = c[d >> 2];
        b = b + 4 | 0;
        d = d + 4 | 0;
        e = e - 4 | 0;
      }
    }

    while ((e | 0) > 0) {
      a[b >> 0] = a[d >> 0] | 0;
      b = b + 1 | 0;
      d = d + 1 | 0;
      e = e - 1 | 0;
    }

    return f | 0;
  }

  function bf(b, c, d) {
    b = b | 0;
    c = c | 0;
    d = d | 0;
    var e = 0;

    if ((c | 0) < (b | 0) & (b | 0) < (c + d | 0)) {
      e = b;
      c = c + d | 0;
      b = b + d | 0;

      while ((d | 0) > 0) {
        b = b - 1 | 0;
        c = c - 1 | 0;
        d = d - 1 | 0;
        a[b >> 0] = a[c >> 0] | 0;
      }

      b = e;
    } else af(b, c, d) | 0;

    return b | 0;
  }

  function cf(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;

    if ((c | 0) < 32) {
      C = b >> c;
      return a >>> c | (b & (1 << c) - 1) << 32 - c;
    }

    C = (b | 0) < 0 ? -1 : 0;
    return b >> c - 32 | 0;
  }

  function df(b) {
    b = b | 0;
    var c = 0;
    c = a[m + (b & 255) >> 0] | 0;
    if ((c | 0) < 8) return c | 0;
    c = a[m + (b >> 8 & 255) >> 0] | 0;
    if ((c | 0) < 8) return c + 8 | 0;
    c = a[m + (b >> 16 & 255) >> 0] | 0;
    if ((c | 0) < 8) return c + 16 | 0;
    return (a[m + (b >>> 24) >> 0] | 0) + 24 | 0;
  }

  function ef(a, b) {
    a = a | 0;
    b = b | 0;
    var c = 0,
        d = 0,
        e = 0,
        f = 0;
    c = a & 65535;
    d = b & 65535;
    e = _(d, c) | 0;
    f = a >>> 16;
    a = (e >>> 16) + (_(d, f) | 0) | 0;
    d = b >>> 16;
    b = _(d, c) | 0;
    return (C = (a >>> 16) + (_(d, f) | 0) + (((a & 65535) + b | 0) >>> 16) | 0, a + b << 16 | e & 65535 | 0) | 0;
  }

  function ff(a, b, c, d) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
    e = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
    f = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
    g = d >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
    h = ((d | 0) < 0 ? -1 : 0) >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
    i = Xe(e ^ a, f ^ b, e, f) | 0;
    b = C;
    a = g ^ e;
    e = h ^ f;
    return Xe((lf(i, b, Xe(g ^ c, h ^ d, g, h) | 0, C, 0) | 0) ^ a, C ^ e, a, e) | 0;
  }

  function gf(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0,
        h = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
    f = i;
    i = i + 16 | 0;
    g = f | 0;
    h = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
    j = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
    k = e >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
    l = ((e | 0) < 0 ? -1 : 0) >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
    m = Xe(h ^ a, j ^ b, h, j) | 0;
    b = C;
    lf(m, b, Xe(k ^ d, l ^ e, k, l) | 0, C, g) | 0;
    l = Xe(c[g >> 2] ^ h, c[g + 4 >> 2] ^ j, h, j) | 0;
    j = C;
    i = f;
    return (C = j, l) | 0;
  }

  function hf(a, b, c, d) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    var e = 0,
        f = 0;
    e = a;
    a = c;
    c = ef(e, a) | 0;
    f = C;
    return (C = (_(b, a) | 0) + (_(d, e) | 0) + f | f & 0, c | 0 | 0) | 0;
  }

  function jf(a, b, c, d) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    return lf(a, b, c, d, 0) | 0;
  }

  function kf(a, b, d, e) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    var f = 0,
        g = 0;
    f = i;
    i = i + 16 | 0;
    g = f | 0;
    lf(a, b, d, e, g) | 0;
    i = f;
    return (C = c[g + 4 >> 2] | 0, c[g >> 2] | 0) | 0;
  }

  function lf(a, b, d, e, f) {
    a = a | 0;
    b = b | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0;
    g = a;
    h = b;
    i = h;
    j = d;
    k = e;
    l = k;

    if (!i) {
      m = (f | 0) != 0;

      if (!l) {
        if (m) {
          c[f >> 2] = (g >>> 0) % (j >>> 0);
          c[f + 4 >> 2] = 0;
        }

        n = 0;
        o = (g >>> 0) / (j >>> 0) >>> 0;
        return (C = n, o) | 0;
      } else {
        if (!m) {
          n = 0;
          o = 0;
          return (C = n, o) | 0;
        }

        c[f >> 2] = a | 0;
        c[f + 4 >> 2] = b & 0;
        n = 0;
        o = 0;
        return (C = n, o) | 0;
      }
    }

    m = (l | 0) == 0;

    do if (j) {
      if (!m) {
        p = (aa(l | 0) | 0) - (aa(i | 0) | 0) | 0;

        if (p >>> 0 <= 31) {
          q = p + 1 | 0;
          r = 31 - p | 0;
          s = p - 31 >> 31;
          t = q;
          u = g >>> (q >>> 0) & s | i << r;
          v = i >>> (q >>> 0) & s;
          w = 0;
          x = g << r;
          break;
        }

        if (!f) {
          n = 0;
          o = 0;
          return (C = n, o) | 0;
        }

        c[f >> 2] = a | 0;
        c[f + 4 >> 2] = h | b & 0;
        n = 0;
        o = 0;
        return (C = n, o) | 0;
      }

      r = j - 1 | 0;

      if (r & j) {
        s = (aa(j | 0) | 0) + 33 - (aa(i | 0) | 0) | 0;
        q = 64 - s | 0;
        p = 32 - s | 0;
        y = p >> 31;
        z = s - 32 | 0;
        A = z >> 31;
        t = s;
        u = p - 1 >> 31 & i >>> (z >>> 0) | (i << p | g >>> (s >>> 0)) & A;
        v = A & i >>> (s >>> 0);
        w = g << q & y;
        x = (i << q | g >>> (z >>> 0)) & y | g << p & s - 33 >> 31;
        break;
      }

      if (f) {
        c[f >> 2] = r & g;
        c[f + 4 >> 2] = 0;
      }

      if ((j | 0) == 1) {
        n = h | b & 0;
        o = a | 0 | 0;
        return (C = n, o) | 0;
      } else {
        r = df(j | 0) | 0;
        n = i >>> (r >>> 0) | 0;
        o = i << 32 - r | g >>> (r >>> 0) | 0;
        return (C = n, o) | 0;
      }
    } else {
      if (m) {
        if (f) {
          c[f >> 2] = (i >>> 0) % (j >>> 0);
          c[f + 4 >> 2] = 0;
        }

        n = 0;
        o = (i >>> 0) / (j >>> 0) >>> 0;
        return (C = n, o) | 0;
      }

      if (!g) {
        if (f) {
          c[f >> 2] = 0;
          c[f + 4 >> 2] = (i >>> 0) % (l >>> 0);
        }

        n = 0;
        o = (i >>> 0) / (l >>> 0) >>> 0;
        return (C = n, o) | 0;
      }

      r = l - 1 | 0;

      if (!(r & l)) {
        if (f) {
          c[f >> 2] = a | 0;
          c[f + 4 >> 2] = r & i | b & 0;
        }

        n = 0;
        o = i >>> ((df(l | 0) | 0) >>> 0);
        return (C = n, o) | 0;
      }

      r = (aa(l | 0) | 0) - (aa(i | 0) | 0) | 0;

      if (r >>> 0 <= 30) {
        s = r + 1 | 0;
        p = 31 - r | 0;
        t = s;
        u = i << p | g >>> (s >>> 0);
        v = i >>> (s >>> 0);
        w = 0;
        x = g << p;
        break;
      }

      if (!f) {
        n = 0;
        o = 0;
        return (C = n, o) | 0;
      }

      c[f >> 2] = a | 0;
      c[f + 4 >> 2] = h | b & 0;
      n = 0;
      o = 0;
      return (C = n, o) | 0;
    } while (0);

    if (!t) {
      B = x;
      D = w;
      E = v;
      F = u;
      G = 0;
      H = 0;
    } else {
      b = d | 0 | 0;
      d = k | e & 0;
      e = Ye(b | 0, d | 0, -1, -1) | 0;
      k = C;
      h = x;
      x = w;
      w = v;
      v = u;
      u = t;
      t = 0;

      do {
        a = h;
        h = x >>> 31 | h << 1;
        x = t | x << 1;
        g = v << 1 | a >>> 31 | 0;
        a = v >>> 31 | w << 1 | 0;
        Xe(e, k, g, a) | 0;
        i = C;
        l = i >> 31 | ((i | 0) < 0 ? -1 : 0) << 1;
        t = l & 1;
        v = Xe(g, a, l & b, (((i | 0) < 0 ? -1 : 0) >> 31 | ((i | 0) < 0 ? -1 : 0) << 1) & d) | 0;
        w = C;
        u = u - 1 | 0;
      } while ((u | 0) != 0);

      B = h;
      D = x;
      E = w;
      F = v;
      G = 0;
      H = t;
    }

    t = D;
    D = 0;

    if (f) {
      c[f >> 2] = F;
      c[f + 4 >> 2] = E;
    }

    n = (t | 0) >>> 31 | (B | D) << 1 | (D << 1 | t >>> 31) & 0 | G;
    o = (t << 1 | 0 >>> 31) & -2 | H;
    return (C = n, o) | 0;
  }

  function mf(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    ba(0);
    return 0;
  }

  function nf(a, b, c, d, e) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    e = e | 0;
    ba(1);
  }

  function of(a) {
    a = a | 0;
    ba(2);
  }

  function pf(a, b) {
    a = a | 0;
    b = b | 0;
    ba(3);
  }

  function qf(a) {
    a = a | 0;
    ba(4);
    return 0;
  }

  function rf(a, b, c) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    ba(5);
  }

  function sf(a, b, c, d, e, f, g, h) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    e = e | 0;
    f = f | 0;
    g = g | 0;
    h = h | 0;
    ba(6);
  }

  function tf(a, b) {
    a = a | 0;
    b = b | 0;
    ba(7);
    return 0;
  }

  function uf(a, b, c, d, e) {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    e = e | 0;
    ba(8);
    return 0;
  } // EMSCRIPTEN_END_FUNCS


  var Qa = [mf, Ne, ie, je, Bb, Db, Fb, Hb, Rb, Tb, bc, dc, fc, hc, ic, kc, Mc, xd, ne, ve, mf, mf, mf, mf, mf, mf, mf, mf, mf, mf, mf, mf];
  var Ra = [nf, vc, rc, lc];
  var Sa = [of, Eb, Gb, Ib, Sb, Ub, cc, ec, gc, jc, Lc, Nc, Ke, Me, of, of];
  var Ta = [pf, Cb, yd, pf];
  var Ua = [qf, me, yc, wc, uc, sc, pc, mc];
  var Va = [rf];
  var Wa = [sf, xc, tc, oc];
  var Xa = [tf, _d, $d, ae, Kc, tf, tf, tf];
  var Ya = [uf];
  return {
    _wxfBaseDecodeProviderRelease: ec,
    _WXFDataGetMutableData: ub,
    _wxfBase16DecodeGetMaxSize: sc,
    _WXFDataRetain: ob,
    _wxfUncompressProviderGetStreamData: Db,
    _WXFDataAppend: wb,
    _WXFDataConsumerPutData: Pb,
    _WXFExprCompress: Zc,
    _bitshift64Lshr: _e,
    _wxfDataDataProviderGetData: Kc,
    _wxfBase16DecodeProviderGetStreamData: hc,
    _wxfBase16Encode: tc,
    _wxfBase64EncodeGetMaxSize: yc,
    _cleanup454: Ke,
    _memset: Ze,
    ___stdio_write: ne,
    _WXFDataProviderCreateStream: zc,
    _WXFDataConsumerRetain: Nb,
    _memcpy: af,
    _wxfDataDataConsumerRelease: Sb,
    _WXFDataProviderCreateWithFilePath: Dc,
    _wxfBase85DecodeProviderGetStreamData: kc,
    _zcfree: yd,
    _wxfUncompressConsumerPutData: Hb,
    _wxfCompressedDataZAlloc: Bb,
    _wxfDataDataConsumerPutData: Rb,
    _i64Subtract: Xe,
    _wxfBase64DecodeProviderGetStreamData: dc,
    setTempRet0: eb,
    ___stdout_write: ie,
    _sn_write: Ne,
    _wxfFileDataConsumerRelease: Ub,
    _WXFDataProviderCreateDirect: Ac,
    _WXFBase16DecodeProviderCreate: Yb,
    _WXFDataGetCapacity: sb,
    _wxfBase64DecodeGetMaxSize: wc,
    _WXFDataCreateWithString: gb,
    _wxfUncompressConsumerRelease: Ib,
    _wxfBase85Encode: oc,
    ___stdio_read: ve,
    _deflate_fast: $d,
    _free: Se,
    ___stdio_seek: je,
    _wxfBase85EncodeConsumerRelease: jc,
    stackSave: _a,
    _WXFExprConsumerCreate: Vc,
    _wxfBase64EncodeConsumerRelease: cc,
    _wxfBase64Encode: xc,
    _WXFDataGetSize: qb,
    runPostSets: We,
    _WXFDataSetSize: rb,
    _WXFDataProviderCreateWithData: Bc,
    _WXFDataProviderGetStreamData: Gc,
    _malloc: Re,
    _wxfBase16EncodeConsumerPutData: fc,
    _wxfDataDataProviderRelease: Lc,
    _WXFDataDelete: xb,
    _WXFDataRelease: pb,
    _wxfFileDataConsumerPutData: Tb,
    _wxfCompressConsumerRelease: Gb,
    _wxfBase64EncodeConsumerPutData: bc,
    _WXFDataGetData: tb,
    _wxfBase85Decode: lc,
    _WXFExprUncompress: _c,
    setThrew: bb,
    _wxfUncompressProviderRelease: Eb,
    _WXFBase85EncodeConsumerCreate: Zb,
    _bitshift64Shl: $e,
    _wxfBase85EncodeConsumerPutData: ic,
    ___stdio_close: me,
    _WXFDataSetData: vb,
    _fflush: ke,
    _deflate_stored: _d,
    _cleanup525: Me,
    _wxfCompressConsumerPutData: Fb,
    _wxfBase16EncodeGetMaxSize: uc,
    _WXFBase64DecodeProviderCreate: Wb,
    _WXFExprConsumerRelease: Wc,
    _WXFExprGetType: Oc,
    stackAlloc: Za,
    _WXFBase16EncodeConsumerCreate: Xb,
    _WXFDataProviderGetStreamCharacters: Hc,
    _wxfBase85DecodeGetMaxSize: mc,
    _wxfBase64Decode: vc,
    getTempRet0: fb,
    _WXFUncompressConsumerCreate: Ab,
    _WXFUncompressProviderCreate: yb,
    _i64Add: Ye,
    _WXFDataConsumerCreateWithFilePath: Mb,
    _WXFDataProviderBuffer: Jc,
    _WXFExprGetCount: Pc,
    _wxfFileDataProviderRelease: Nc,
    _WXFDataConsumerRelease: Ob,
    _WXFDataConsume: Qb,
    stackRestore: $a,
    _wxfBase85EncodeGetMaxSize: pc,
    _wxfBase16EncodeConsumerRelease: gc,
    _WXFExprGetStringValue: Sc,
    _WXFExprGetIntegerValue: Qc,
    _zcalloc: xd,
    ___errno_location: ce,
    _wxfFileDataProviderGetData: Mc,
    _WXFDataProviderRelease: Fc,
    _wxfBase16Decode: rc,
    _WXFBase64EncodeConsumerCreate: Vb,
    establishStackSpace: ab,
    _memmove: bf,
    _WXFDataProviderGetDirectData: Ic,
    _WXFCompressConsumerCreate: zb,
    _WXFDataProviderCreateWithBytes: Cc,
    _WXFBase85DecodeProviderCreate: _b,
    _WXFDataProviderRetain: Ec,
    _WXFExprGetRealValue: Rc,
    _wxfCompressedDataZFree: Cb,
    _WXFDataConsumerCreateWithData: Lb,
    _WXFDataCreateMutable: nb,
    _WXFDataCreate: mb,
    _deflate_slow: ae
  };
}( // EMSCRIPTEN_END_ASM
Module.asmGlobalArg, Module.asmLibraryArg, buffer);

var _WXFDataGetSize = Module["_WXFDataGetSize"] = asm["_WXFDataGetSize"];

var _WXFDataGetData = Module["_WXFDataGetData"] = asm["_WXFDataGetData"];

var _WXFDataGetMutableData = Module["_WXFDataGetMutableData"] = asm["_WXFDataGetMutableData"];

var _WXFDataProviderGetStreamData = Module["_WXFDataProviderGetStreamData"] = asm["_WXFDataProviderGetStreamData"];

var _WXFDataRetain = Module["_WXFDataRetain"] = asm["_WXFDataRetain"];

var _WXFDataAppend = Module["_WXFDataAppend"] = asm["_WXFDataAppend"];

var _WXFDataConsumerPutData = Module["_WXFDataConsumerPutData"] = asm["_WXFDataConsumerPutData"];

var _WXFExprCompress = Module["_WXFExprCompress"] = asm["_WXFExprCompress"];

var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];

var _WXFDataProviderCreateStream = Module["_WXFDataProviderCreateStream"] = asm["_WXFDataProviderCreateStream"];

var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];

var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];

var _WXFDataSetData = Module["_WXFDataSetData"] = asm["_WXFDataSetData"];

var _fflush = Module["_fflush"] = asm["_fflush"];

var _memset = Module["_memset"] = asm["_memset"];

var _WXFBase64DecodeProviderCreate = Module["_WXFBase64DecodeProviderCreate"] = asm["_WXFBase64DecodeProviderCreate"];

var _WXFExprConsumerRelease = Module["_WXFExprConsumerRelease"] = asm["_WXFExprConsumerRelease"];

var _WXFExprGetType = Module["_WXFExprGetType"] = asm["_WXFExprGetType"];

var _WXFDataConsumerRetain = Module["_WXFDataConsumerRetain"] = asm["_WXFDataConsumerRetain"];

var _memcpy = Module["_memcpy"] = asm["_memcpy"];

var _WXFDataProviderCreateWithFilePath = Module["_WXFDataProviderCreateWithFilePath"] = asm["_WXFDataProviderCreateWithFilePath"];

var _WXFBase16EncodeConsumerCreate = Module["_WXFBase16EncodeConsumerCreate"] = asm["_WXFBase16EncodeConsumerCreate"];

var _WXFDataProviderGetStreamCharacters = Module["_WXFDataProviderGetStreamCharacters"] = asm["_WXFDataProviderGetStreamCharacters"];

var _WXFExprUncompress = Module["_WXFExprUncompress"] = asm["_WXFExprUncompress"];

var _WXFUncompressConsumerCreate = Module["_WXFUncompressConsumerCreate"] = asm["_WXFUncompressConsumerCreate"];

var _WXFUncompressProviderCreate = Module["_WXFUncompressProviderCreate"] = asm["_WXFUncompressProviderCreate"];

var _WXFDataProviderRelease = Module["_WXFDataProviderRelease"] = asm["_WXFDataProviderRelease"];

var _i64Add = Module["_i64Add"] = asm["_i64Add"];

var _WXFDataConsumerCreateWithFilePath = Module["_WXFDataConsumerCreateWithFilePath"] = asm["_WXFDataConsumerCreateWithFilePath"];

var _WXFDataProviderBuffer = Module["_WXFDataProviderBuffer"] = asm["_WXFDataProviderBuffer"];

var _WXFExprGetCount = Module["_WXFExprGetCount"] = asm["_WXFExprGetCount"];

var _WXFBase16DecodeProviderCreate = Module["_WXFBase16DecodeProviderCreate"] = asm["_WXFBase16DecodeProviderCreate"];

var _WXFDataGetCapacity = Module["_WXFDataGetCapacity"] = asm["_WXFDataGetCapacity"];

var _WXFDataConsumerRelease = Module["_WXFDataConsumerRelease"] = asm["_WXFDataConsumerRelease"];

var _WXFDataConsume = Module["_WXFDataConsume"] = asm["_WXFDataConsume"];

var _WXFDataCreateWithString = Module["_WXFDataCreateWithString"] = asm["_WXFDataCreateWithString"];

var _WXFExprGetStringValue = Module["_WXFExprGetStringValue"] = asm["_WXFExprGetStringValue"];

var _WXFDataProviderCreateDirect = Module["_WXFDataProviderCreateDirect"] = asm["_WXFDataProviderCreateDirect"];

var _WXFExprGetIntegerValue = Module["_WXFExprGetIntegerValue"] = asm["_WXFExprGetIntegerValue"];

var ___errno_location = Module["___errno_location"] = asm["___errno_location"];

var _WXFExprConsumerCreate = Module["_WXFExprConsumerCreate"] = asm["_WXFExprConsumerCreate"];

var _WXFBase85EncodeConsumerCreate = Module["_WXFBase85EncodeConsumerCreate"] = asm["_WXFBase85EncodeConsumerCreate"];

var _WXFDataDelete = Module["_WXFDataDelete"] = asm["_WXFDataDelete"];

var _free = Module["_free"] = asm["_free"];

var runPostSets = Module["runPostSets"] = asm["runPostSets"];

var _WXFBase64EncodeConsumerCreate = Module["_WXFBase64EncodeConsumerCreate"] = asm["_WXFBase64EncodeConsumerCreate"];

var _WXFDataSetSize = Module["_WXFDataSetSize"] = asm["_WXFDataSetSize"];

var _WXFDataProviderCreateWithData = Module["_WXFDataProviderCreateWithData"] = asm["_WXFDataProviderCreateWithData"];

var _WXFDataProviderGetDirectData = Module["_WXFDataProviderGetDirectData"] = asm["_WXFDataProviderGetDirectData"];

var _WXFCompressConsumerCreate = Module["_WXFCompressConsumerCreate"] = asm["_WXFCompressConsumerCreate"];

var _malloc = Module["_malloc"] = asm["_malloc"];

var _WXFDataProviderCreateWithBytes = Module["_WXFDataProviderCreateWithBytes"] = asm["_WXFDataProviderCreateWithBytes"];

var _WXFBase85DecodeProviderCreate = Module["_WXFBase85DecodeProviderCreate"] = asm["_WXFBase85DecodeProviderCreate"];

var _WXFDataProviderRetain = Module["_WXFDataProviderRetain"] = asm["_WXFDataProviderRetain"];

var _memmove = Module["_memmove"] = asm["_memmove"];

var _WXFExprGetRealValue = Module["_WXFExprGetRealValue"] = asm["_WXFExprGetRealValue"];

var _WXFDataConsumerCreateWithData = Module["_WXFDataConsumerCreateWithData"] = asm["_WXFDataConsumerCreateWithData"];

var _WXFDataCreateMutable = Module["_WXFDataCreateMutable"] = asm["_WXFDataCreateMutable"];

var _WXFDataRelease = Module["_WXFDataRelease"] = asm["_WXFDataRelease"];

var _WXFDataCreate = Module["_WXFDataCreate"] = asm["_WXFDataCreate"];

function b0(p0, p1, p2) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  p2 = p2 | 0;
  abort(0);
  return 0;
}

function b1(p0, p1, p2, p3, p4) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  p2 = p2 | 0;
  p3 = p3 | 0;
  p4 = p4 | 0;
  abort(1);
}

function b2(p0) {
  p0 = p0 | 0;
  abort(2);
}

function b3(p0, p1) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  abort(3);
}

function b4(p0) {
  p0 = p0 | 0;
  abort(4);
  return 0;
}

function b5(p0, p1, p2) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  p2 = p2 | 0;
  abort(5);
}

function b6(p0, p1, p2, p3, p4, p5, p6, p7) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  p2 = p2 | 0;
  p3 = p3 | 0;
  p4 = p4 | 0;
  p5 = p5 | 0;
  p6 = p6 | 0;
  p7 = p7 | 0;
  abort(6);
}

function b7(p0, p1) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  abort(7);
  return 0;
}

function b8(p0, p1, p2, p3, p4) {
  p0 = p0 | 0;
  p1 = p1 | 0;
  p2 = p2 | 0;
  p3 = p3 | 0;
  p4 = p4 | 0;
  abort(8);
  return 0;
}

var FUNCTION_TABLE_iiii = [b0, asm["_sn_write"], asm["___stdout_write"], asm["___stdio_seek"], asm["_wxfCompressedDataZAlloc"], asm["_wxfUncompressProviderGetStreamData"], asm["_wxfCompressConsumerPutData"], asm["_wxfUncompressConsumerPutData"], asm["_wxfDataDataConsumerPutData"], asm["_wxfFileDataConsumerPutData"], asm["_wxfBase64EncodeConsumerPutData"], asm["_wxfBase64DecodeProviderGetStreamData"], asm["_wxfBase16EncodeConsumerPutData"], asm["_wxfBase16DecodeProviderGetStreamData"], asm["_wxfBase85EncodeConsumerPutData"], asm["_wxfBase85DecodeProviderGetStreamData"], asm["_wxfFileDataProviderGetData"], asm["_zcalloc"], asm["___stdio_write"], asm["___stdio_read"], b0, b0, b0, b0, b0, b0, b0, b0, b0, b0, b0, b0];
var FUNCTION_TABLE_viiiii = [b1, asm["_wxfBase64Decode"], asm["_wxfBase16Decode"], asm["_wxfBase85Decode"]];
var FUNCTION_TABLE_vi = [b2, asm["_wxfUncompressProviderRelease"], asm["_wxfCompressConsumerRelease"], asm["_wxfUncompressConsumerRelease"], asm["_wxfDataDataConsumerRelease"], asm["_wxfFileDataConsumerRelease"], asm["_wxfBase64EncodeConsumerRelease"], asm["_wxfBaseDecodeProviderRelease"], asm["_wxfBase16EncodeConsumerRelease"], asm["_wxfBase85EncodeConsumerRelease"], asm["_wxfDataDataProviderRelease"], asm["_wxfFileDataProviderRelease"], asm["_cleanup454"], asm["_cleanup525"], b2, b2];
var FUNCTION_TABLE_vii = [b3, asm["_wxfCompressedDataZFree"], asm["_zcfree"], b3];
var FUNCTION_TABLE_ii = [b4, asm["___stdio_close"], asm["_wxfBase64EncodeGetMaxSize"], asm["_wxfBase64DecodeGetMaxSize"], asm["_wxfBase16EncodeGetMaxSize"], asm["_wxfBase16DecodeGetMaxSize"], asm["_wxfBase85EncodeGetMaxSize"], asm["_wxfBase85DecodeGetMaxSize"]];
var FUNCTION_TABLE_viii = [b5];
var FUNCTION_TABLE_viiiiiiii = [b6, asm["_wxfBase64Encode"], asm["_wxfBase16Encode"], asm["_wxfBase85Encode"]];
var FUNCTION_TABLE_iii = [b7, asm["_deflate_stored"], asm["_deflate_fast"], asm["_deflate_slow"], asm["_wxfDataDataProviderGetData"], b7, b7, b7];
var FUNCTION_TABLE_iiiiii = [b8];
Module["dynCall_iiii"] = dynCall_iiii;
Module["dynCall_viiiii"] = dynCall_viiiii;
Module["dynCall_vi"] = dynCall_vi;
Module["dynCall_vii"] = dynCall_vii;
Module["dynCall_ii"] = dynCall_ii;
Module["dynCall_viii"] = dynCall_viii;
Module["dynCall_viiiiiiii"] = dynCall_viiiiiiii;
Module["dynCall_iii"] = dynCall_iii;
Module["dynCall_iiiiii"] = dynCall_iiiiii;
Module["FUNCTION_TABLE_iiii"] = FUNCTION_TABLE_iiii;
Module["FUNCTION_TABLE_viiiii"] = FUNCTION_TABLE_viiiii;
Module["FUNCTION_TABLE_vi"] = FUNCTION_TABLE_vi;
Module["FUNCTION_TABLE_vii"] = FUNCTION_TABLE_vii;
Module["FUNCTION_TABLE_ii"] = FUNCTION_TABLE_ii;
Module["FUNCTION_TABLE_viii"] = FUNCTION_TABLE_viii;
Module["FUNCTION_TABLE_viiiiiiii"] = FUNCTION_TABLE_viiiiiiii;
Module["FUNCTION_TABLE_iii"] = FUNCTION_TABLE_iii;
Module["FUNCTION_TABLE_iiiiii"] = FUNCTION_TABLE_iiiiii;
Runtime.stackAlloc = asm["stackAlloc"];
Runtime.stackSave = asm["stackSave"];
Runtime.stackRestore = asm["stackRestore"];
Runtime.establishStackSpace = asm["establishStackSpace"];
Runtime.setTempRet0 = asm["setTempRet0"];
Runtime.getTempRet0 = asm["getTempRet0"];

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;
var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  if (!Module["calledRun"]) run();
  if (!Module["calledRun"]) dependenciesFulfilled = runCaller;
};

Module["callMain"] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, "cannot call main when async dependencies remain! (listen on __ATMAIN__)");
  assert(__ATPRERUN__.length == 0, "cannot call main when preRun functions remain to be called");
  args = args || [];
  ensureInitRuntime();
  var argc = args.length + 1;

  function pad() {
    for (var i = 0; i < 4 - 1; i++) {
      argv.push(0);
    }
  }

  var argv = [allocate(intArrayFromString(Module["thisProgram"]), "i8", ALLOC_NORMAL)];
  pad();

  for (var i = 0; i < argc - 1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), "i8", ALLOC_NORMAL));
    pad();
  }

  argv.push(0);
  argv = allocate(argv, "i32", ALLOC_NORMAL);

  try {
    var ret = Module["_main"](argc, argv, 0);
    exit(ret, true);
  } catch (e) {
    if (e instanceof ExitStatus) {
      return;
    } else if (e == "SimulateInfiniteLoop") {
      Module["noExitRuntime"] = true;
      return;
    } else {
      if (e && typeof e === "object" && e.stack) Module.printErr("exception thrown: " + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
};

function run(args) {
  args = args || Module["arguments"];
  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    return;
  }

  preRun();
  if (runDependencies > 0) return;
  if (Module["calledRun"]) return;

  function doRun() {
    if (Module["calledRun"]) return;
    Module["calledRun"] = true;
    if (ABORT) return;
    ensureInitRuntime();
    preMain();
    if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
    if (Module["_main"] && shouldRunNow) Module["callMain"](args);
    postRun();
  }

  if (Module["setStatus"]) {
    Module["setStatus"]("Running...");
    setTimeout(function () {
      setTimeout(function () {
        Module["setStatus"]("");
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}

Module["run"] = Module.run = run;

function exit(status, implicit) {
  if (implicit && Module["noExitRuntime"]) {
    return;
  }

  if (Module["noExitRuntime"]) {} else {
    ABORT = true;
    EXITSTATUS = status;
    STACKTOP = initialStackTop;
    exitRuntime();
    if (Module["onExit"]) Module["onExit"](status);
  }

  if (ENVIRONMENT_IS_NODE) {
    process["stdout"]["once"]("drain", function () {
      process["exit"](status);
    });
    console.log(" ");
    setTimeout(function () {
      process["exit"](status);
    }, 500);
  } else if (ENVIRONMENT_IS_SHELL && typeof quit === "function") {
    quit(status);
  }

  throw new ExitStatus(status);
}

Module["exit"] = Module.exit = exit;
var abortDecorators = [];

function abort(what) {
  if (what !== undefined) {
    Module.print(what);
    Module.printErr(what);
    what = JSON.stringify(what);
  } else {
    what = "";
  }

  ABORT = true;
  EXITSTATUS = 1;
  var extra = "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
  var output = "abort(" + what + ") at " + stackTrace() + extra;

  if (abortDecorators) {
    abortDecorators.forEach(function (decorator) {
      output = decorator(output, what);
    });
  }

  throw output;
}

Module["abort"] = Module.abort = abort;

if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];

  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()();
  }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) {
  shouldRunNow = false;
}

run();

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

function memoryToByteArray(ptr, size) {
  var array = new Uint8Array(size);

  for (var i = 0; i < size; i++) {
    array[i] = getValue(ptr + i, "i8");
  }

  return array;
}

WXFDataCreate = Module.cwrap("WXFDataCreate", "number", ["number", "number", "number"]);
WXFDataCreateWithString = Module.cwrap("WXFDataCreateWithString", "number", ["number", "string"]);
WXFDataCreateMutable = Module.cwrap("WXFDataCreateMutable", "number", ["number", "number"]);
WXFDataRelease = Module.cwrap("WXFDataRelease", "number", ["number"]);
WXFDataGetSize = Module.cwrap("WXFDataGetSize", "number", ["number"]);
WXFDataGetData = Module.cwrap("WXFDataGetData", "number", ["number"]);

function WXFData(data) {
  if (typeof data === "undefined") {
    this.dataRef = WXFDataCreate(0, 0, 0);
  } else if (data instanceof Uint8Array) {
    var buffer = Module._malloc(data.length);

    Module.writeArrayToMemory(data, buffer);
    this.dataRef = WXFDataCreate(0, buffer, data.length);

    Module._free(buffer);
  } else if (data.constructor === String) {
    this.dataRef = WXFDataCreateWithString(0, data);
  } else if (data instanceof WXFData) {
    this.dataRef = WXFDataCreate(0, data.getDataPtr(), data.getSize());
  } else {
    this.dataRef = WXFDataCreate(0, 0, 0);
  }
}

WXFData.prototype.toString = function () {
  var size = this.getSize();
  var string = "";

  for (var i = 0; i < size; i++) {
    string += String.fromCharCode(this.getByte(i));
  }

  return decode_utf8(string);
};

WXFData.prototype.toByteArray = function () {
  return memoryToByteArray(this.getDataPtr(), this.getSize());
};

WXFData.prototype.release = function () {
  WXFDataRelease(this.dataRef);
};

WXFData.prototype.getSize = function () {
  return WXFDataGetSize(this.dataRef);
};

WXFData.prototype.getDataPtr = function () {
  return WXFDataGetData(this.dataRef);
};

WXFData.prototype.getByte = function (idx) {
  var b = Module.getValue(this.getDataPtr() + idx, "i8");
  if (b < 0) b = b + 256;
  return b;
};

WXFDataGetCapacity = Module.cwrap("WXFDataGetCapacity", "number", ["number"]);
WXFDataSetSize = Module.cwrap("WXFDataSetSize", null, ["number", "number"]);
WXFDataAppend = Module.cwrap("WXFDataAppend", null, ["number", "number", "number"]);
WXFDataSetData = Module.cwrap("WXFDataSetData", null, ["number", "number", "number"]);
WXFDataDelete = Module.cwrap("WXFDataDelete", null, ["number", "number", "number"]);

function WXFMutableData(data) {
  this.dataRef = WXFDataCreateMutable(0, 0);
  this.appendData(data);
}

WXFMutableData.prototype = Object.create(WXFData.prototype);

WXFMutableData.prototype.getCapacity = function () {
  return WXFDataGetCapacity(this.dataRef);
};

WXFMutableData.prototype.setSize = function (size) {
  WXFDataSetSize(this.dataRef, size);
};

WXFMutableData.prototype.appendData = function (data) {
  if (data instanceof WXFData) {
    WXFDataAppend(this.dataRef, data.getDataPtr(), data.getSize());
  } else {
    var tempData = new WXFData(data);
    this.appendData(tempData);
    tempData.release();
  }
};

WXFMutableData.prototype.setData = function (data) {
  if (data instanceof WXFData) {
    WXFDataSetData(this.dataRef, data.getDataPtr(), data.getSize());
  } else {
    var tempData = new WXFData(data);
    this.setData(tempData);
    tempData.release();
  }
};

WXFMutableData.prototype.deleteData = function (start, length) {
  WXFDataDelete(this.dataRef, start, length);
};

WXFDataProviderCreateWithBytes = Module.cwrap("WXFDataProviderCreateWithBytes", "number", ["number", "number", "number"]);
WXFDataProviderCreateWithData = Module.cwrap("WXFDataProviderCreateWithData", "number", ["number", "number"]);
WXFDataProviderRelease = Module.cwrap("WXFDataProviderRelease", null, ["number"]);
WXFDataProviderGetStreamData = Module.cwrap("WXFDataProviderGetStreamData", "number", ["number", "number", "number"]);
WXFDataConsume = Module.cwrap("WXFDataConsume", "number", ["number", "number"]);

function WXFDataProvider(data) {
  if (data instanceof WXFData) {
    this.providerRef = WXFDataProviderCreateWithData(0, data.dataRef);
  } else {
    var tempData = new WXFData(data);
    this.providerRef = WXFDataProviderCreateWithData(0, tempData.dataRef);
    tempData.release();
  }
}

WXFDataProvider.prototype.release = function () {
  WXFDataProviderRelease(this.providerRef);
};

WXFDataProvider.prototype.getStreamData = function () {
  var capacity = 4096;

  var buffer = Module._malloc(capacity);

  var size = WXFDataProviderGetStreamData(this.providerRef, buffer, capacity);
  var array = memoryToByteArray(buffer, size);

  Module._free(buffer);

  return array;
};

WXFDataProvider.prototype.getAllData = function () {
  var tempMutable = new WXFMutableData();
  var tempConsumer = new WXFDataConsumer(tempMutable);
  WXFDataConsume(this.providerRef, tempConsumer.consumerRef);
  tempConsumer.release();
  return tempMutable;
};

WXFDataProvider.prototype._createSubProvider = function (provider, func) {
  if (provider instanceof WXFDataProvider) {
    this.providerRef = func(provider.providerRef);
  } else if (provider instanceof WXFData) {
    var tempProviderRef = WXFDataProviderCreateWithData(0, provider.dataRef);
    this.providerRef = func(tempProviderRef);
    WXFDataProviderRelease(tempProviderRef);
  } else {
    var tempData = WXFData(provider);
    var tempProviderRef = WXFDataProviderCreateWithData(0, tempData.dataRef);
    this.providerRef = func(tempProviderRef);
    WXFDataProviderRelease(tempProviderRef);
    tempData.release();
  }
};

WXFDataConsumerCreateWithData = Module.cwrap("WXFDataConsumerCreateWithData", "number", ["number", "number"]);
WXFDataConsumerRelease = Module.cwrap("WXFDataConsumerRelease", null, ["number"]);
WXFDataConsumerPutData = Module.cwrap("WXFDataConsumerPutData", "number", ["number", "number", "number"]);

function WXFDataConsumer(data) {
  if (data instanceof WXFMutableData) {
    this.consumerRef = WXFDataConsumerCreateWithData(0, data.dataRef);
  } else {
    throw new TypeError("data must be instance of WXFMutableData");
  }
}

WXFDataConsumer.prototype.release = function () {
  WXFDataConsumerRelease(this.consumerRef);
};

WXFDataConsumer.prototype.putData = function (data) {
  if (data instanceof WXFData) {
    return WXFDataConsumerPutData(this.consumerRef, data.getDataPtr(), data.getSize());
  } else {
    var tempData = new WXFData(data);
    var count = WXFDataConsumerPutData(this.consumerRef, tempData.getDataPtr(), tempData.getSize());
    tempData.release();
    return count;
  }
};

WXFDataConsumer.prototype._createSubConsumer = function (consumer, func) {
  if (consumer instanceof WXFDataConsumer) {
    this.consumerRef = func(consumer.consumerRef);
  } else if (consumer instanceof WXFMutableData) {
    var tempConsumer = WXFDataConsumerCreateWithData(0, consumer.dataRef, 0);
    this.consumerRef = func(tempConsumer);
    WXFDataConsumerRelease(tempConsumer);
  } else {
    throw new TypeError("consumer must be instance of WXFDataConsumer or WXFMutableData");
  }
};

WXFBase64EncodeConsumerCreate = Module.cwrap("WXFBase64EncodeConsumerCreate", "number", ["number", "number", "number"]);

function WXFBase64Encoder(consumer) {
  this._createSubConsumer(consumer, function (consumerRef) {
    return WXFBase64EncodeConsumerCreate(0, consumerRef, 0);
  });
}

WXFBase64Encoder.prototype = Object.create(WXFDataConsumer.prototype);
WXFBase64DecodeProviderCreate = Module.cwrap("WXFBase64DecodeProviderCreate", "number", ["number", "number"]);

function WXFBase64Decoder(provider) {
  this._createSubProvider(provider, function (providerRef) {
    return WXFBase64DecodeProviderCreate(0, providerRef);
  });
}

WXFBase64Decoder.prototype = Object.create(WXFDataProvider.prototype);
WXFBase16EncodeConsumerCreate = Module.cwrap("WXFBase16EncodeConsumerCreate", "number", ["number", "number", "number"]);

function WXFBase16Encoder(consumer) {
  this._createSubConsumer(consumer, function (consumerRef) {
    return WXFBase16EncodeConsumerCreate(0, consumerRef, 0);
  });
}

WXFBase16Encoder.prototype = Object.create(WXFDataConsumer.prototype);
WXFBase16DecodeProviderCreate = Module.cwrap("WXFBase16DecodeProviderCreate", "number", ["number", "number"]);

function WXFBase16Decoder(provider) {
  this._createSubProvider(provider, function (providerRef) {
    return WXFBase16DecodeProviderCreate(0, providerRef);
  });
}

WXFBase16Decoder.prototype = Object.create(WXFDataProvider.prototype);
WXFBase85EncodeConsumerCreate = Module.cwrap("WXFBase85EncodeConsumerCreate", "number", ["number", "number", "number", "number"]);

function WXFBase85Encoder(consumer) {
  this._createSubConsumer(consumer, function (consumerRef) {
    return WXFBase85EncodeConsumerCreate(0, consumerRef, 0, 0);
  });
}

WXFBase85Encoder.prototype = Object.create(WXFDataConsumer.prototype);
WXFBase85DecodeProviderCreate = Module.cwrap("WXFBase85DecodeProviderCreate", "number", ["number", "number"]);

function WXFBase85Decoder(provider) {
  this._createSubProvider(provider, function (providerRef) {
    return WXFBase85DecodeProviderCreate(0, providerRef);
  });
}

WXFBase85Decoder.prototype = Object.create(WXFDataProvider.prototype);
WXFCompressConsumerCreate = Module.cwrap("WXFCompressConsumerCreate", "number", ["number", "number"]);

function WXFCompressor(consumer) {
  this._createSubConsumer(consumer, function (consumerRef) {
    return WXFCompressConsumerCreate(0, consumerRef);
  });
}

WXFCompressor.prototype = Object.create(WXFDataConsumer.prototype);
WXFUncompressProviderCreate = Module.cwrap("WXFUncompressProviderCreate", "number", ["number", "number"]);

function WXFUncompressor(provider) {
  this._createSubProvider(provider, function (providerRef) {
    return WXFUncompressProviderCreate(0, providerRef);
  });
}

WXFUncompressor.prototype = Object.create(WXFDataProvider.prototype);
WXFExprGetType = Module.cwrap("WXFExprGetType", "number", ["number"]);
WXFExprGetCount = Module.cwrap("WXFExprGetCount", "number", ["number"]);
WXFExprGetIntegerValue = Module.cwrap("WXFExprGetIntegerValue", "number", ["number"]);
WXFExprGetRealValue = Module.cwrap("WXFExprGetRealValue", "number", ["number"]);
WXFExprGetStringValue = Module.cwrap("WXFExprGetStringValue", "number", ["number"]);

function WXFExpr(expr) {
  this.exprPtr = expr;
}

WXFExpr.prototype.getType = function () {
  return WXFExprGetType(this.exprPtr);
};

WXFExpr.prototype.getCount = function () {
  return WXFExprGetCount(this.exprPtr);
};

WXFExpr.prototype.getIntegerValue = function () {
  return WXFExprGetIntegerValue(this.exprPtr);
};

WXFExpr.prototype.getRealValue = function () {
  return WXFExprGetRealValue(this.exprPtr);
};

WXFExpr.prototype.getStringValue = function () {
  var ptr = WXFExprGetStringValue(this.exprPtr);
  return UTF8ToString(ptr);
};

WXFExprConsumerCreate = Module.cwrap("WXFExprConsumerCreate", "number", ["number", "number", "number", "number"]);
WXFExprConsumerRelease = Module.cwrap("WXFExprConsumerRelease", null, []);
WXFExprUncompress = Module.cwrap("WXFExprUncompress", "number", ["number", "number", "number"]);
var wxfExprConsumerID = 0;
var wxfExprConsumerMap = {};
jsExprPutFuncPtr = Runtime.addFunction(function (allocator, context, expr, copyData, version) {
  var e = new WXFExpr(expr);
  var exprConsumer = wxfExprConsumerMap[context];

  if (exprConsumer.putExpr(e)) {
    return 1;
  }

  return 0;
});
function WXFExprConsumer() {
  this.id = ++wxfExprConsumerID;
  this.exprConsumerRef = WXFExprConsumerCreate(0, this.id, jsExprPutFuncPtr, 0);
  wxfExprConsumerMap[this.id] = this;
  this.stack = [];
  this.object = null;
  this.lastObject = null;
}

WXFExprConsumer.prototype.release = function () {
  WXFExprConsumerRelease(this.exprConsumerRef);
};

WXFExprConsumer.prototype.uncompress = function (provider) {
  if (provider instanceof WXFDataProvider) {
    return WXFExprUncompress(0, provider.providerRef, this.exprConsumerRef);
  } else {
    var tempProvider = new WXFDataProvider(provider);
    var result = this.uncompress(tempProvider);
    tempProvider.release();
    return result;
  }
};

var EXPR_TYPE_NONE = 0;
var EXPR_TYPE_FUNCTION = 102;
var EXPR_TYPE_SYMBOL = 115;
var EXPR_TYPE_STRING = 83;
var EXPR_TYPE_UINT8 = 99;
var EXPR_TYPE_SINT8 = 67;
var EXPR_TYPE_SINT16 = 106;
var EXPR_TYPE_SINT32 = 105;
var EXPR_TYPE_SINT64 = 76;
var EXPR_TYPE_BIGINT = 73;
var EXPR_TYPE_REAL64 = 114;
var EXPR_TYPE_BIGREAL = 82;

WXFExprConsumer.prototype.putExpr = function (expr) {
  var oldDepth = this.stack.length;
  var type = expr.getType();

  if (type == EXPR_TYPE_FUNCTION) {
    var length = expr.getCount();
    this.lastObject = [length + 2];
    this.stack.push(this.lastObject);
  } else if (type == EXPR_TYPE_SYMBOL) {
    this.lastObject = expr.getStringValue();
  } else if (type == EXPR_TYPE_STRING) {
    this.lastObject = '"' + expr.getStringValue() + '"';
  } else if (type == EXPR_TYPE_UINT8 || type == EXPR_TYPE_SINT8 || type == EXPR_TYPE_SINT16 || type == EXPR_TYPE_SINT32 || type == EXPR_TYPE_SINT64) {
    this.lastObject = expr.getIntegerValue().toString();
  } else if (type == EXPR_TYPE_BIGINT) {
    this.lastObject = expr.getStringValue();
  } else if (type == EXPR_TYPE_REAL64) {
    var str = expr.getRealValue().toString();
    var parts = str.split("e");

    if (parts.length != 0) {
      if (parts[0].indexOf(".") === -1) {
        parts[0] = parts[0] + ".";
      }
    }

    this.lastObject = parts.join("*^");
  } else if (type == EXPR_TYPE_BIGREAL) {
    this.lastObject = expr.getStringValue();
  } else {
    console.log("unhandled type: " + type);
    return false;
  }

  if (oldDepth != 0) {
    var parent = this.stack[oldDepth - 1];
    parent[parent.length] = this.lastObject;

    while (this.stack.length != 0) {
      var lastFunc = this.stack[this.stack.length - 1];

      if (lastFunc.length === lastFunc[0]) {
        lastFunc.shift();
        this.stack.pop();
      } else {
        break;
      }
    }
  } else {
    this.object = this.lastObject;
  }

  return true;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxByP"), "/", __webpack_require__("3UD+zm")(module), __webpack_require__("tjlAD9").Buffer))

/***/ })

}]);