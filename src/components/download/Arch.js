import React, { useEffect } from 'react';
import { useQueryParamString } from 'react-use-query-param-string';
import { useReleases } from '../../hooks/releases';
import { OperatingSystems } from './OS';

export default function SelectArch() {
    const releases = useReleases();
    const [version, setVersion] = useQueryParamString('version');
    const [os, setOS] = useQueryParamString('os');
    const [arch, setArch] = useQueryParamString('arch')

    const available = releases
        .filter(release => release.tagName === version)
        .flatMap(release => release.releaseAssets.edges)
        .filter(asset => asset.node?.name?.includes(os) || os === OperatingSystems.raspberry && (asset.node?.name?.includes('linux-arm') || asset.node?.name?.includes('linux-aarch')))
        .filter(asset => !asset.node?.name?.includes("portable"))

    useEffect(() => {
        if (available.length == 1) {
            setArch(tagToArch(available[0].node.name))
        } else {
            if (version && os && available.filter(asset => asset.node.name.includes(arch)).length == 0) {
                setArch(undefined)
            }
        }
    }, [version, os])

    if (available.length < 2) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
            {available.map((asset, index) => {
                const tag = asset.node.name;
                const arch = tagToArch(tag);
                return (
                    <div key={index} onClick={() => setArch(arch)} style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
                        <h3>{arch}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export function tagToArch(tag) {
    if (tag.includes('x64') || tag.includes('amd64')) return 'x64';
    if (tag.includes('arm64')) return 'arm64';
    if (tag.includes('arm32')) return 'arm32';
    if (tag.includes('armhf')) return 'armhf';
    if (tag.includes('aarch')) return 'aarch';
    return null;
}