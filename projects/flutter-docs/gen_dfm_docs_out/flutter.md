---
title: Flutter SDK (Alpha)
---

<div class="toctree" titlesonly="">

Install Realm for Flutter \</sdk/flutter/install.txt> Quick Start
\</sdk/flutter/quick-start.txt> Realm Database
\</sdk/flutter/realm-database.txt> Flutter SDK Reference Manual
\<<https://pub.dev/documentation/realm/latest/>\> Release Notes
\<<https://github.com/realm/realm-dart/releases>\>

</div>

<div class="contents singlecol" local="" backlinks="none" depth="2">

On this page

</div>

<div class="warning">

<div class="title">

Warning

</div>

Alpha Release

This SDK is currently offered as an **alpha** release. We encourage you
to try out the feature and [give
feedback](https://feedback.mongodb.com/forums/923521-realm/). However,
be aware that APIs and functionality are subject to change.

</div>

The MongoDB Realm Flutter SDK enables client applications written in
[Dart](https://dart.dev/) for the [Flutter](https://flutter.dev/)
platform to access data stored in local realms.

<div class="note">

<div class="title">

Note

</div>

Local Realm Database Only

The Flutter SDK currently only supports local Realm Database. You cannot
use the Flutter SDK to connect to [MongoDB Realm application
services](/realm/cloud#std-label-realm-cloud) or use [Realm
Sync](/realm/sync/learn/overview#std-label-sync).

</div>

# Supported Realm Features

The alpha version of the SDK supports the following Realm features:

-   Create Realm objects
-   Retrieve, query, sort, and filter Realm objects
-   Update Realm objects
-   Delete Realm objects

## Alpha Limitations

Because this is an alpha version of the SDK, functionality is limited
and there are specific configuration considerations:

-   The alpha version of the SDK enables working with a local-only (on
    device) Realm database. Realm Sync functionality is not yet
    implemented.
-   The SDK doesn't have built-in functionality to interact with
    [MongoDB Realm application
    services](/realm/cloud#std-label-realm-cloud).
-   The SDK doesn't support Flutter on Linux desktop yet.

# Get Started

To start using the MongoDB Realm Flutter SDK in your Flutter
application, see `Install Realm for Flutter
<flutter-install>` to add the Flutter SDK dependency and then check out
the `Quick Start
<flutter-quick-start-local>`.

# Dart Standalone Realm

In addition to using Realm with Flutter, you can also use Realm with
projects that just use Dart, like a CLI application or web server.

The usage for Realm with Dart is the same as the Flutter SDK, except you
must install and set up a separate package.

[Learn how to set up Realm in your Dart
project.](/realm/sdk/flutter/install#std-label-dart-install-steps)

# Flutter SDK Reference

[Explore the reference documentation on
pub.dev.](https://pub.dev/documentation/realm/latest/)
