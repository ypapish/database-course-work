# A model of precedents

This file should list all documents developed in the project and provide links to them.

_The precedent model should contain general overview diagrams and precedent specifications._

You can embed chart images using the [plantuml.com](https://plantuml.com/).

The markdown file uses a description of the chart

```md
<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    right header
        <font size=24 color=black>Package: <b>UCD_3.0
    end header

    title
        <font size=18 color=black>UC_8. Edit the portal configuration
        <font size=16 color=black>Diagram of precedents
    end title


    actor "User" as User #eeeeaa

    package UCD_1{
        usecase "<b>UC_1</b>\nView the list of \nreports" as UC_1 #aaeeaa
    }

    usecase "<b>UC_1.1</b>\nApply a filter" as UC_1.1
    usecase "<b>UC_1.2</b>\nView report metadata" as UC_1.2
    usecase "<b>UC_1.2.1</b>\nEvaluate the report" as UC_1.2.1
    usecase "<b>UC_1.2.2</b>\nView information \nabout the authors of the report" as UC_1.2.2

    package UCD_1 {
        usecase "<b>UC_4</b>\nCall up a report" as UC_4 #aaeeaa
    }

    usecase "<b>UC_1.1.1</b>\n Use \nsearch tags" as UC_1.1.1
    usecase "<b>UC_1.1.2</b>\n Use \nsearch bar" as UC_1.1.2
    usecase "<b>UC_1.1.3</b>\n Use \nauthors" as UC_1.1.3



    User -> UC_1
    UC_1.1 .u.> UC_1 :extends
    UC_1.2 .u.> UC_1 :extends
    UC_4 .d.> UC_1.2 :extends
    UC_1.2 .> UC_1.2 :extends
    UC_1.2.1 .u.> UC_1.2 :extends
    UC_1.2.2 .u.> UC_1.2 :extends
    UC_1 ..> UC_1.2.2 :extends


    UC_1.1.1 -u-|> UC_1.1
    UC_1.1.2 -u-|> UC_1.1
    UC_1.1.3 -u-|> UC_1.1

    right footer
        Analytical portal. A model of precedents.
        NTUU KPI named after Igor Sikorsky
        Kyiv-2024
    end footer

@enduml

**Diagram of precedents**

</center>
```

which will be displayed as follows

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
    >

@startuml

    right header
        <font size=24 color=black>Package: <b>UCD_3.0
    end header

    title
        <font size=18 color=black>UC_8. Edit the portal configuration
        <font size=16 color=black>Diagram of precedents
    end title


    actor "User" as User #eeeeaa

    package UCD_1{
        usecase "<b>UC_1</b>\nView the list of \nreports" as UC_1 #aaeeaa
    }

    usecase "<b>UC_1.1</b>\nApply a filter" as UC_1.1
    usecase "<b>UC_1.2</b>\nView report metadata" as UC_1.2
    usecase "<b>UC_1.2.1</b>\nEvaluate the report" as UC_1.2.1
    usecase "<b>UC_1.2.2</b>\nView information \nabout the authors of the report" as UC_1.2.2

    package UCD_1 {
        usecase "<b>UC_4</b>\nCall up a report" as UC_4 #aaeeaa
    }

    usecase "<b>UC_1.1.1</b>\n Use \nsearch tags" as UC_1.1.1
    usecase "<b>UC_1.1.2</b>\n Use \nsearch bar" as UC_1.1.2
    usecase "<b>UC_1.1.3</b>\n Use \nauthors" as UC_1.1.3



    User -> UC_1
    UC_1.1 .u.> UC_1 :extends
    UC_1.2 .u.> UC_1 :extends
    UC_4 .d.> UC_1.2 :extends
    UC_1.2 .> UC_1.2 :extends
    UC_1.2.1 .u.> UC_1.2 :extends
    UC_1.2.2 .u.> UC_1.2 :extends
    UC_1 ..> UC_1.2.2 :extends


    UC_1.1.1 -u-|> UC_1.1
    UC_1.1.2 -u-|> UC_1.1
    UC_1.1.3 -u-|> UC_1.1

    right footer
        Analytical portal. A model of precedents.
        NTUU KPI named after Igor Sikorsky
        Kyiv-2024
    end footer

@enduml

**Diagram of precedents**

</center>
