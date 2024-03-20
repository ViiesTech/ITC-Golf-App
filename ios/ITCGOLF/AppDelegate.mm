#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ITCGOLF";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
//    [RNSplashScreen show];


//   UIStoryboard *b = [UIStoryboard storyboardwithName: @"LaunchScreen" bundle:nil];
// UIViewController *vc = [sb instantiateInitialViewController];
// rootView. loadingView = vc. view;

 return [super application:application didFinishLaunchingWithOptions:launchOptions];
  
//  return YES;


}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
