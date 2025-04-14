import { useStaticQuery, graphql } from "gatsby";

export function useSelectedReleases() {
    const selected = useStaticQuery(
        graphql`
query GetSelectedRelease {
    allFile(
        filter: {sourceInstanceName: {eq: "download"}, name: {regex: "/selected/"}}
    ) {
        edges {
            node {
                childJson {
                    selectedReleases
                    selectedPreReleases
                }
            }
        }
    }
}
        `
    )
    return selected.allFile.edges[0].node.childJson
}