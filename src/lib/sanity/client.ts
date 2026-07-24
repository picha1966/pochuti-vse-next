import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Sanity is only considered configured when both projectId and dataset are
// present — a client built with an undefined dataset is not a valid client.
export const isSanityConfigured = Boolean(projectId && dataset);

export const client = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
      token: process.env.SANITY_READ_TOKEN,
    })
  : null;

export const serverClient = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      token: process.env.SANITY_READ_TOKEN,
    })
  : null;
