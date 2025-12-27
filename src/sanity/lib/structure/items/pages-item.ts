import { Folder } from "lucide-react";
import { StructureBuilder } from "sanity/structure";
import { EventsPage } from './events-item';

export const PagesItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Pages')
    .icon(Folder)
    .child(
      S.list()
        .title('Pages')
        .items([
          HomePageItem(S),
          PageBuilder(S),
          IndexPages(S)
        ])
    )
)

export const HomePageItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Page d\'accueil')
    .child(
      S.document()
      .id('homePage')
      .schemaType('homePage')
      .documentId('homePage')
      .title('Page d\'accueil')
    )
)

export const IndexPages = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Index Pages')
    .child(
      S.list()
        .title('Index Pages')
        .items([
          BlogItem(S),
          ProjectsItem(S),
          ServicesItem(S),
          EventsPage(S)
        ])
    ) 
)

export const PageBuilder = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Page Builder')
    .child(
      S.documentList()
      .title('Page Builder')
      .filter('_type == "page"')
    ) 
)

export const BlogItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Blog')
    .child(
      S.document()
      .id('blogPage')
      .schemaType('blogPage')
      .documentId('blogPage')
      .title('Blog')
    )
)

export const ServicesItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Services')
    .child(
      S.document()
      .id('servicesPage')
      .schemaType('servicesPage')
      .documentId('servicesPage')
      .title('Services')
    )
)

export const ProjectsItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Projects')
    .child(
      S.document()
      .id('projectsPage')
      .schemaType('projectsPage')
      .documentId('projectsPage')
      .title('Projects')
    )
)