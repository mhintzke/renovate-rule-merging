# 36765

[Reproduction of discussion 36765](https://github.com/renovatebot/renovate/discussions/36765).

## Current behavior

When trying to create a PR for the `major-angular-monorepo` group slug, npm runs into an error due to the package `@angular-devkit/build-angular` not being included in the update. In my example, we are on Angular v18 and renovate bot is trying to move to v20. However, it spits out the following error since the package `@angular-devkit/build-angular` is still on v18, and yet the v20 packages that were updated are trying to reference a newer version resulting in a "Conflicting peer dependency" error.



```
npm warn Unknown env config \"store\". This will stop working in the next major version of npm.\nnpm error code ERESOLVE\nnpm error ERESOLVE could not resolve\nnpm error\nnpm error While resolving: @angular-devkit/build-angular@18.2.20\nnpm error Found: @angular/compiler-cli@20.0.6\nnpm error node_modules/@angular/compiler-cli\nnpm error   dev @angular/compiler-cli@\"^20.0.0\" from the root project\nnpm error\nnpm error Could not resolve dependency:\nnpm error peer @angular/compiler-cli@\"^18.0.0\" from @angular-devkit/build-angular@18.2.20\nnpm error node_modules/@angular-devkit/build-angular\nnpm error   dev @angular-devkit/build-angular@\"^18.2.20\" from the root project\nnpm error\nnpm error Conflicting peer dependency: @angular/compiler-cli@18.2.13\nnpm error node_modules/@angular/compiler-cli\nnpm error   peer @angular/compiler-cli@\"^18.0.0\" from @angular-devkit/build-angular@18.2.20\nnpm error   node_modules/@angular-devkit/build-angular\nnpm error     dev @angular-devkit/build-angular@\"^18.2.20\" from the root project\nnpm error\nnpm error Fix the upstream dependency conflict, or retry\nnpm error this command with --force or --legacy-peer-deps\nnpm error to accept an incorrect (and potentially broken) dependency resolution.\nnpm error\nnpm error\nnpm error For a full report see:\nnpm error /tmp/renovate/cache/others/npm/_logs/2025-07-01T18_38_32_520Z-eresolve-report.txt\nnpm error A complete log of this run can be found in: /tmp/renovate/cache/others/npm/_logs/2025-07-01T18_38_32_520Z-debug-0.log\n
```

The `@angular-devkit/build-angular` package comes with a standard installation of Angular via the `ng new <project>` CLI command and so it would be expected that it should be considered "core" to Angular and therefore be included, however since its not included, I wanted to try to force renovate bot to include it myself using the following package rules:

```json
packageRules: [
        {
            "description": "Massage the group slug to match the Angular monorepo group",
            "matchDatasources": [
                "npm"
            ],
            "matchPackageNames": [
                "@angular-devkit/build-angular"
            ],
            "matchUpdateTypes": [
                "major"
            ],
            "groupSlug": "major-angular-monorepo"
        }
    ]
```

And yet it continued to give the same error above.

## Expected behavior

Adding a package rule with a matching `groupSlug` should include the matched package(s) (in this case `@angular-devkit/build-angular`) into the same PR that other rules match for this group.

## Link to the Renovate issue or Discussion

https://github.com/renovatebot/renovate/discussions/36765