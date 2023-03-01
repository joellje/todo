//
//  OnboardingView.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI

struct OnboardingView: View {
    @AppStorage("stage") var stage: String = "onboarding"
    
    var body: some View {
        NavigationView {
            ZStack {
                Color("ColorBackground")
                    .ignoresSafeArea(.all, edges:.all)
                
                VStack {
                    Text("Todos")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .frame(maxWidth: .infinity)
                        .multilineTextAlignment(.center)
                        .foregroundColor(.white)
                    
                    Text("Streamline your day with a personalized todo app designed for you.")
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .multilineTextAlignment(.center)
                        .padding(.bottom, 20)
                        .padding(.horizontal, 20)
                    
                    
                    HStack {
                        PrimaryButtonView(text: "Log In") {
                            stage = "login"
                        }
                        
                        SecondaryButtonView(text: "Sign Up") {
                            stage = "signup"
                        }
                    }.padding(.top, 10)
                    
                }
                
            }
            .navigationBarBackButtonHidden(true)
        }
    }
}

struct OnboardingView_Previews: PreviewProvider {
    static var previews: some View {
        OnboardingView()
    }
}
