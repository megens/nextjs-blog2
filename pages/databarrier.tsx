import Layout from "../components/layout";
import Typography from "@material-ui/core/Typography";

export default function DataBarrier() {
  return (
    <Layout>
      <Typography variant="h3">Data Barrier</Typography>
      <Typography variant="body1">
        How can you share your data to invite third party analysis, while still
        protedting your intellectual property? With Ockham's data barrier, you
        choose the level of granularity you're willing to shre. The third party
        shares a level of granularity required to perform its onsite analysis.
        If sufficient overlap exists, the data is presented in a format
        acceptable to both parties, and analysis occurs on our site. Your data
        is never transferred beyond our site. Their analytical tools are present
        on the site so that data is shared, but not transferred.
      </Typography>
    </Layout>
  );
}
