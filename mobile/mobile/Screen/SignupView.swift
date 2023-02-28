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
    @State var errorMessage = ""
    
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
                    let json = try JSONSerialization.jsonObject(with: data, options: [])as? [String: Any]
                    if response.statusCode != 201 {
                        errorMessage = json?["messages"] as? String ?? ""
                        print("Response: \(errorMessage)")
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
        Text("Enter your Name:")
        TextField("Name", text: $name)
            .padding()
            .border(Color.gray, width: 1)
        
        Text("Enter your Email:")
        TextField("Email", text: $email)
            .padding()
            .border(Color.gray, width: 1)
        
        Text("Enter your Password:")
        TextField("Password", text: $password)
            .padding()
            .border(Color.gray, width: 1)

        Text("Confirm your Password:")
        TextField("PasswordConfirm", text: $passwordConfirm)
            .padding()
            .border(Color.gray, width: 1)
        
        Button("Sign Up") {
            errorMessage = ""
            signUp()
        }
        if !(errorMessage.isEmpty){
            Text("\(errorMessage)")
        }
    }
}

struct SignupView_Previews: PreviewProvider {
    static var previews: some View {
        SignupView()
    }
}
