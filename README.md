# Meeting Token Generator

## Summary
The Meeting Token Generator app is a Microsoft Teams app that extends meetings in Teams.  
The app is intended to be used during a meeting where a participant will request a token (generated sequentially) in the meeting, so that each participant has a fair opportunity to interact. This can be useful in scrum meetings, Q&A sessions, etc.

### Key features
 - Display the current token that is being serviced in the meeting
 - Display the user list sorted by the token number in ascending order
 - Generate a token for the user upon request
 - Display the current user's token number
 - Mark a token as done by the user
 - Ability to skip the current token for the organizer of the meeting
 - App is optimized for the side panel viewport size
  
### User interactions [Screenshot](#screenshot)
- Token - button to generate the token for the user
- Done - Acknowledge the the user is done with the token.
- Skip(Only in Organizer view) - skip the current and move to next.

## Prerequisites

### Tools

- [.NET Core SDK](https://dotnet.microsoft.com/download) version 3.1

  ```bash
  # determine dotnet version
  dotnet --version
  ```

- [Nodejs](https://nodejs.org/en/download/) version 10.21.0+ (use the LTS version)

  ```bash
  # determine dotnet version
  node --version
  ```

- [Ngrok](https://ngrok.com/download) (Only for devbox testing) Latest (any other tunneling software can also be used)

  ```bash
  # determine dotnet version
  node --version
  ```

### Technologies

We assume working knowledge of the following technologies to gain full understanding of the app

- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/)
- [ECMAScript6](http://es6-features.org/)
- [Asp.NET core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1) version 3.1
- [React.JS](https://reactjs.org/tutorial/tutorial.html) version 16+  

## To try this sample

### [Register your bot using bot channel registration in Azure AD portal and add authentication](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/authentication/add-authentication?tabs=dotnet%2Cdotnet-sample), save the application (client) ID  and client secret, as this will be required for bot service calls
- Set up the appsettings.json with the following keys  
  `"MicrosoftAppId"`: Application(client) ID of your bot service app registered in previous step  
  `"MicrosoftAppPassword"`: client secret of your bot channel registered in the previous step,  
  `"AzureAd"."TenantId"`: Tenant Id of the tenant where the app is deployed. 
  `"AzureAd"."ApplicationIdUri "`: Application id uri value from app registration.
  `"ContentBubbleUrl "`: Content bubble iframe url (default. `https://[WebAppDomain]/contentBubble.html`).
-  For testing, start an ngrok session and use the ngrok domain as value for the `WebAppDomainName`. Make sure you update the same in manifest.json, appsettings.json, Azure bot registration endpoint and tab app registration.
  
### Add the following entry to the manifest.json ([schema reference](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema))
  - Set `manifestVersion` to "devPreview"
  - Add a configurableTabs section with 
    - `"scopes": [ "groupchat" ]`
    - `"context": [ "meetingChatTab", "meetingDetailsTab", "meetingSidePanel" ]`
  - Add your bot configuration, with the app id of the bot generated from the previous steps
  - Add the following webApplicationInfo section to the manifest, use MicrosoftAppId and WebAppDomain defined above.
    ```json
    "webApplicationInfo": {  
      "id": "[MicrosoftAppId]",  
      "resource": "api://[WebAppDomainName]/[MicrosoftAppId]"  
    }
    ```
- To run the app in debug mode press F5 in visual studio/VS Code.

### Build the client app
  - Navigate to the `App` folder in a terminal
  - Run `npm install`
  - Run `npm run build` to build the app. 
  
  This generates the dist folder inside the app where the assets will generated/copied. The server will serve the static files from this location.

### Build the services
  - Build and Run the server, choose option A or B.  
    A) From a terminal
    - In a terminal, navigate to `TokenApp` folder
    ```bash
    # run the server
    cd TokenApp
    dotnet run
    ```

    B) Or from Visual Studio
    - Launch Visual Studio
    - File -> Open -> Project/Solution
    - Navigate to `TokenApp` folder
    - Select `TokenApp.csproj` file
    - Press `F5` to run the project

### Sideload the app
  - Create a .zip using the below files(found in {AppRoot}/Resources/Manifest)
    - manifest.json
    - icon-outline.png
    - icon-color.png
  - Create a meeting with few test participants, ideally with a mix of Presenters and Attendees.
  - Once meeting is created, go to the meeting details page and click on the "Add tab" (+) button.
  - In the pop-up that opens, click on "Manage apps".
  - Click on "Upload a custom app" and upload the .zip file that was created in the previous steps. This adds the app to the meeting.
  - Click on the "Add tab" button again. Now in the app selection page, the app should be visible as a "Meeting optimized tab".
  - Select the Meeting Token app.
  - Now the app will be visible in the meeting chat.
  - Start the meeting and the icon should be visible in the meeting control bar.


## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your app to Azure](https://docs.microsoft.com/en-in/azure/app-service/quickstart-dotnetcore?pivots=platform-linux) for a complete list of deployment instructions.

## Troubleshooting
The app uses in-memory store to maintain token information and serviceurl. In the event of service restart, use the bot reset command to reset the app state to and restore the service url:
- Using @mention to trigger the bot command:  `@[BotName] reset`

## Further reading

- [Teams Tabs experience](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/what-are-tabs)
- [Tabs SSO](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso)
- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [.NET Core CLI tools](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
