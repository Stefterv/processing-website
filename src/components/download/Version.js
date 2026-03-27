import React, { useEffect, useState } from "react"
import { useSelectedReleases } from "../../hooks/selected"
import { useQueryParamString } from 'react-use-query-param-string';


export default function SelectVersion() {

    const { selectedReleases, selectedPreReleases } = useSelectedReleases()

    const [version, setVersion, initialized] = useQueryParamString('version', '');


    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
            <h1>Select Version</h1>
            <h2 onClick={() => setVersion(selectedReleases[0])}>Stable</h2>
            <h3 onClick={() => setVersion(selectedPreReleases[0])}>Beta</h3>
            <h4 onClick={() => setVersion("other")}>other</h4>
        </div>
    )
}