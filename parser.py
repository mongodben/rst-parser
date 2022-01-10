import yaml
import re 

REF_LIKE = r":[^\s]+:`.*<[^\s]+>`"

s = """
  /groups/{groupId}/apps/{appId}/services/{serviceId}/incoming_webhooks/{incomingWebhookId}:
    get:
      tags: ["services", "webhooks"]
      operationId: "adminGetWebhook"
      summary: "Retrieve a :ref:`webhook <service-webhooks>`."
      responses:
        "200":
          description: "Successfully retrieved."
    delete:
      tags: ["services", "webhooks"]
      operationId: "adminDeleteWebhook"
      summary: "Delete a :ref:`webook <service-webhooks>`."
      responses:
        "204":
          description: "Successfully deleted."
    put:
"""

unique_ref_likes = set(re.findall(REF_LIKE, s ))
print(res)
