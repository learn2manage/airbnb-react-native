This repo is used personally to learn React Native from Simon Grimm tutorial https://www.youtube.com/watch?v=iWzUZiVoiR0 

I am new to React Native and codes are subject to error 

Note that I will make some extra edits or skip some part of the original video exploring different features React Native. 

The project is not complete yet.

Some significant changes from original tutorial:
assets/data/airbnb-listings.json
assets/data/airbnb-listings.geo.json
I an using a very small dataset that is Hong Kong based. 

[components/ExploreHeader.tsx](https://github.com/learn2manage/airbnb-react-native/blob/master/components/ExploreHeader.tsx) 
As I am using another set of JSON data, I changed the categories definition of an attribute I pick from the JSON. 
I will then use the categories to implement filtering on "listings" when use select different "tabs". 

[/app/(tabs)/index.tsx](https://github.com/learn2manage/airbnb-react-native/blob/master/app/(tabs)/index.tsx)
ScrollView in Android does not work I have to move the <ExploreHeader /> away from <Stack.Screen>
It is not perfect fix but at least I get it to work
I use geoItems, filteredItems and filteredGeoItems for <ListingsMap> and <Listings> so that when user 
select different tabs, both lists will change accordingly. 

[app/(modals)/login.tsx](https://github.com/learn2manage/airbnb-react-native/blob/master/app/(modals)/login.tsx)
onSelectAuth() using Google successfully created a createdSessionId but router.back(); always prompts "Unmatch router".
I finally use router.push('/'); to bypass the problem








