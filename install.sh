#!/bin/bash
#
pod repo update

rm -rf node_modules
rm package-lock.json
rm ios/Podfile.lock
rm -rf ios/Pods
cp localconfig.example.js localconfig.js
npm install
# react-native link
# sed -i -- "s|SplashScreen show|RNSplashScreen show|g" node_modules/react-native-splash-screen/ios/RNSplashScreen.m
# react-native unlink react-native-image-crop-picker
replace1_a='<uses-sdk android:minSdkVersion="16" />'
replace1_b='<!--    <uses-sdk android:minSdkVersion="16" />-->'
sed -i -- "s|$replace1_a|$replace1_b|g" node_modules/react-native-i18n/android/src/main/AndroidManifest.xml