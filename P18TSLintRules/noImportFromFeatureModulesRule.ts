import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: Lint.IRuleMetadata = {
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
    public static FAILURE_STRING = 'You can\'t import from a feature module unless you are inside the same feauture module';

    // we will exercise all the files against our rule
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoImportFromFeatureModulesWalker(sourceFile, this.getOptions()));
    }
}

class NoImportFromFeatureModulesWalker extends Lint.RuleWalker {
    private forbidenImportPaths: Array<string>;
    private sourceFilePath: string;
    private importVector: Array<string>;
    private pathVector: Array<string>;

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);
        this.forbidenImportPaths = options.ruleArguments.map(x => x.toLowerCase());
        this.sourceFilePath = sourceFile.fileName;
    }

    // This method will be automagically invoked by tslint infrastructure for each import in the file.
    public visitImportDeclaration(node: ts.ImportDeclaration) {

        // If the import is not in the collection of forbiden import paths then we do nothing.
        const nodeText = node.getText().toLowerCase();
        if (!this.forbidenImportPaths.some(x => nodeText.indexOf(x) >= 0)) {
            super.visitImportDeclaration(node);
            return;
        }

        this.importVector = this.splitPath(this.sanitizeImportPath(nodeText));
        this.pathVector = this.splitPath(this.sanitizeFilePath(this.sourceFilePath));

        if (this.isAnImportToValidate(this.importVector)) {
            if (
                (this.importVector[0] !== this.pathVector[0] || this.importVector[1] !== this.pathVector[1]) &&
                this.pathVector[this.pathVector.length - 1].indexOf('.module') < 0
            ) {
                // this.addFailureAtNode(node, Rule.FAILURE_STRING);
                this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
            }
        }
        super.visitImportDeclaration(node);
    }

    private isAnImportToValidate(importArray: Array<string>): boolean {
        const ret = this.forbidenImportPaths.some(r => importArray.indexOf(r) >= 0);
        return ret;
    }

    private splitPath(sanitizedPath: string): string[] {
        const ret = sanitizedPath.split('/');
        return ret.map(value => value.toLowerCase());
    }

    private sanitizeImportPath(importPath: string): string {
        const atIndex = importPath.indexOf('@');
        let ret: string;
        if (atIndex < 0) {
            console.log(`Oooops! This import path does not have @. ${importPath}`);
            ret = importPath.substr(1, importPath.length);
        } else {
            if (atIndex > importPath.length - 2) {
                console.log('@ simbol is not in the correct position');
                throw new Error('@ simbol is not in the correct position');
            }
            ret = importPath.substring(atIndex + 1, importPath.length - 2);
        }
        ret = ret.toLowerCase();
        return ret;
    }

    private sanitizeFilePath(filePath: string): string {
        const appIndex = filePath.indexOf('/app/') + '/app/'.length;
        return filePath.substring(appIndex, filePath.length - 3);
    }

}

