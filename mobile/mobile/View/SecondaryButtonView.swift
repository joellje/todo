//
//  SecondaryButtonView.swift
//  mobile
//
//  Created by Joel Lim on 28/2/23.
//

import SwiftUI

struct SecondaryButtonView: View {
    var text = ""
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(text)
        }.buttonStyle(.bordered).tint(Color("ColorSecondary"))
    }
}

//struct SecondaryButtonView_Previews: PreviewProvider {
//    static var previews: some View {
//        SecondaryButtonView()
//    }
//}
