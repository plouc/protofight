PROTOFIGHT
==========

Protofight helps building application prototypes.

try the [demo](http://protofight.herokuapp.com/)

Available components
--------------------

It provides various components:

  * ChartLine
  * ChartPie
  * ContentCode
  * ContentContainer
  * ContentMarkdown
  * ContentPage
  * ContentText
  * DataJsonApiCall
  * DataStaticJson
  * LayoutCell
  * LayoutRow
  * NavBreadcrumbs
  * NavMenu


Node structure template
-----------------------

```
  + web/js/nodes
  |
  +--+ NavBreadcrumbs
     |
     +--+ components # React components
     |  |
     |  +-- NavBreadcrumbsNode.jsx
     |  +-- NavBreadcrumbsEditNode.jsx
     |
     +--+ sass
        |
        +-- _whatever.scss # imported in node.scss
        +-- node.scss      # main sass file, will be automatically included in main project sass file
```
