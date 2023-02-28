//
//  PrimaryButtonView.swift
//  mobile
//
//  Created by Joel Lim on 28/2/23.
//

import SwiftUI

struct PrimaryButtonView: View {
    var text = ""
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(text)
        }.buttonStyle(.borderedProminent).tint(Color("ColorPrimary"))
    }
}

//struct PrimaryButtonView_Previews: PreviewProvider {
//    static var previews: some View {
//        PrimaryButtonView()
//    }
//}
