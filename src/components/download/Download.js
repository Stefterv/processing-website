import React from "react";
import { useReleases } from "../../hooks/releases";
import { useQueryParamString } from "react-use-query-param-string";
import { OperatingSystems } from "./OS";


export default function Download() {
    const releases = useReleases()
    const [version, setVersion] = useQueryParamString('version');
    const [os, setOS] = useQueryParamString('os');
    const [arch, setArch] = useQueryParamString('arch')
    const [donated, setDonated] = useQueryParamString('donated');
    const [newsletter, setNewsletter] = useQueryParamString('newsletter');

    if (!version || !os || !arch || !donated || !newsletter) return null;

    const available = releases
        .filter(release => release.tagName === version)
        .flatMap(release => release.releaseAssets.edges)
        .filter(asset => asset.node?.name?.includes(os) || os === OperatingSystems.raspberry && (asset.node?.name?.includes('linux-arm') || asset.node?.name?.includes('linux-aarch')))
        .filter(asset => !asset.node?.name?.includes("portable"))
        .filter(asset => asset.node?.name?.includes(arch))

    const selected = available[0]?.node
    if (!selected) return null;

    return <div>
        <a href={selected.downloadUrl} target="_blank" rel="noopener noreferrer">
            <button style={{ padding: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                Download Processing 💙
            </button>
        </a>
    </div>
}