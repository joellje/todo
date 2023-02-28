//
//  SignupView.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI

struct SignupView: View {
    @State var name = ""
    @State var email = ""
    @State var password = ""
    @State var passwordConfirm = ""
    @State var errorMessages = [String]()
    
    func signUp() {
        guard let url = URL(string: "http://localhost:5000/users/signup") else {
            print("Invalid URL")
            return
        }
        guard let bodyData = try? JSONSerialization.data(withJSONObject: ["name": name, "email": email, "password": password, "passwordConfirm": passwordConfirm,]) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = bodyData
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data, let response = response as? HTTPURLResponse {
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                    if response.statusCode != 201 {
                        if let dictionary = json, let messages = dictionary["messages"] as? [String] {
                            errorMessages = messages
                            print("Response: \(errorMessages)")
                        }
                    } else {
                        name = ""
                        email = ""
                        password = ""
                        passwordConfirm = ""
                    }
                    
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
    
    var body: some View {
        Color("ColorBackground")
            .ignoresSafeArea(.all, edges:.all)
        
        VStack {
            FormLabelView(label: "Enter your Name:")
            FormInputView(placeholder: "Name", input: $name)
            FormLabelView(label: "Enter your Email:")
            FormInputView(placeholder: "Email", input: $email)
            FormLabelView(label: "Enter your Password:")
            FormInputView(placeholder: "Password", input: $password)
            FormLabelView(label: "Confirm your Password:")
            FormInputView(placeholder: "Password Confirmation", input: $passwordConfirm)
            
            PrimaryButtonView(text: "Sign Up") {
                errorMessages = []
                signUp()
            }
        }
        
        if !(errorMessages.isEmpty){
            VStack {
                ForEach(Array(errorMessages.enumerated()), id: \.offset) { index, errorMessage in
                    AlertView(message: errorMessage)
                }
            }
        }
    }
}

struct SignupView_Previews: PreviewProvider {
    static var previews: some View {
        SignupView()
    }
}
