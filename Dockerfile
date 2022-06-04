FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS dotnet-build
WORKDIR /app

#COPY /global.json .
RUN rm -r /usr/share/dotnet/sdk-manifests
COPY /server/src/MirrorV2.Services/MirrorV2.Services.csproj ./server/src/MirrorV2.Services/MirrorV2.Services.csproj
RUN dotnet restore ./server/src/MirrorV2.Services/MirrorV2.Services.csproj

COPY /server ./server
RUN dotnet publish ./server/src/MirrorV2.Services/MirrorV2.Services.csproj -c Release -o /publish

FROM node:16 as node-build
WORKDIR /ui

COPY /ui .

ENV NODE_ENV production
RUN npm i
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /app
COPY --from=dotnet-build /publish .
COPY --from=node-build /ui/build ./wwwroot
EXPOSE 5001
ENTRYPOINT ["dotnet", "MirrorV2.Services.dll"]