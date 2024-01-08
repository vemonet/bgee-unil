import { FULL_LENGTH_LABEL } from '../../api/prod/constant';
import imagePath from '../../helpers/imagePath';

const annotations = [
  {
    type: 'title',
    content: 'Annotation resources',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'Bgee Annotations Interface',
            image: {
              src: imagePath('/logo/bgee13_hp_logo.png'),
              alt: 'Bgee logo',
            },
            link: 'https://annotations.bgee.org',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Last published version of the Bgee annotations, available per experiments, per raw data and per processed expression values.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Anatomical similarity annotations',
            image: {
              src: imagePath('/logo/github-logo.png'),
              alt: 'Github logo',
            },
            link: 'https://github.com/BgeeDB/anatomical-similarity-annotations',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Anatomical similarity annotations used to define evolutionary relations between anatomical entities described in the Uberon ontology.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'RNA-Seq annotations',
            image: {
              src: imagePath('/logo/github-logo.png'),
              alt: 'Github logo',
            },
            link: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/source_files/RNA_Seq',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Annotations of RNA-Seq experiments, libraries and platforms used to generate the last version of Bgee.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: `${FULL_LENGTH_LABEL} annotations`,
            image: {
              src: imagePath('/logo/github-logo.png'),
              alt: 'Github logo',
            },
            link: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/source_files/scRNA_Seq',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content: `Annotations of ${FULL_LENGTH_LABEL} experiments, libraries and platforms used to generate the last version of Bgee.`,
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Affymetrix annotations',
            image: {
              src: imagePath('/logo/github-logo.png'),
              alt: 'Github logo',
            },
            link: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/source_files/Affymetrix',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Annotations of Affymetrix experiments, chips, chip types used to generate the last version of Bgee.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'ESTs annotations',
            image: {
              src: imagePath('/logo/github-logo.png'),
              alt: 'Github logo',
            },
            link: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/source_files/ESTs',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'ESTs annotations used to generate the last version of Bgee.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'GTEx cleaning for Bgee',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Github logo',
            },
            link: 'https://docs.google.com/document/d/1IuNu3WGTSIhXnJffP_yo7lK2abSgxZQDPJgG1SYF5vI',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Information on how the GTEx dataset was cleaned for Bgee.',
          },
        ],
      },
    ],
    cols: 4,
    fillRow: true,
  },
];

export default annotations;
