//
//  ContentView.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI

struct ContentView: View {
    @AppStorage("stage") var stage: String = "onboarding"
    
    // TODO: Enable Transition between Views
    var body: some View {
        ZStack {
            if stage == "onboarding" {
                OnboardingView()
            } else if stage == "login" {
                LoginView()
            } else if stage == "signup" {
                SignupView()
            } else if stage == "todos" {
                TodosView()
            } else {
                OnboardingView()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
