import React from 'react';
import Seo from './seo';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';

interface CustomLinkWithPrefetchProps {
  href: string;
  children: Element;
}

function CustomLinkWithPrefetch({
  href,
  children
}: CustomLinkWithPrefetchProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  } else {
    return <a href={href}>{children}</a>;
  }
}

function flatten(text: string, child: any): any {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function slugifyHeader(text: string): string {
  return text.toLowerCase().replace(/\W/g, '-');
}

function HeadingRenderer(props: any) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = slugifyHeader(text);
  return React.createElement('h' + props.level, { id: slug }, props.children);
}

interface ContentPageProps {
  title: string;
  path: string;
  content: string;
}

function ContentPage(props: ContentPageProps) {
  return (
    <>
      <Seo title={props.title} path={props.path} />
      <Markdown
        renderers={{ link: CustomLinkWithPrefetch, heading: HeadingRenderer }}
        escapeHtml={false}
        source={props.content}
      />
    </>
  );
}

export default ContentPage;
