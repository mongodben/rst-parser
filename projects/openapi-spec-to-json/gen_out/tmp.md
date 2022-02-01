### 1. Create a New Draft

A draft represents a group of application changes that you can deploy or
discard as a single unit. To create a draft, send a `POST` request to
the drafts endpoint:

```shell
curl --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/drafts'
```

**See Also**: [API Deployment Endpoints](undefinedapplication-deployment-apis)

#### One Draft Per User

Each user can only create a single draft at a time, either through the
UI or the Admin API. If you already have an existing draft, you can
discard the changes associated with it by sending a `DELETE` request to
the draft's endpoint:

```shell
curl --request DELETE \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/drafts/{draftId}'
```

### 2. Make Changes to Your Application

Once you've created a draft, make all of the changes that you want to
include in the draft. Realm adds any application changes that you make
to the draft so that you can deploy them together.

### 3. Deploy the Draft

After you've made all the changes that you want to include in the
deployment, deploy the draft by sending a `POST` request to that draft's
deployment endpoint:

```shell
curl --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/drafts/{draftId}/deployment'
```

#### Draft Conflicts

If you deploy changes through the API but have conflicting changes in a
draft in the UI, your UI draft will become invalid and you will not be
able to deploy it. You can download your UI draft by reviewing the draft
in the `Deployment` page. You can use the download to deploy your
changes in the `realm-cli` or as a reference as you reapply changes in
the UI.

</div>
