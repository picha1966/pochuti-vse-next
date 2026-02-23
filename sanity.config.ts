import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Почути Все — CMS',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.listItem()
              .title('Товари')
              .icon(() => '🎧')
              .child(S.documentTypeList('product').title('Товари')),
            S.listItem()
              .title('Категорії')
              .icon(() => '🏷️')
              .child(S.documentTypeList('category').title('Категорії')),
            S.listItem()
              .title('Статті блогу')
              .icon(() => '📝')
              .child(S.documentTypeList('post').title('Статті блогу')),
          ]),
    }),
    visionTool(),
  ],
});
