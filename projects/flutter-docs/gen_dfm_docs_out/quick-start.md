---
title: Quick Start - Flutter SDK<span id="flutter-quick-start"></span>
---

<div class="default-domain">

mongodb

</div>

<div class="contents singlecol" local="" backlinks="none" depth="2">

On this page

</div>

This page contains information to quickly get Realm Database integrated
into your Flutter app.

Before you begin, ensure you have:

-   [Installed the Flutter
    SDK](/realm/sdk/flutter/install#std-label-flutter-install)

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

# Define Your Object Model

Your application's **data model** defines the structure of data stored
within Realm Database. You can define your application's data model via
Dart classes in your application code with [Realm Object
Models](/realm/sync/data-model/create-a-schema#std-label-create-schema-from-rom).
You then have to generate the
[RealmObject](https://pub.dev/documentation/realm/latest/realm/RealmObject-class.html)
class that's used within your application.

## Create Data Model

To define your application's data model, add a Realm model class
definition to your application code.

Some considerations when defining your Realm model class:

-   Import package at the top of your class definition file.
-   In your file, give your class a private name (starting with `_`),
    such as a file `car.dart` with a class `_Car`. You generate the
    public RealmObject class using the command in the Generate
    RealmObject Class section. This command outputs a public class, such
    as `Car`.
-   Make sure to include the generated file name, such as
    `part car.g.dart`, before the code defining your model. This is
    required to generate the RealmObject class.

<div class="tabs">

<div class="tab" tabid="flutter">

Flutter

<div class="literalinclude" language="dart" caption="car.dart">

/examples/generated/flutter/define_realm_model_test.codeblock.define-model-flutter.dart

</div>

</div>

<div class="tab" tabid="dart">

Dart

<div class="literalinclude" language="dart" caption="car.dart">

/examples/generated/flutter/define_realm_model_test.codeblock.define-model-dart.dart

</div>

</div>

</div>

## Generate RealmObject Class

Now generate a RealmObject class `Car` from the data model class `Car`:

<div class="tabs">

<div class="tab" tabid="flutter">

Flutter

``` 
flutter pub run realm generate
```

</div>

<div class="tab" tabid="dart">

Dart

``` 
dart run realm_dart generate
```

</div>

</div>

Running this creates a `Car` class in a `car.g.dart` file located in the
directory where you defined the model class per the above Create Data
Model section. This `Car` class is public and part of the same library
as the `_Car` data model class. The generated `Car` class is what's used
throughout your application.

If you'd like to watch your data model class to generate a new `Car`
class whenever there's a change to `_Car`, run:

<div class="tabs">

<div class="tab" tabid="flutter">

Flutter

``` 
flutter pub run realm generate --watch
```

</div>

<div class="tab" tabid="dart">

Dart

``` 
dart run realm_dart generate --watch
```

</div>

</div>

# Open a Realm

Use the
[Configuration](https://pub.dev/documentation/realm/latest/realm/Configuration-class.html)
class to control the specifics of the realm you would like to open,
including schema.

Pass your configuration to the [Realm
constructor](https://pub.dev/documentation/realm/latest/realm/Realm-class.html)
to generate an instance of that realm:

<div class="literalinclude" language="dart">

/examples/generated/flutter/open_realm_test.codeblock.open-realm.dart

</div>

You can now use that realm instance to work with objects in the
database.

# Work with Realm Objects

Once you've opened a realm, you can create objects within it using a
[write transaction
block](https://pub.dev/documentation/realm/latest/realm/Realm/write.html).

## Create Objects

To create a new `Car`, instantiate an instance of the `Car` class and
add it to the realm in a write transaction block:

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.create-realm-object.dart

</div>

## Update Objects

To modify a car, update its properties in a write transaction block:

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.update-realm-object.dart

</div>

## Query for Objects

Retrieve a collection of all objects of a data model in the realm with
the
[Realm.all()](https://pub.dev/documentation/realm/latest/realm/Realm/all.html)
method:

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.query-all-realm-objects.dart

</div>

Filter a collection to retrieve a specific segment of objects with the
[Realm.query()](https://pub.dev/documentation/realm/latest/realm/Realm/query.html)
method:

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.query-realm-objects-with-filter.dart

</div>

Sort the results using [NSPredicate
syntax](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pCreating.html):

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.query-realm-objects-with-sort.dart

</div>

## Delete Objects

Delete a car by calling the
[Realm.delete()](https://pub.dev/documentation/realm/latest/realm/Realm/delete.html)
method in a write transaction block:

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.delete-one-realm-object.dart

</div>

Delete multiple cars with the `Realm.deleteMany() 
<realm/Realm/deleteMany.html>` method in a write transaction block.

<div class="literalinclude" language="dart">

/examples/generated/flutter/quick_start_test.codeblock.delete-many-realm-objects.dart

</div>

# Close a Realm

Once you've finished working with a realm, close it to prevent memory
leaks.

<div class="literalinclude" language="dart">

/examples/generated/flutter/open_realm_test.codeblock.close-realm.dart

</div>

# Further Examples

For further examples of all the Flutter SDK methods described above and
more, refer to the [Realm Dart Samples Github
repo](https://github.com/realm/realm-dart-samples).
