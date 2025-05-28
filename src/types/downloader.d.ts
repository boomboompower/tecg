
type ReleaseInfo = {
    buildId: string,            // The random ID of this build
    created: number,            // The UNIX time for when twilight was created
    files: Array<string>,       // A list of entry files for the site.
    stage: 'live'               // The stage - 'live', 'staging', 'dev'
}

type BuildInfo = {
    id: string,                 // the identifier for this build
    created: number,            // the time this build was created
    updated: number,            // the time this build was updated
    primary: boolean,           // false - unknown value
    active: boolean,            // will always be true if latest release
    releases: ReleaseInfo[]     // update_chunks
}

type ExperimentData = {
    active: boolean,
    id: string,
    name: string
    groups: { weight: number, value: string }[],
}

type ShorthandData = {
    added: number,             // Number of experiments added
    removed: number,           // Number of experiments removed
    activated: number,         // Number of experiments activated
    deactivated: number        // Number of experiments deactivated
}

type StoredBuildData = {
    buildId: string;
    updatedAt: number;
    experimentsCount: number;
    shorthand: {
        added: number;
        removed: number;
        activated: number;
        deactivated: number;
    };
    comments: string[];
}

type RemoteBuildData = {
    comments: string[];
    shorthand: ShorthandData;
    buildVersion: string;
}
