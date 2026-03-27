import { useStaticQuery, graphql } from "gatsby";

export function useReleases() {
  const releases = useStaticQuery(
    graphql`
query GetReleases {
  allFile(
    filter: {sourceInstanceName: {eq: "download"}, name: {regex: "/processing/"}}
  ) {
    edges {
      node {
        childJson {
          name
          publishedAt
          tagName
          releaseAssets {
            edges {
              node {
                downloadUrl
                name
                size
              }
            }
          }
        }
      }
    }
  }
}
`
  );
  // sort alphabetically by tag name
  return releases.allFile.edges.map((edge) => edge.node.childJson).sort((a, b) => {
    if (a.tagName < b.tagName) return 1;
    if (a.tagName > b.tagName) return -1;
    return 0;
  }
  );
}