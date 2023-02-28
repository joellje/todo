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
    @State var errorMessage = ""
    
    func logIn() {
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
                        errorMessage = json?["messages"] as? String ?? ""
                        print("Response: \(errorMessage)")
                    } else {
                        email = ""
                        password = ""
                    }
                    
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
    
    var body: some View {
        Text("Enter your Email:")
        TextField("Email", text: $email)
            .padding()
            .border(Color.gray, width: 1)
        Text("Enter your Password:")
        TextField("Password", text: $password)
            .padding()
            .border(Color.gray, width: 1)
        
        Button("Log In") {
            errorMessage = ""
            logIn()
        }
        if !(errorMessage.isEmpty){
            Text("\(errorMessage)")
        }
    }
    
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
