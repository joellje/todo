//
//  LoginView.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI

struct LoginView: View {
    @State var email = ""
    @State var password = ""
    @State var errorMessages = [String]()
    @State var errorMessagesString = ""
    @State var hasErrors = false
    @State var isLoading = false
    @AppStorage("stage") var stage: String = "login"
    @AppStorage("token") var token: String = ""
    
    func logIn() {
        isLoading = true
        guard let url = URL(string: "http://localhost:5000/users/login") else {
            print("Invalid URL")
            return
        }
        guard let bodyData = try? JSONSerialization.data(withJSONObject: ["email": email, "password": password]) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = bodyData
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data, let response = response as? HTTPURLResponse {
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: [])as? [String: Any]
                    if response.statusCode != 200 {
                        if let dictionary = json, let messages = dictionary["messages"] as? [String] {
                            isLoading = false
                            errorMessages = messages
                            errorMessagesString = errorMessages.joined(separator: "\n")
                            hasErrors = true
                            print("Response: \(errorMessages)")
                        }
                    } else {
                        if let dictionary = json, let tokenString = dictionary["token"] as? String {
                            token = "Bearer " + tokenString
                            print(token)
                        }
                        isLoading = false
                        email = ""
                        password = ""
                        stage = "todos"
                    }
                    
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
    
    var body: some View {
        
        ZStack {
            Color("ColorBackground")
                .ignoresSafeArea(.all, edges:.all)
            
            VStack {
                Button(action: {
                    stage = "onboarding"
                }) {
                    HStack {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 16, weight: .semibold))
                        Text("Back")
                            .fontWeight(.semibold)
                        Spacer()
                    }.padding(.leading, 10)
                }
                
                Text("Log In")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .frame(maxWidth: .infinity)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.white)
                    .padding(.vertical, 5)
                
                
                Spacer()
                
                VStack {
                    FormLabelView(label: "Enter your Email:")
                    FormInputView(placeholder: "Email", input: $email)
                    FormLabelView(label: "Enter your Password:")
                    FormInputView(placeholder: "Password", input: $password)
                    
                    PrimaryButtonView(text: "Log In") {
                        errorMessages = []
                        logIn()
                    }
                }.alert(
                    "Input Errors",
                    isPresented: $hasErrors
                ) {
                    Button("Cancel") {
                        hasErrors = false
                        errorMessages = []
                    }
                } message: {
                    Text(errorMessagesString)
                }
                
                Spacer()
            }
            
            if isLoading {
                Color("ColorBackground")
                    .opacity(0.8)
                    .ignoresSafeArea(.all, edges:.all)
                
                ProgressView("Loading...")
                    .progressViewStyle(CircularProgressViewStyle(tint: .blue))
                    .foregroundColor(Color.white)
                    .frame(height: 50)
            }
        }
        
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
