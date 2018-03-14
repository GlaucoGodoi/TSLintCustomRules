"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // we will exercise all the files against our rule
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportFromFeatureModulesWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-import-from-feature-modules',
        description: 'Prevent feature module artifacts from being imported in a different part of the application.',
        rationale: 'The artifacts inside a feature module should be used only by the feature module itself. ' +
            'If something needs to be used elsewhere it should be transfered to Shared or Core modules',
        optionsDescription: 'List of the folder from wher the import is forbiden.',
        options: null,
        optionExamples: ['true', 'featureModules'],
        type: 'functionality',
        hasFix: false,
        requiresTypeInfo: false,
        typescriptOnly: true
    };
    // The error message that will be displayed if an issue is found
    Rule.FAILURE_STRING = 'You can\'t import from a feature module unless you are inside the same feauture module';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoImportFromFeatureModulesWalker = /** @class */ (function (_super) {
    __extends(NoImportFromFeatureModulesWalker, _super);
    function NoImportFromFeatureModulesWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.forbidenImportPaths = options.ruleArguments.map(function (x) { return x.toLowerCase(); });
        _this.sourceFilePath = sourceFile.fileName;
        return _this;
    }
    // This method will be automagically invoked by tslint infrastructure for each import in the file.
    NoImportFromFeatureModulesWalker.prototype.visitImportDeclaration = function (node) {
        // If the import is not in the collection of forbiden import paths then we do nothing.
        var nodeText = node.getText().toLowerCase();
        if (!this.forbidenImportPaths.some(function (x) { return nodeText.indexOf(x) >= 0; })) {
            _super.prototype.visitImportDeclaration.call(this, node);
            return;
        }
        this.importVector = this.splitPath(this.sanitizeImportPath(nodeText));
        this.pathVector = this.splitPath(this.sanitizeFilePath(this.sourceFilePath));
        if (this.isAnImportToValidate(this.importVector)) {
            if ((this.importVector[0] !== this.pathVector[0] || this.importVector[1] !== this.pathVector[1]) &&
                this.pathVector[this.pathVector.length - 1].indexOf('.module') < 0) {
                // this.addFailureAtNode(node, Rule.FAILURE_STRING);
                this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
            }
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    NoImportFromFeatureModulesWalker.prototype.isAnImportToValidate = function (importArray) {
        var ret = this.forbidenImportPaths.some(function (r) { return importArray.indexOf(r) >= 0; });
        return ret;
    };
    NoImportFromFeatureModulesWalker.prototype.splitPath = function (sanitizedPath) {
        var ret = sanitizedPath.split('/');
        return ret.map(function (value) { return value.toLowerCase(); });
    };
    NoImportFromFeatureModulesWalker.prototype.sanitizeImportPath = function (importPath) {
        var atIndex = importPath.indexOf('@');
        var ret;
        if (atIndex < 0) {
            console.log("Oooops! This import path does not have @. " + importPath);
            ret = importPath.substr(1, importPath.length);
        }
        else {
            if (atIndex > importPath.length - 2) {
                console.log('@ simbol is not in the correct position');
                throw new Error('@ simbol is not in the correct position');
            }
            ret = importPath.substring(atIndex + 1, importPath.length - 2);
        }
        ret = ret.toLowerCase();
        return ret;
    };
    NoImportFromFeatureModulesWalker.prototype.sanitizeFilePath = function (filePath) {
        var appIndex = filePath.indexOf('/app/') + '/app/'.length;
        return filePath.substring(appIndex, filePath.length - 3);
    };
    return NoImportFromFeatureModulesWalker;
}(Lint.RuleWalker));
