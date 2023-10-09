import React from 'react';
import { Helmet } from 'react-helmet';

const current = new Date();
const copyright = `Bgee copyright 2007/${current.getFullYear()} SIB/UNIL`;

const GenericHelmetProvider = () => (
  <>
    <Helmet>
      <title>Bgee: gene expression data in animals</title>
      <meta
        name="description"
        content="Bgee is a database for retrieval and comparison of gene expression patterns across multiple animal species. It provides an intuitive answer to the question -where is a gene expressed?- and supports research in cancer and agriculture as well as evolutionary biology."
      />
      <meta
        name="keywords"
        content="bgee, gene expression, evolution, ontology, anatomy, development, evo-devo database, anatomical ontology, developmental ontology, gene expression evolution"
      />
      <meta name="dcterms.rights" content={copyright} />
      <script>
      {`
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src='https://matomo.sib.swiss/js/container_F5WPJc2X.js'; s.parentNode.insertBefore(g,s);
      `}
      </script>
    </Helmet>
  </>
);

export default GenericHelmetProvider;
