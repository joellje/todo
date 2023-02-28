//
//  LoginView.swift
//  mobile
//
//  Created by Joel Lim on 26/2/23.
//

import SwiftUI

struct LoginView: View {
    func logIn() {
        guard let url = URL(string: "http://localhost:5000/users/login") else {
            print("Invalid URL")
            return
        }
//        TODO: Login Function
//        guard let bodyData = try? JSONSerialization.data(withJSONObject: ["key": "value"]) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
//        request.httpBody = bodyData
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        
        URLSession.shared.dataTask(with: request) { data, response, error in
            
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else if let data = data {
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: [])
                    print("Response: \(json)")
                    // You can now use the JSON object in your code
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
    
    var body: some View {
        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
    }
    
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}