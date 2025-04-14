import React, { useEffect } from 'react';
import { useQueryParamString } from 'react-use-query-param-string';
import LogoWindows from '../../images/logo-windows.svg';
import LogoMac from '../../images/logo-macos.svg';
import LogoLinux from '../../images/logo-linux.svg';
import LogoRaspberry from '../../images/logo-raspberry.svg';
import { useReleases } from '../../hooks/releases';

export const OperatingSystems = {
    windows: 'windows',
    macos: 'macos',
    linux: 'linux',
    raspberry: 'raspberry'
}


export default function SelectOS() {
    const releases = useReleases();

    const [version, setVersion] = useQueryParamString('version', '');
    const [os, setOS] = useQueryParamString('os', '');

    useEffect(() => {
        if (!version) return
        if (os) return

        const { userAgent } = navigator;
        if (userAgent.search('Mac') !== -1) {
            setOS(OperatingSystems.macos);
        } else if (userAgent.search('X11') !== -1) {
            setOS(OperatingSystems.linux);
        } else {
            setOS(OperatingSystems.windows);
        }

    }, [version]);

    const selectedRelease = releases.find(release => release.tagName === version);
    if (!selectedRelease) return null;

    const osOptions = {
        [OperatingSystems.windows]: {
            name: 'Windows',
            logo: <LogoWindows />,
            available: selectedRelease.releaseAssets.edges.some(asset => asset.node.name?.includes('windows') ?? false),
        },
        [OperatingSystems.macos]: {
            name: 'MacOS',
            logo: <LogoMac />,
            available: selectedRelease.releaseAssets.edges.some(asset => asset.node?.name?.includes('macos') ?? false),
        },
        [OperatingSystems.linux]: {
            name: 'Linux',
            logo: <LogoLinux />,
            available: selectedRelease.releaseAssets.edges.some(asset => asset.node?.name?.includes('linux') ?? false),
        },
        [OperatingSystems.raspberry]: {
            name: 'Raspberry Pi',
            logo: <LogoRaspberry />,
            available:
                selectedRelease.releaseAssets.edges.some(asset => asset.node?.name?.includes('linux-arm') ?? false) ||
                selectedRelease.releaseAssets.edges.some(asset => asset.node?.name?.includes('linux-aarch') ?? false),
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
            {Object.entries(osOptions).map(([key, { name, logo, available }]) => (
                <div
                    key={key}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1rem',
                        alignItems: 'center',
                        cursor: available ? 'pointer' : 'not-allowed',
                        opacity: available ? 1 : 0.5,
                    }}
                    onClick={() => available && setOS(key)}
                >
                    {logo}
                    <h2>{name}</h2>
                </div>
            ))}
        </div>
    )

}