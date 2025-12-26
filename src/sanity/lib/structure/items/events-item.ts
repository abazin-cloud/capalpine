import { Calendar } from "lucide-react";
import { StructureBuilder, StructureResolverContext } from "sanity/structure";

export const EventsItem = (
  S: StructureBuilder, 
  context: StructureResolverContext
) => (
  S.listItem()
    .title('Événements')
    .icon(Calendar)
    .child(
      S.list()
        .title('Événements')
        .items([
          AllEvents(S),
        ])
    )
)

export const EventsPage = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Page Événements')
    .icon(Calendar)
    .child(
      S.document()
        .id('eventsPage')
        .schemaType('eventsPage')
        .documentId('eventsPage')
        .title('Page Événements')
    ) 
)

export const AllEvents = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Événements')
    .icon(Calendar)
    .child(
      S.documentList()
      .title('Tous les événements')
      .filter('_type == "event"')
      .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
    ) 
)

