import requests

clientId = input_data['clientID']
projectId = input_data['projectID']
# alternatively, if clientId and projectId are not passed in as input, they can be hardcoded like this:
# clientId = '123'
# projectId = '456'

url = 'https://api.lassocrm.com/registrants'

headers = {'X-Lasso-Auth': 'Token=' + input_data['LassoUID'] + ', Version=1.0'}
# alternatively, if the auth token is not passed in as input, it can be hardcoded like this:
# headers = {'X-Lasso-Auth': 'Token=fgxb2rq, Version=1.0'}

json = {
      'firstName': input_data['firstName'],
      'lastName': input_data['lastName'],
      'clientId': clientId,
      'projectIds': [projectId],
      'emails': [
            {
                  'email': input_data['email'],
                  'type': input_data['emailType'],
                  'primary': True
            }
      ],
      'phones': [
            {
                  'phone': input_data['phone'],
                  'type': input_data['phoneType'],
                  'primary': True
            }
      ],

'sourceType': 'Online Registration',
'secondarySourceType': 'Facebook',
'sendSalesRepAssignmentNotification': True
'thankYouEmailTemplateId': '155'
}

r = requests.post(url, json=json, headers=headers)

output = [{'status': r.status_code, 'reason': r.reason}]
