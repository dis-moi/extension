import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface MdxPageProps {
  title: string;
  mdxSource: MDXRemoteSerializeResult;
}

export function createMdxStaticPaths(locale: 'fr' | 'en'): GetStaticPaths {
  return async () => {
    const contentDir = path.join(process.cwd(), `content/${locale}`);
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'));
    const paths = files.map((file) => ({
      params: { slug: file.replace('.mdx', '') },
    }));

    return { paths, fallback: false };
  };
}

export function createMdxStaticProps(
  locale: 'fr' | 'en',
): GetStaticProps<MdxPageProps> {
  return async ({ params }) => {
    const slug = params?.slug as string;
    const contentDir = path.join(process.cwd(), `content/${locale}`);
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(source);
    const mdxSource = await serialize(content, {
      mdxOptions: { format: 'md' },
    });

    return {
      props: {
        title: data.title || '',
        mdxSource,
      },
    };
  };
}
