import React from "react";
import { useIntl } from "react-intl";

import HeadMatter from "../components/HeadMatter";
import Layout from "../components/Layout";
import { useReleases } from "../hooks/releases";
import { useSelectedReleases } from "../hooks/selected";

import * as css from '../styles/templates/download.module.css';
import * as grid from '../styles/grid.module.css';

import classnames from 'classnames';
import Donate from '../components/character/Donate';
import SelectVersion from "../components/download/Version";
import SelectOS from "../components/download/OS";
import SelectArch from "../components/download/Arch";
import SelectDonation from "../components/download/Donate";
import SelectOther from "../components/download/Other";
import SelectNewsletter from "../components/download/Newsletter";
import Download from "../components/download/Download";


export default function Downloads() {
    const { formatMessage } = useIntl();

    const releases = useReleases()
    const { selectedReleases, selectedPreReleases } = useSelectedReleases()

    return <Layout>
        <HeadMatter
            title={formatMessage({ id: "downloadTitleMeta" })}
            description={formatMessage({ id: 'downloadIntro' })}
        />

        <div className={classnames(grid.container, grid.grid)}>
            <div className={classnames(grid.col, css.headerContent)}>
                <Donate />
                <h1>{formatMessage({ id: 'downloadTitle' })}</h1>
                <p>{formatMessage({ id: 'downloadIntro' })}</p>
            </div>
        </div>

        <div className={classnames(grid.container)}>
            <SelectVersion />
        </div>
        <div className={classnames(grid.container)}>
            <SelectOther />
        </div>
        <div className={classnames(grid.container)}>
            <SelectOS />
        </div>
        <div className={classnames(grid.container)}>
            <SelectArch />
        </div>
        <div className={classnames(grid.container)}>
            <SelectDonation />
        </div>
        <div className={classnames(grid.container)}>
            <SelectNewsletter />
        </div>
        <div className={classnames(grid.container)}>
            <Download />
        </div>
    </Layout>
}