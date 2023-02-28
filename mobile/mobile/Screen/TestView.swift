//
//  TestView.swift
//  mobile
//
//  Created by Joel Lim on 27/2/23.
//

import SwiftUI

struct TestView: View {
    
    let token = ProcessInfo.processInfo.environment["token"]

    func getTodo() {
        guard let url = URL(string: "http://localhost:5000/todos/") else {
            print("Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue(token, forHTTPHeaderField: "authorization")
        
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
        VStack {
            Button("Get Todo") {
                getTodo()
            }
            .padding()
        }
        
    }
}

struct TestView_Previews: PreviewProvider {
    static var previews: some View {
        TestView()
    }
}
