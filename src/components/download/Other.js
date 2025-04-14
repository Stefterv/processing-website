import React from "react";
import { useQueryParamString } from 'react-use-query-param-string';
import { useReleases } from "../../hooks/releases";

export default function SelectOther() {
    const [version, setVersion] = useQueryParamString('version');
    const releases = useReleases();

    if (version !== "other") return null;

    const majorVersions = releases.map(release => {
        const version = release.tagName
            .split("-").slice(-1)[0].split('.')[0]
        return version;
    }).sort();
    const uniqueMajorVersions = [...new Set(majorVersions)];
    const latestMajorVersion = uniqueMajorVersions[uniqueMajorVersions.length - 1];

    return (
        <div>
            {latestMajorVersion}
        </div>
    )
}